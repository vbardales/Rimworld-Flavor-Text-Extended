# Gallery scenes, third version (2026-10-18, shotlist at 4/5 on criteria a to k of GALLERY.md; table in STATUS.md "Shotlist"). Pass: -DepMap wsl-deps.gallery-scenes-ftv.map -Filter 10-gallery-scenes.feature. @review: a green run proves the path ran, never that the picture is right.
#
# THE STORY: "Lunch is served" (criterion k). WHO: Nelim, the colony's cook and gardener, with her guest Mei, Shogun her labrador and a hen that follows them. WHERE: the Sanctuary, dining-nook (1 to 3), plant-garden (4).
# WHICH DAY: one clear, warm midday, 12:00 to 12:15. RHYTHM: +5 min of game time per image (2 500 ticks per game hour): 60 set-up ticks, then +0, +208, +417, +625; each Scenario reloads the save, so decor ends with the scenario.
# EPISODES, each moves on from the last: (1) Nelim lays the table and Mei arrives: four dishes, four names. (2) They sit; she serves the dish that carries two names at once, Shogun settling at her feet.
# (3) The plain pot becomes a named blanquette; Mei is gone, Nelim hands the dog a scrap while the hen watches. (4) After lunch, in the garden, the potatoes that decide the next menu.
#
# SHOOTING PLAN, one line per image. Outfits differ per scene (colours named), living things are posed after the wait, decor named and gone with the reload.
#   1. dining-nook, 12:00, +0. Subject: one table, four dish names. Nelim: Apparel_CollarShirt rust (176, 84, 52), Apparel_Pants charcoal (58, 60, 68), Ponytails dark brown (70, 46, 32), own face, carries a MealFine (puts the last plate down).
#      Mei: Bob black, Apparel_BasicShirt mustard (214, 160, 46), green eyes, cheerful. Shogun at (177, 108) facing South. Decor, service of the meal: VFEPD_FoodTrolley (173, 109), VFEPD_WineRack (173, 107). No card.
#      Composition: wide, frame (178, 108) zoom 5, four meals readable, the two women at the north chairs, dog right and off-axis. RISK: the four plates read as one sprite (pass 3 retry: all katsudon) -> Food Texture Variety recipes (FTV_CookMeal*) with ingredient pairs that have their own texture (beef+potatoes, egg+rice, corn+pork, berries+milk), cooked once each in the first four places; the 100x katsudon comes last, for the card only.
#   2. dining-nook, 12:05, +208. Subject: the meal named after two dishes at once. Nelim: Apparel_BasicShirt sage (122, 150, 104), Apparel_Pants cream (222, 210, 184), Bun, eating face `normal+Ingest` (NPT), holds a MealSimple at her chair facing South (the chairs are north of the table, z 110 over 108..109: facing South shows her face and the table; NPT wrote North by mistake).
#      Shogun at (177, 111) facing South. Decor, the eggs and the board: EggBox (173, 108), VFEPD_CuttingBoard (173, 110). Card right. Composition: close, frame (181, 108) zoom 6.5, Nelim off-centre. RISK: a seated pose is not a step -> she stands at the chair with the bowl; the accepted earlier picture (1-two-dishes-nelim-seated) stays if this one is worse.
#   3. dining-nook, 12:10, +417. Subject: the blanquette. Nelim: Apparel_BasicShirt white (240, 240, 236) under Apparel_Jacket denim (60, 92, 140), Apparel_Pants dark (70, 70, 78), Ponytails, own face, holds Meat_Cow out to Shogun.
#      Mei out. Shogun (177, 108) and hen Poule (174, 108), both facing South. Decor, the pot and straw for the hen: VFEPD_CookingPan (173, 109), VFEPD_HayBaleSmall (172, 110). Card right. Composition: mid-close, frame (178, 108) zoom 5.5.
#      RISK: the hen leaves the frame, held meat does not render -> animals posed after the wait, no tick after; fallback is a held MealSimple.
#   4. plant-garden, 12:15, +625. Nelim: straw Apparel_CowboyHat (214, 190, 120) over loose Long hair (Show Hair Under Stuff, RaccoonCuddler.ShowHair 3255379190; hat proof ticket e457 pending, removed if no hair shows), Apparel_BasicShirt sky (96, 150, 190), Apparel_Pants brown (110, 82, 58), cheerful2, carries 6 RawPotatoes; hen Poule at (191, 86) facing South; decor PlantAppletree, PlantCherrytree; card of FlavorTextFR_Gnocchi, right; frame (190, 85) zoom 7. RISK: no hair under the hat, Gnocchi slot 0 not a potato -> replay without the hat or without the card.
#
# PLACES, PEOPLE, FACE and ORDER OF EVERY SCENARIO: unchanged from the second version (NPT, 2026-10-07/08): the waits first, then the game paused, then the dressing, then "stands at" LAST, the face, the framing and the capture with no wait after.
# Bodies are the retextured ones of Venus Touch Waistlines' pass (owner, 2026-10-07). Food Texture Variety gives the meals their own bowls. Table cells: meals on (175..176, 108..109), chairs (175, 110) and (176, 110).
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
    When Flavor Text Extended: a colonist cooks "FTV_CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "Meat_Cow, RawPotatoes", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "EggChickenUnfertilized, RawRice", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "RawCorn, Meat_Pig", 1 times
    And Flavor Text Extended: a colonist also cooks "FTV_CookMealSimple" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized", 100 times
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    Given Nelim's Pickle Tools: I place the decor "VFEPD_FoodTrolley" at (173, 109)
    And Nelim's Pickle Tools: I place the decor "VFEPD_WineRack" at (173, 107)
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_CollarShirt" dyed rgb (176, 84, 52)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (58, 60, 68)
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
    And Nelim's Pickle Tools: "Nelim" carries 1 of the item "MealFine"
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

  # 2. 12:05. The dish with two names at once, Nelim at her chair with a bowl, Shogun at her feet, hay bale and egg box as decor. Outfit and hair changed (sage shirt, cream trousers, bun).
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
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (122, 150, 104)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (222, 210, 184)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Bun"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (177, 111)
    Given Nelim's Pickle Tools: "Nelim" stands at (176, 110) facing South
    And Nelim's Pickle Tools: the animal "Shogun" stands at (177, 111) facing South
    And Nelim's Pickle Tools: "Nelim" carries the item "MealSimple"
    When Nelim's Pickle Tools: "Nelim" facial expression is "normal+Ingest"
    And Nelim's Pickle Tools: I frame the cell (181, 108) at zoom 6.5
    And Flavor Text Extended: the info card of a meal named after 2 dishes at once is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:05 - Nelim and the meal with two dishes at once, its card beside"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 3. 12:10. The pot of beef, pork and milk is a blanquette. Mei is gone: Nelim in a denim jacket hands Shogun a scrap while the hen watches; both animals face the camera.
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
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (240, 240, 236)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Jacket" dyed rgb (60, 92, 140)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (70, 70, 78)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Ponytails"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (177, 108)
    And Nelim's Pickle Tools: an adult animal of kind "Chicken" named "Poule" is spawned at (174, 108)
    Given Nelim's Pickle Tools: "Nelim" stands at (176, 110) facing South
    And Nelim's Pickle Tools: the animal "Shogun" stands at (177, 108) facing South
    And Nelim's Pickle Tools: the animal "Poule" stands at (174, 108) facing South
    And Nelim's Pickle Tools: "Nelim" carries 1 of the item "Meat_Cow"
    When Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: I frame the cell (178, 108) at zoom 5.5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextExtended_TwoMeatBlanquette" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:10 - the blanquette, Nelim hands Shogun a scrap while a hen watches"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 4. 12:15. After lunch, in the plant garden: Nelim in a straw hat over loose long hair, six potatoes in her arms, a hen at her feet, the card of a potato dish beside her. Says: what grows here decides what lunch can be.
  # RISKS: the hair may not show under the hat (Show Hair Under Stuff, 3255379190: proof of NPT ticket e457 pending; plan B Hat Hair Control 3760821540) -> if the picture shows no hair, play again without the hat, never keep it; Gnocchi may not carry the potato in slot 0 -> if the card step fails, replay without the card.
  Scenario: after lunch, the plant garden
    Given Nelim's Sanctuary: I am at the sanctuary "plant-garden"
    And I wait 685 ticks
    And game speed is paused
    And Nelim's Pickle Tools: the temperature of the map is 20 degrees
    And Nelim's Pickle Tools: I let 120 ticks pass
    When Flavor Text Extended: a colonist cooks "FTV_CookMealSimple" at the "FueledStove" from "RawPotatoes", 100 times
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (96, 150, 190)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (110, 82, 58)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_CowboyHat" dyed rgb (214, 190, 120)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Long"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: I place the decor "PlantAppletree" at (183, 84) fully grown
    And Nelim's Pickle Tools: I place the decor "PlantCherrytree" at (185, 82) fully grown
    Given Nelim's Pickle Tools: an adult animal of kind "Chicken" named "Poule" is spawned at (191, 86)
    Given Flavor Text Extended: "Nelim" stands on the free cell nearest to (190, 85)
    And Nelim's Pickle Tools: the animal "Poule" stands at (191, 86) facing South
    And Nelim's Pickle Tools: "Nelim" carries 6 of the item "RawPotatoes"
    When Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: "Nelim" facial expression is "normal+moodCheerful2"
    And Nelim's Pickle Tools: I frame the cell (190, 85) at zoom 7
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_Gnocchi" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:15 - Nelim in a straw hat in the plant garden with potatoes in her arms and a hen at her feet, the potato dish card beside"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs
