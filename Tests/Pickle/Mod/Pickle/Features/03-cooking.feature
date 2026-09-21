# Meals named while cooked: T5, T6 and T7 of TESTS.md, in the bare pass (Flavor Text, this mod, and
# vanilla ingredients only).
#
# What is real and what is not, since both matter when a scenario is green. The step calls
# GenRecipe.MakeRecipeProducts, the method Flavor Text patches, with ingredients made by
# ThingMaker, on a colonist and a stove of the loaded save. Flavor Text's own postfix runs and names
# the meal for real. No tick passes: nobody walks to the stove, no ingredient is hauled, and no
# filter refuses anything. Cooking is a random draw among every matching definition, weighted by how
# narrow each one is, and hekmo's dishes compete with ours by design; so a step cooks the same meal
# many times and asserts that a dish APPEARED, never that it appears every time.
#
# Run it with the bare pass: -Filter 01-alone.feature,03-cooking.feature,04-filing.feature
#
# English only: the label assertions read the dish's own text.
Feature: cooking a meal names it after a dish

  Background:
    Given the save "test-colony" is loaded
    And a colonist "Cook" exists
    And I spawn a "FueledStove" at (140, 155)

  Scenario: a name appears at all, from one ingredient
    # FlavorTextFR_OeufMollet is the only dish of this mod with a single ingredient slot, which
    # makes it the cheapest proof that the whole chain works.
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "EggChickenUnfertilized", 300 times
    Then Flavor Text Extended: every meal was named after a dish
    And Flavor Text Extended: a meal was named after "FlavorTextFR_OeufMollet"
    And Flavor Text Extended: a meal named after "FlavorTextFR_OeufMollet" is labelled with "medium-boiled"
    And no errors were logged

  Scenario: a three-ingredient dish fires
    # Rice, pork and egg is katsudon. It will not come out every time: hekmo's dishes on the same
    # triplet compete with it.
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized", 300 times
    Then Flavor Text Extended: every meal was named after a dish
    And Flavor Text Extended: a meal was named after "FlavorTextFR_Katsudon"
    And Flavor Text Extended: a meal named after "FlavorTextFR_Katsudon" is labelled with "katsudon"
    And no errors were logged

  # Not a claim yet. TESTS.md T7 says four ingredients read as one dish with another alongside, and
  # Flavor Text's source cuts the ingredients into chunks of three. Whether a lone fourth
  # ingredient always finds a dish of its own is what nothing here has established, so this is
  # played only with -IncludeWip, and a red says the assumption was wrong before it says the mod is.
  @wip
  Scenario: four ingredients become two dishes
    When Flavor Text Extended: a colonist cooks "CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    Then Flavor Text Extended: every meal was named after a dish
    And Flavor Text Extended: a meal was named after 2 dishes at once
