# Gallery scenes, fourth version (2026-10-25, shotlist at 4/5 on criteria a to k of GALLERY.md; the table with every field and score is in STATUS.md "Shotlist"). Pass: -DepMap wsl-deps.gallery-scenes-ftv.map -Filter 10-gallery-scenes.feature. @review: a green run proves the path ran, never that the picture is right.
#
# THE STORY: "Lunch is served" (criterion k). WHO: Nelim, the colony's cook and gardener, with her guest Miel (NSB colonist, owner's casting 2026-10-25), Shogun her labrador and a hen that follows them. WHERE: the Sanctuary, dining-nook (1 to 3), plant-garden (4).
# WHICH DAY: one clear, warm midday, 12:00 to 12:15. RHYTHM: +5 min of game time per image (2 500 ticks per game hour): 60 set-up ticks, then +0, +208, +417, +625; each Scenario reloads the save, so decor ends with the scenario.
# OUTFIT CONTINUITY (owner rule 2026-10-23): Nelim keeps ONE outfit all day, sky Apparel_BasicShirt (96, 150, 190), charcoal Apparel_Pants (58, 60, 68), loose Long hair (70, 46, 32), smile. Her only change is scene 4: she puts on a straw Apparel_CowboyHat (214, 190, 120) to go out into the noon sun (Hat Hair Control shows the hair under it). Miel (scene 1 and 2 only): Roo_Royal_NaturalcurlsHD, skin (112, 67, 26), Eyes_Golden, plum Apparel_BasicShirt (122, 58, 108), sage Apparel_Pants (110, 130, 80).
# EPISODES, each moves on from the last: (1) Nelim brings the last plate while Miel walks in: four dishes, four names. (2) First bite of the dish that carries two names at once, Miel waits for the verdict. (3) Miel has left; the plain pot becomes a named blanquette, Nelim slips Shogun a scrap while the hen creeps in. (4) Lunch over, Nelim pulls the potatoes that decide the next menu.
# THE GESTURE, per scene (criterion e: a game paused mid-play; every moving pose is "game paused, then advance N ticks"): 1 Nelim mid-walk with the plate (forced walk, 20 ticks), 2 Nelim frozen mid-bite (forced Ingest, advance), 3 Nelim faces Shogun, meat in her hands, 4 Nelim mid-walk with six potatoes. Steps of NPT commit 82641a4 and 8318f39 (mid-stride proven by ticket 531b; forced Ingest not yet played: read the capture).
# FRAMES (cell = 540 / zoom px; the card covers x > 950, so the subject stands in the left half): 1 wide, zoom 5, (180, 107); 2 close, zoom 3, (179, 110); 3 medium, zoom 3.5, (180, 110); 4 medium-wide, zoom 4.5, (194, 85).
# RISKS: forced Ingest or the mid-walk may not freeze where planned (replay with another tick count); carried item may drop under a walk (then she stands next to the table with the plate); the hair may not show under the hat (Hat Hair Control 3760821540, seed in config/gallery-scenes/; if not, replay without the hat); the screen size of a run was once 1280x720 (not a scenario setting, NPT 2026-10-25).
#
# Bodies are the retextured ones of Venus Touch Waistlines' pass (owner, 2026-10-07). Food Texture Variety gives the meals their own bowls. Table cells: meals on (175..176, 108..109), chairs (175, 110) and (176, 110). Order of every scenario: the waits first, then the game paused, then the dressing, "stands at" LAST, the face, the framing and the capture with no wait after.
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

  # 1. 12:00. Nelim brings the last plate while Miel walks in: four different meals on the table, the katsudon card at the right.
  Scenario: the table is laid
    Given Nelim's Sanctuary: I am at the sanctuary "dining-nook"
    And I wait 60 ticks
    And game speed is paused
    And Nelim's Pickle Tools: the temperature of the map is 20 degrees
    And Nelim's Pickle Tools: I let 120 ticks pass
    When Flavor Text Extended: a colonist cooks "FTV_CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "Meat_Cow, RawPotatoes", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "EggChickenUnfertilized, RawRice", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "RawCorn, Meat_Pig", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized", 100 times
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    Given Nelim's Pickle Tools: I place the decor "VFEPD_FoodTrolley" at (173, 109)
    And Nelim's Pickle Tools: I place the decor "VFEPD_WineRack" at (173, 107)
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (96, 150, 190)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (58, 60, 68)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Long"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: a colonist "Miel" of kind "Colonist" exists
    And Nelim's Pickle Tools: "Miel" gender is Female
    And Nelim's Pickle Tools: "Miel" body type is Female
    And Nelim's Pickle Tools: "Miel" head type is "Female_AverageNormal"
    And Nelim's Pickle Tools: "Miel" hairstyle is "Roo_Royal_NaturalcurlsHD"
    And Nelim's Pickle Tools: "Miel" hair colour is rgb (40, 26, 20)
    And Nelim's Pickle Tools: "Miel" skin colour is rgb (112, 67, 26)
    And Nelim's Pickle Tools: "Miel" has the gene "Eyes_Golden"
    And Nelim's Pickle Tools: "Miel" wears "Apparel_BasicShirt" dyed rgb (122, 58, 108)
    And Nelim's Pickle Tools: "Miel" wears "Apparel_Pants" dyed rgb (110, 130, 80)
    And Nelim's Pickle Tools: "Miel" face kit is "smile"
    And Nelim's Pickle Tools: "Miel" mouth is "MouthLipsBig"
    And Nelim's Pickle Tools: "Miel" brows are "BrowTriangle"
    And Nelim's Pickle Tools: "Miel" lids are "LidFlirty"
    And Nelim's Pickle Tools: "Miel" eyeballs are "Empathetic"
    And Nelim's Pickle Tools: "Miel" face skin is "SkinEyeshadow"
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (174, 112)
    Given Nelim's Pickle Tools: "Nelim" stands at (174, 109) facing East
    And Nelim's Pickle Tools: "Miel" stands at (174, 111) facing East
    And Nelim's Pickle Tools: the animal "Shogun" stands at (174, 112) facing East
    And Nelim's Pickle Tools: "Nelim" carries 1 of the item "MealFine"
    And Nelim's Pickle Tools: "Nelim" is forced to walk to (176, 110)
    And Nelim's Pickle Tools: "Miel" is forced to walk to (175, 110)
    When Nelim's Pickle Tools: I advance the paused game by exactly 20 ticks
    And Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: "Miel" face is held neutral
    And Nelim's Pickle Tools: "Miel" facial expression is "normal+moodCheerful2"
    And Nelim's Pickle Tools: I frame the cell (180, 107) at zoom 5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_Katsudon" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:00 - Nelim brings the last plate while Miel walks in, four dishes on the table, the katsudon card beside it"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 2. 12:05. First bite of the dish with two names at once, Miel waits for the verdict, Shogun lies at her feet.
  Scenario: Nelim eats the meal with two dishes at once
    Given Nelim's Sanctuary: I am at the sanctuary "dining-nook"
    And I wait 268 ticks
    And game speed is paused
    And Nelim's Pickle Tools: the temperature of the map is 20 degrees
    And Nelim's Pickle Tools: I let 120 ticks pass
    When Flavor Text Extended: a colonist cooks "FTV_CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    Given Nelim's Pickle Tools: I place the decor "EggBox" at (173, 108)
    And Nelim's Pickle Tools: I place the decor "VFEPD_CuttingBoard" at (173, 110)
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (96, 150, 190)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (58, 60, 68)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Long"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: a colonist "Miel" of kind "Colonist" exists
    And Nelim's Pickle Tools: "Miel" gender is Female
    And Nelim's Pickle Tools: "Miel" body type is Female
    And Nelim's Pickle Tools: "Miel" head type is "Female_AverageNormal"
    And Nelim's Pickle Tools: "Miel" hairstyle is "Roo_Royal_NaturalcurlsHD"
    And Nelim's Pickle Tools: "Miel" hair colour is rgb (40, 26, 20)
    And Nelim's Pickle Tools: "Miel" skin colour is rgb (112, 67, 26)
    And Nelim's Pickle Tools: "Miel" has the gene "Eyes_Golden"
    And Nelim's Pickle Tools: "Miel" wears "Apparel_BasicShirt" dyed rgb (122, 58, 108)
    And Nelim's Pickle Tools: "Miel" wears "Apparel_Pants" dyed rgb (110, 130, 80)
    And Nelim's Pickle Tools: "Miel" face kit is "smile"
    And Nelim's Pickle Tools: "Miel" mouth is "MouthLipsBig"
    And Nelim's Pickle Tools: "Miel" brows are "BrowTriangle"
    And Nelim's Pickle Tools: "Miel" lids are "LidFlirty"
    And Nelim's Pickle Tools: "Miel" eyeballs are "Empathetic"
    And Nelim's Pickle Tools: "Miel" face skin is "SkinEyeshadow"
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (177, 111)
    Given Nelim's Pickle Tools: "Nelim" stands at (176, 111) facing East
    And Nelim's Pickle Tools: "Miel" stands at (175, 110) facing East
    And Nelim's Pickle Tools: the animal "Shogun" stands at (177, 111) facing South
    And Nelim's Pickle Tools: "Nelim" is forced into the job "Ingest" on the item "MealFine" at (176, 109)
    When Nelim's Pickle Tools: I advance the paused game by exactly 90 ticks
    And Nelim's Pickle Tools: "Nelim" facial expression is "normal+Ingest"
    And Nelim's Pickle Tools: "Miel" face is held neutral
    And Nelim's Pickle Tools: "Miel" facial expression is "normal+moodCheerful2"
    And Nelim's Pickle Tools: I frame the cell (179, 110) at zoom 3
    And Flavor Text Extended: the info card of a meal named after 2 dishes at once is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:05 - Nelim's first bite of the meal with two dishes at once, Miel waits, its card beside"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 3. 12:10. Miel has left. The pot of beef, pork and milk is a blanquette: Nelim slips Shogun a scrap while the hen creeps in; both animals face each other and the camera side.
  Scenario: the blanquette, Shogun and a hen that came to see
    Given Nelim's Sanctuary: I am at the sanctuary "dining-nook"
    And I wait 477 ticks
    And game speed is paused
    And Nelim's Pickle Tools: the temperature of the map is 20 degrees
    And Nelim's Pickle Tools: I let 120 ticks pass
    When Flavor Text Extended: a colonist cooks "FTV_CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "RawBerries, Milk", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "RawCorn, Meat_Pig", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "Meat_Cow, Meat_Pig, Milk", 300 times
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    And Nelim's Pickle Tools: I place the decor "VFEPD_CookingPan" at (173, 109)
    And Nelim's Pickle Tools: I place the decor "VFEPD_HayBaleSmall" at (172, 110)
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (96, 150, 190)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (58, 60, 68)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Long"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (177, 110)
    And Nelim's Pickle Tools: an adult animal of kind "Chicken" named "Poule" is spawned at (174, 110)
    Given Nelim's Pickle Tools: "Nelim" stands at (176, 110) facing East
    And Nelim's Pickle Tools: the animal "Shogun" stands at (177, 110) facing West
    And Nelim's Pickle Tools: the animal "Poule" stands at (174, 110) facing East
    And Nelim's Pickle Tools: "Nelim" carries 1 of the item "Meat_Cow"
    When Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: I frame the cell (180, 110) at zoom 3.5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextExtended_TwoMeatBlanquette" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:10 - the blanquette, Nelim slips Shogun a scrap while a hen creeps in"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 4. 12:15. After lunch, in the plant garden: Nelim goes out in a straw hat over loose long hair, six potatoes in her arms, a hen in front of her, the card of a potato dish beside her. Says: what grows here decides what lunch can be.
  # RISKS: the hair may not show under the hat (Hat Hair Control 3760821540; if the picture shows no hair, replay without the hat, never keep it); Gnocchi may not carry the potato in slot 0 -> if the card step fails, replay without the card.
  Scenario: after lunch, the plant garden
    Given Nelim's Sanctuary: I am at the sanctuary "plant-garden"
    And I wait 685 ticks
    And game speed is paused
    And Nelim's Pickle Tools: the temperature of the map is 20 degrees
    And Nelim's Pickle Tools: I let 120 ticks pass
    When Flavor Text Extended: a colonist cooks "FTV_CookMealSimple" at the "FueledStove" from "RawPotatoes", 100 times
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (96, 150, 190)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (58, 60, 68)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_CowboyHat" dyed rgb (214, 190, 120)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Long"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: I place the decor "PlantAppletree" at (183, 84) fully grown
    And Nelim's Pickle Tools: I place the decor "PlantCherrytree" at (185, 82) fully grown
    Given Nelim's Pickle Tools: an adult animal of kind "Chicken" named "Poule" is spawned at (189, 86)
    Given Flavor Text Extended: "Nelim" stands on the free cell nearest to (190, 85)
    And Nelim's Pickle Tools: "Nelim" faces West
    And Nelim's Pickle Tools: the animal "Poule" stands at (189, 86) facing South
    And Nelim's Pickle Tools: "Nelim" carries 6 of the item "RawPotatoes"
    And Nelim's Pickle Tools: "Nelim" is forced to walk to (188, 85)
    When Nelim's Pickle Tools: I advance the paused game by exactly 15 ticks
    And Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: "Nelim" facial expression is "normal+moodCheerful2"
    And Nelim's Pickle Tools: I frame the cell (194, 85) at zoom 4.5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_GnocchiSolo" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:15 - Nelim in a straw hat in the plant garden with potatoes in her arms and a hen in front of her, the potato dish card beside"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs
