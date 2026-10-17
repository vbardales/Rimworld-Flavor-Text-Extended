# Gallery scenes, second version (2026-10-15). Pass: -DepMap wsl-deps.gallery-scenes-ftv.map -Filter 10-gallery-scenes.feature (plan and open points: Tests/Pickle/next-gallery/README.md). @review: a green run proves the path ran, never that the picture is right.
#
# THE STORY: "Lunch is served". One midday on the Sanctuary, told by Nelim (the one colonist of the fixture, so Virginie), her guest Mei and Shogun her labrador, with a hen that came to see.
# What the series says, in order: one table can carry many different dish names; one ordinary meal with two dishes at once has its own card; an everyday pot of two meats and milk gets a real name;
# what the colony grows decides which dishes can ever appear. The table first, because Steam shows image 1 large (image 0 is the Preview).
#
# SHOOTING PLAN (one line per image: place, moment, subject, composition, living things, what the picture says)
#   1. dining-nook, 12:00, the table laid. Four cooked meals, each with a different name, on the 2x2 table; Nelim and Mei on the two chairs at its north side, facing the camera;
#      Shogun beside the table, facing the camera too; the katsudon card at the right of the screen, wide enough to keep the whole table. Says: one table, many names.
#   2. dining-nook, 12:05, close: the meal with two dishes at once, its card at the right, Nelim on her chair. UNCHANGED, this is the picture the owner accepted on 2026-10-12
#      (1-two-dishes-nelim-seated.jpg): the scenario stays as it was played so that the image and its recipe still match. Says: the most distinctive behaviour of the mod.
#   3. dining-nook, 12:10, wider: a pot of beef, pork and milk is named a blanquette, its card at the right; a fine meal beside it on the table; Nelim and Mei on their chairs,
#      Shogun at the table, a hen that came to see (a daytime animal at noon) on the other side, both animals facing the camera. Says: an everyday pot is a real dish, and the hen is the life of the place.
#   4. plant-garden, 12:15, after lunch: Nelim in the fenced garden with potatoes in her arms, the plants of the next meal around her. Says: the colony's garden decides the menu.
# Not here: the breadth picture (many dish names at once) and the before / after composite. See README.md.
#
# RHYTHM (author's choice, GALLERY.md "Une seule histoire"): the same hour of departure in every scenario (12), then an accumulated wait before the capture, 5 minutes of game time per
# picture: 2 500 ticks per game hour, about 208 ticks for 5 minutes. Each Scenario reloads the save, so every one replays its own wait: 60 ticks of set-up, then +0, +208, +417, +625.
# The living things are posed AFTER the wait so that they have not left the frame.
#
# PLACES (chosen on the empty photographs of SanctuaryBacklot/Art/Gallery, 2026-10-15): `dining-nook` for 1 to 3 (a table on a white rug with two chairs at its north side, torches,
# logs and plants along the bottom edge), `plant-garden` for 4 (a fenced garden of mixed plants). Table cells: meals on (175..176, 108..109), chairs (175, 110) and (176, 110).
#
# PEOPLE (GALLERY.md, 2026-10-14: Nelim is the protagonist, the other pawns are her guests). Nelim keeps her own face (two brows, smirk smile, blink: step `Nelim's Sanctuary: Nelim has her own face`,
# called after the dressing), her brown eyes (EyeGenes3, the fixture's default), a teal shirt against the orange wood, cream trousers, a ponytail of dark brown hair. Mei is the guest: a bob of black hair,
# a mustard shirt that answers the teal, dark trousers, green eyes, a held neutral face with the same smirk smile. Bodies are the retextured ones of Venus Touch Waistlines' pass (owner, 2026-10-07).
# Recipes copied from played galleries: the guest from AncientBuildingsRenew 15-gallery (a colonist exists, gender, body type, hairstyle, clothes, face kit, face held neutral); the dog and the facing
# animals from AlphaMythologyRenew 09-publication-shots (`the animal "X" stands at (x, z) facing South`).
# FOOD (map gallery-scenes-ftv): Food Texture Variety gives the meals their own bowls, so the table does not show one plain sprite.
#
# FACE (NPT, 2026-10-08): after the pause, the temperature is held at 20 degrees and 120 ticks pass (the heat face and its sweat go away), then the dressing, "stands at", the face, the framing and the
# capture with no tick in between: the expression ends with the ticks.
# ORDER OF EVERY SCENARIO (NPT, 2026-10-07): the waits first, then the game paused, then the dressing, then "stands at" LAST, then the framing and the capture with no wait after.
# A pawn is held only while the game is paused and without a job: a wait after "stands at" lets her go back to her job.
@review @requires:nelim.pickletools.screenshotstudio @requires:nelim.pickletools.screenshotmode @requires:nelim.pickletools.stagedecor @requires:nelim.pickletools.colonistrace
Feature: Lunch is served

  Background:
    Given the save "Nelims-tribe" is loaded
    And game speed is paused
    And Nelim's Pickle Tools: the eclipse of the map is ended
    And Nelim's Pickle Tools: studio presentation mode is enabled
    And I set the hour to 12
    And I set the weather to "Clear"
    And Nelim's Pickle Tools: all animals are removed

  # 1. 12:00. The table is laid: four different meals, Nelim and Mei at the chairs, Shogun beside the table, the katsudon card at the right.
  Scenario: the table is laid
    Given Nelim's Sanctuary: I am at the sanctuary "dining-nook"
    And I wait 60 ticks
    And game speed is paused
    And Nelim's Pickle Tools: the temperature of the map is 20 degrees
    And Nelim's Pickle Tools: I let 120 ticks pass
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized", 100 times
    And Flavor Text Extended: a colonist also cooks "CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    And Flavor Text Extended: a colonist also cooks "CookMealSimple" at the "FueledStove" from "EggChickenUnfertilized", 300 times
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    Given Nelim's Pickle Tools: I place the decor "VFEPD_WoodenChest" at (173, 109)
    And Nelim's Pickle Tools: I place the decor "VFEPD_BrewingBarrel" at (173, 107)
    And Nelim's Pickle Tools: I place the decor "VFEPD_HayBaleSmall" at (172, 110)
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (46, 102, 112)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (222, 210, 184)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Ponytails"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: a colonist "Mei" of kind "Colonist" exists
    And Nelim's Pickle Tools: "Mei" gender is female
    And Nelim's Pickle Tools: "Mei" body type is Female
    And Nelim's Pickle Tools: "Mei" hairstyle is "Bob"
    And Nelim's Pickle Tools: "Mei" hair colour is rgb (38, 30, 28)
    And Nelim's Pickle Tools: "Mei" has the gene "Eyes_Green"
    And Nelim's Pickle Tools: "Mei" wears "Apparel_BasicShirt" dyed rgb (214, 160, 46)
    And Nelim's Pickle Tools: "Mei" wears "Apparel_Pants" dyed rgb (70, 70, 78)
    And Nelim's Pickle Tools: "Mei" face is held neutral
    And Nelim's Pickle Tools: "Mei" face kit is "neutral"
    And Nelim's Pickle Tools: "Mei" mouth is "MouthSmirkSmile"
    And Nelim's Pickle Tools: "Mei" brows are "BrowNormal"
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (177, 108)
    Given Nelim's Pickle Tools: "Nelim" stands at (176, 110) facing South
    And Nelim's Pickle Tools: "Mei" stands at (175, 110) facing South
    And Nelim's Pickle Tools: the animal "Shogun" stands at (177, 108) facing South
    When Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: "Mei" facial expression is "normal+moodCheerful"
    And Nelim's Pickle Tools: I frame the cell (181, 108) at zoom 6.5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_Katsudon" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:00 - the table is laid, Nelim, Mei and Shogun, the katsudon card beside it"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 2. 12:05. UNCHANGED since the run the owner accepted (2026-10-12). Nelim at the table; her seat is her chair cell.
  Scenario: Nelim eats the meal with two dishes at once
    Given Nelim's Sanctuary: I am at the sanctuary "dining-nook"
    And I wait 268 ticks
    And game speed is paused
    And Nelim's Pickle Tools: the temperature of the map is 20 degrees
    And Nelim's Pickle Tools: I let 120 ticks pass
    When Flavor Text Extended: a colonist cooks "CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (46, 102, 112)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (222, 210, 184)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Ponytails"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: "Nelim" stands at (176, 110) facing South
    When Nelim's Pickle Tools: "Nelim" facial expression is "normal+moodCheerful2"
    And Nelim's Pickle Tools: I frame the cell (181, 108) at zoom 6.5
    And Flavor Text Extended: the info card of a meal named after 2 dishes at once is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:05 - Nelim and the meal with two dishes at once, its card beside"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 3. 12:10. A pot of beef, pork and milk is a blanquette. Wider than 2 so that Mei, Shogun and the hen are in the frame; both animals face the camera.
  Scenario: the blanquette, Mei, Shogun and a hen that came to see
    Given Nelim's Sanctuary: I am at the sanctuary "dining-nook"
    And I wait 477 ticks
    And game speed is paused
    And Nelim's Pickle Tools: the temperature of the map is 20 degrees
    And Nelim's Pickle Tools: I let 120 ticks pass
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "Meat_Cow, Meat_Pig, Milk", 300 times
    And Flavor Text Extended: a colonist also cooks "CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    Given Nelim's Pickle Tools: I place the decor "VFEPD_WoodenChest" at (173, 109)
    And Nelim's Pickle Tools: I place the decor "VFEPD_BrewingBarrel" at (173, 107)
    And Nelim's Pickle Tools: I place the decor "VFEPD_HayBaleSmall" at (172, 110)
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (46, 102, 112)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (222, 210, 184)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Ponytails"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: a colonist "Mei" of kind "Colonist" exists
    And Nelim's Pickle Tools: "Mei" gender is female
    And Nelim's Pickle Tools: "Mei" body type is Female
    And Nelim's Pickle Tools: "Mei" hairstyle is "Bob"
    And Nelim's Pickle Tools: "Mei" hair colour is rgb (38, 30, 28)
    And Nelim's Pickle Tools: "Mei" has the gene "Eyes_Green"
    And Nelim's Pickle Tools: "Mei" wears "Apparel_BasicShirt" dyed rgb (214, 160, 46)
    And Nelim's Pickle Tools: "Mei" wears "Apparel_Pants" dyed rgb (70, 70, 78)
    And Nelim's Pickle Tools: "Mei" face is held neutral
    And Nelim's Pickle Tools: "Mei" face kit is "neutral"
    And Nelim's Pickle Tools: "Mei" mouth is "MouthSmirkSmile"
    And Nelim's Pickle Tools: "Mei" brows are "BrowNormal"
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (177, 108)
    And Nelim's Pickle Tools: an adult animal of kind "Chicken" named "Poule" is spawned at (174, 108)
    Given Nelim's Pickle Tools: "Nelim" stands at (176, 110) facing South
    And Nelim's Pickle Tools: "Mei" stands at (175, 110) facing South
    And Nelim's Pickle Tools: the animal "Shogun" stands at (177, 108) facing South
    And Nelim's Pickle Tools: the animal "Poule" stands at (174, 108) facing South
    When Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: "Mei" facial expression is "normal+moodCheerful"
    And Nelim's Pickle Tools: I frame the cell (178, 108) at zoom 5.5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextExtended_TwoMeatBlanquette" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:10 - the blanquette, Mei, Shogun and a hen at the table"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 4. 12:15. After lunch, in the plant garden, with potatoes in her arms. No card: the place and the woman who grows what the dishes need.
  Scenario: after lunch, the plant garden
    Given Nelim's Sanctuary: I am at the sanctuary "plant-garden"
    And I wait 685 ticks
    And game speed is paused
    And Nelim's Pickle Tools: the temperature of the map is 20 degrees
    And Nelim's Pickle Tools: I let 120 ticks pass
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (46, 102, 112)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (222, 210, 184)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Ponytails"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: I place the decor "PlantAppletree" at (183, 84) fully grown
    And Nelim's Pickle Tools: I place the decor "PlantCherrytree" at (185, 82) fully grown
    Given Flavor Text Extended: "Nelim" stands on the free cell nearest to (190, 85)
    And Nelim's Pickle Tools: "Nelim" carries 6 of the item "RawPotatoes"
    When Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: I frame the cell (190, 85) at zoom 5
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:15 - Nelim in the plant garden with potatoes in her arms, where the next meal grows"

# The 5-minute rhythm above: 60 + 0 = 60, 60 + 208 = 268, 60 + 417 = 477, 60 + 625 = 685.
# The before / after has no scenario of its own: it is the same card captured twice. Pass 1, the mod absent (a game without
# nelim.flavortextextended, the bare pass of the suite minus the mod): the meal of rice, pork and egg is a "simple meal". Pass 2: scenario 1 of
# this file. The composite is cut and labelled outside the game. Needs a map without the mod in `-DepMap` (`wsl-deps.without-the-mod.map`,
# to be written) once Pickle Tools confirms a pass can drop the mod under test.
