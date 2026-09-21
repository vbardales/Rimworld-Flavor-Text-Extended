using System;
using System.Collections.Generic;
using System.Linq;
using FlavorText;
using RimWorks.Pickle;
using RimWorld;
using Verse;

namespace FlavorTextExtended.PickleSteps
{
    /// <summary>
    /// The two things Pickle's built-in steps cannot reach for this mod: which Flavor Text category
    /// a ThingDef is filed under, and what name a cooked meal receives.
    ///
    /// Every step text starts with "Flavor Text Extended:". Pickle loads the steps of every active
    /// suite into one namespace, and two suites declaring the same text make healthy scenarios fail
    /// with "Ambiguous step". Nothing here is written as parentheses or slashes either, which
    /// Cucumber expressions read as optional text and alternatives.
    ///
    /// Cooking is NOT simulated. A step calls GenRecipe.MakeRecipeProducts, the very method Flavor
    /// Text patches with its postfix, with ingredients made by ThingMaker: the postfix runs for
    /// real, on a real colonist and a real work table of the loaded save, and no tick passes. What
    /// this leaves out is the pawn walking to the stove, and the filters that would have refused
    /// these ingredients; neither is this mod's business.
    ///
    /// Nothing here reads a translated word except the one label check, which is meant for an
    /// English pass and says so.
    /// </summary>
    [PickleSteps]
    public class FlavorTextExtendedSteps
    {
        // What the last "cooks" step produced, one entry per meal. Static: Pickle may build a
        // fresh instance of this class for every step.
        private sealed class Meal
        {
            public List<string> Dishes;
            public string Label;
            public Thing Thing;
        }

        // A meal put on the map before a save: what it was called, keyed by the id the save keeps.
        private sealed class Placed
        {
            public int Id;
            public List<string> Dishes;
            public string Label;
        }

        private static List<Placed> placed = new List<Placed>();

        private static List<Meal> meals = new List<Meal>();
        private static string lastCook = "nothing has been cooked yet";

        // ------------------------------------------------------------------ filing

        private static ThingDef Thing(PickleContext ctx, string defName)
        {
            ThingDef def = DefDatabase<ThingDef>.GetNamedSilentFail(defName);
            ctx.Assert(def != null, $"no ThingDef \"{defName}\": its mod is not in this pass, or the name changed");
            return def;
        }

        private static FlavorCategoryDef Category(PickleContext ctx, string defName)
        {
            FlavorCategoryDef cat = DefDatabase<FlavorCategoryDef>.GetNamedSilentFail(defName);
            ctx.Assert(cat != null, $"no FlavorCategoryDef \"{defName}\"");
            return cat;
        }

        private static string FiledUnderNames(ThingDef def)
        {
            List<string> names = DefDatabase<FlavorCategoryDef>.AllDefs
                .Where(c => c.DescendantThingDefs != null && c.DescendantThingDefs.Contains(def))
                .Select(c => c.defName).OrderBy(n => n).ToList();
            return names.Count == 0 ? "no category at all" : string.Join(", ", names);
        }

        [Then("Flavor Text Extended: {string} is filed under {string}")]
        public void IsFiledUnder(PickleContext ctx, string thingDefName, string categoryDefName)
        {
            ThingDef thing = Thing(ctx, thingDefName);
            FlavorCategoryDef cat = Category(ctx, categoryDefName);
            ctx.Assert(cat.DescendantThingDefs != null && cat.DescendantThingDefs.Contains(thing),
                $"{thingDefName} is not under {categoryDefName}; it is under: {FiledUnderNames(thing)}");
        }

        [Then("Flavor Text Extended: {string} is not filed under {string}")]
        public void IsNotFiledUnder(PickleContext ctx, string thingDefName, string categoryDefName)
        {
            ThingDef thing = Thing(ctx, thingDefName);
            FlavorCategoryDef cat = Category(ctx, categoryDefName);
            ctx.Assert(cat.DescendantThingDefs == null || !cat.DescendantThingDefs.Contains(thing),
                $"{thingDefName} is under {categoryDefName}, which it must not be; it is under: {FiledUnderNames(thing)}");
        }

        // ------------------------------------------------------------------ cooking

        [When("Flavor Text Extended: a colonist cooks {string} at the {string} from {string}, {int} times")]
        public void Cook(PickleContext ctx, string recipeDefName, string stationDefName, string ingredientDefNames, int times)
        {
            ctx.Require(Current.Game != null && Find.CurrentMap != null, "load a save first");
            Map map = Find.CurrentMap;

            RecipeDef recipe = DefDatabase<RecipeDef>.GetNamedSilentFail(recipeDefName);
            ctx.Assert(recipe != null, $"no RecipeDef \"{recipeDefName}\"");

            ThingDef stationDef = Thing(ctx, stationDefName);
            IBillGiver station = map.listerThings.ThingsOfDef(stationDef).OfType<IBillGiver>().FirstOrDefault();
            ctx.Assert(station != null, $"no {stationDefName} standing on the map: spawn one first");

            Pawn cook = map.mapPawns.FreeColonists.FirstOrDefault();
            ctx.Assert(cook != null, "no colonist on the map: create one first");

            List<ThingDef> ingredientDefs = ingredientDefNames.Split(',')
                .Select(n => n.Trim()).Where(n => n.Length > 0).Select(n => Thing(ctx, n)).ToList();
            ctx.Assert(ingredientDefs.Count > 0, "no ingredient named");
            ctx.Assert(times > 0, "cook at least once");

            meals = new List<Meal>();
            lastCook = $"{times} x {recipeDefName} at {stationDefName} from [{string.Join(", ", ingredientDefs.Select(d => d.defName))}]";

            for (int i = 0; i < times; i++)
            {
                var ingredients = new List<Thing>();
                foreach (ThingDef def in ingredientDefs)
                {
                    Thing ingredient = ThingMaker.MakeThing(def);
                    ingredient.stackCount = 1;
                    ingredients.Add(ingredient);
                }

                // The postfix names the meal while this enumeration runs.
                List<Thing> products = GenRecipe.MakeRecipeProducts(recipe, cook, ingredients, ingredients[0], station).ToList();
                foreach (Thing product in products)
                {
                    CompFlavor comp = product.TryGetComp<CompFlavor>();
                    if (comp == null)
                    {
                        continue;
                    }
                    meals.Add(new Meal
                    {
                        Dishes = (comp.FinalFlavorDefs ?? new List<FlavorDef>()).Select(d => d.defName).ToList(),
                        Label = product.Label,
                        Thing = product,
                    });
                }
            }

            ctx.Assert(meals.Count > 0,
                $"the recipe produced no meal that carries a Flavor Text comp ({lastCook}): the product is not a meal Flavor Text names");
        }

        private static string Histogram()
        {
            var counts = meals.SelectMany(m => m.Dishes.DefaultIfEmpty("(no dish)"))
                .GroupBy(d => d).OrderByDescending(g => g.Count()).Take(12)
                .Select(g => $"{g.Key} x{g.Count()}");
            return $"{meals.Count} meals from {lastCook}; dishes seen: {string.Join(", ", counts)}";
        }

        [Then("Flavor Text Extended: every meal was named after a dish")]
        public void EveryMealNamed(PickleContext ctx)
        {
            ctx.Assert(meals.Count > 0, "no meal to look at: " + lastCook);
            Meal bare = meals.FirstOrDefault(m => m.Dishes.Count == 0);
            ctx.Assert(bare == null, $"a meal was named after no dish (its label reads \"{bare?.Label}\"). {Histogram()}");
        }

        [Then("Flavor Text Extended: a meal was named after {string}")]
        public void SomeMealNamedAfter(PickleContext ctx, string dishDefName)
        {
            ctx.Assert(meals.Count > 0, "no meal to look at: " + lastCook);
            ctx.Assert(meals.Any(m => m.Dishes.Contains(dishDefName)), $"no meal was named after {dishDefName}. {Histogram()}");
        }

        [Then("Flavor Text Extended: no meal was named after {string}")]
        public void NoMealNamedAfter(PickleContext ctx, string dishDefName)
        {
            ctx.Assert(meals.Count > 0, "no meal to look at: " + lastCook);
            ctx.Assert(!meals.Any(m => m.Dishes.Contains(dishDefName)), $"a meal was named after {dishDefName}, which it must not be. {Histogram()}");
        }

        // English only: the label is the dish's own text, so a pass in another language reads
        // another word. The run is staged in English.
        [Then("Flavor Text Extended: a meal named after {string} is labelled with {string}")]
        public void NamedMealLabelled(PickleContext ctx, string dishDefName, string text)
        {
            List<Meal> named = meals.Where(m => m.Dishes.Contains(dishDefName)).ToList();
            ctx.Assert(named.Count > 0, $"no meal was named after {dishDefName}. {Histogram()}");
            ctx.Assert(named.Any(m => m.Label.IndexOf(text, StringComparison.OrdinalIgnoreCase) >= 0),
                $"none of the {named.Count} meals named after {dishDefName} is labelled with \"{text}\"; the first reads \"{named[0].Label}\"");
        }

        // ------------------------------------------------------------------ what a person reads

        // The card is a window, so it survives the game's capture mode, which hides everything that is not one.
        // It shows the meal's label and its description, where Flavor Text writes its dish text.
        [When("Flavor Text Extended: the info card of a meal named after {string} is opened")]
        public void OpenInfoCardOfDish(PickleContext ctx, string dishDefName)
        {
            Meal meal = meals.FirstOrDefault(m => m.Dishes.Contains(dishDefName));
            ctx.Assert(meal != null, $"no meal was named after {dishDefName}. {Histogram()}");
            Find.WindowStack.Add(new Dialog_InfoCard(meal.Thing));
        }

        [When("Flavor Text Extended: the info card of a meal named after {int} dishes at once is opened")]
        public void OpenInfoCardOfSeveral(PickleContext ctx, int count)
        {
            Meal meal = meals.FirstOrDefault(m => m.Dishes.Count == count);
            ctx.Assert(meal != null, $"no meal carried {count} dishes; {Histogram()}");
            Find.WindowStack.Add(new Dialog_InfoCard(meal.Thing));
        }

        // ------------------------------------------------------------------ save and reload

        [When("Flavor Text Extended: {int} of the meals are placed on the map")]
        public void PlaceMeals(PickleContext ctx, int count)
        {
            ctx.Require(Current.Game != null && Find.CurrentMap != null, "load a save first");
            Map map = Find.CurrentMap;
            ctx.Assert(meals.Count > 0, "no meal to place: " + lastCook);

            // One meal per distinct set of dishes first, so that several different names are tested.
            List<Meal> chosen = meals.GroupBy(m => string.Join("+", m.Dishes)).Select(g => g.First()).Take(count).ToList();
            IntVec3 origin = map.mapPawns.FreeColonists.FirstOrDefault()?.Position ?? map.Center;
            List<IntVec3> cells = GenRadial.RadialCellsAround(origin, 14f, false)
                .Where(c => c.InBounds(map) && c.Walkable(map) && c.GetFirstItem(map) == null && c.GetEdifice(map) == null)
                .Take(chosen.Count).ToList();
            ctx.Assert(cells.Count == chosen.Count, $"only {cells.Count} free cells near {origin} for {chosen.Count} meals");

            placed = new List<Placed>();
            for (int i = 0; i < chosen.Count; i++)
            {
                // Spawn, never place: placing may merge two meals into one stack and lose a name.
                GenSpawn.Spawn(chosen[i].Thing, cells[i], map);
                placed.Add(new Placed { Id = chosen[i].Thing.thingIDNumber, Dishes = chosen[i].Dishes, Label = chosen[i].Label });
            }
        }

        [Then("Flavor Text Extended: the placed meals kept their names")]
        public void PlacedMealsKeptNames(PickleContext ctx)
        {
            ctx.Assert(placed.Count > 0, "no meal was placed before the save");
            ctx.Require(Current.Game != null && Find.CurrentMap != null, "no game after the reload");
            Map map = Find.CurrentMap;
            var problems = new List<string>();
            foreach (Placed p in placed)
            {
                Thing thing = map.listerThings.AllThings.FirstOrDefault(t => t.thingIDNumber == p.Id);
                if (thing == null)
                {
                    problems.Add($"meal #{p.Id} (\"{p.Label}\") is gone");
                    continue;
                }
                CompFlavor comp = thing.TryGetComp<CompFlavor>();
                List<string> dishes = comp == null ? new List<string>() : (comp.FinalFlavorDefs ?? new List<FlavorDef>()).Select(d => d.defName).ToList();
                if (!dishes.SequenceEqual(p.Dishes))
                {
                    problems.Add($"meal #{p.Id} was [{string.Join(", ", p.Dishes)}], is now [{string.Join(", ", dishes)}]");
                }
                else if (thing.Label != p.Label)
                {
                    problems.Add($"meal #{p.Id} was labelled \"{p.Label}\", is now \"{thing.Label}\"");
                }
            }
            ctx.Assert(problems.Count == 0, $"{problems.Count} of {placed.Count} placed meals changed across the reload: {string.Join("; ", problems)}");
        }

        [Then("Flavor Text Extended: a meal was named after {int} dishes at once")]
        public void MealWithSeveralDishes(PickleContext ctx, int count)
        {
            ctx.Assert(meals.Count > 0, "no meal to look at: " + lastCook);
            ctx.Assert(meals.Any(m => m.Dishes.Count == count),
                $"no meal carried {count} dishes; counts seen: " +
                string.Join(", ", meals.GroupBy(m => m.Dishes.Count).OrderBy(g => g.Key).Select(g => $"{g.Key} dishes x{g.Count()}")) +
                $" ({lastCook})");
        }
    }
}
