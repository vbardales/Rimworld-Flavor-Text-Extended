# Gallery scenes, fifth version (2026-11-09, shotlist rewritten after replay 4 and an Opus director pass; plan score and the table with every field are in STATUS.md "Shotlist"). Pass: -DepMap wsl-deps.gallery-scenes-ftv.map -Filter 10-gallery-scenes.feature. @review: a green run proves the path ran, never that the picture is right. Screen 1920x1080 (read on the last captures, card at x 950 to 1900).
#
# THE STORY: "Lunch is served" (criterion k). WHO: Nelim, the colony's cook and gardener, her guest, an anonymous colonist "Guest" (Miel's look is not marked OK in LOOKS-VALIDATION, so no NSB casting), Shogun her labrador and a hen. WHERE: the Sanctuary, dining-nook (1 to 3), plant-garden (4). WHICH DAY: one clear warm midday, 12:00 to 12:15. RHYTHM: +5 min of game time per image (2 500 ticks per game hour): 60 set-up ticks, then +0, +208, +417, +625; each Scenario reloads the save, so decor ends with the scenario. The gallery save is the old undecorated Sanctuary: every prop is placed by the scenario.
# OUTFIT CONTINUITY (owner rule 2026-10-23): Nelim keeps ONE outfit all day, no change, no hat (the hat of the garden was dropped 2026-11-09: Hat Hair Control never showed the hair): sky Apparel_BasicShirt rgb (96, 150, 190), charcoal Apparel_Pants rgb (58, 60, 68), canon hair Roo_HD_Hair_Highpony rgb (70, 46, 32), smile. Guest (1 and 2 only, anonymous, own look: Bob rgb (196, 160, 96), plum Apparel_BasicShirt rgb (122, 58, 108), sage Apparel_Pants rgb (110, 130, 80). Shogun keeps his default collar.
# PIXELS (screen 1920x1080, frame cell at x 960; cell = 540 / zoom px, thumbnail = 0.14 x that, readable from 20 px; the card covers x > 950, so subjects and props stand left of the frame cell): zoom 3.5 = 154 px (21.6 in the thumbnail), zoom 3 = 180 px (25)./
#
#   1. table-laid. At noon, dining-nook, Clear, +0 (60 ticks set-up). Subject: one table carries four different dish names. Instant: Nelim has just taken the last plate from the trolley and walks it to the table while Guest steps in at the door. Gesture: forced haul of one FTV_MealFine to (176, 110), 20 ticks, Nelim mid-walk from (174, 109) facing East, Guest forced to walk from (174, 111) to (175, 110), Shogun trotting behind at (173, 111). Decor: VFEPD_FoodTrolley (173, 109), VFEPD_WineRack (173, 107), VFEPD_Fridge (172, 108), EggBox (173, 108), StandingLamp (178, 107) lit. Foreground the four plates, background the kitchen props and the lamp. Card of FlavorTextFR_Katsudon on the right. Wide, zoom 3.5, frame (178, 108).
#   2. first-bite. At noon, dining-nook, Clear, +208 ticks. Subject: one meal named after two dishes at once; Guest waits for the verdict. Instant: Nelim has just sat down and takes the first bite, Guest leans in to hear what she says. Gesture: Nelim stands at (176, 110) facing South toward the table and the camera, forced Ingest on FTV_MealFine at (176, 109) advanced 90 ticks, face normal+Ingest; fallback if the job does not hold: she stands there holding the plate. Guest at (175, 110) facing East toward her, cheerful, "Guest" is logged (she was missing from the last capture, as "Miel"). Shogun (175, 111) facing South, front view. Decor: EggBox (173, 108), VFEPD_CuttingBoard (173, 110), VFEPD_FoodTrolley (173, 109), VFEPD_WineRack (173, 107), StandingLamp (172, 111). Foreground the two women and the plate, background the trolley and the lamp. Card of the meal named after two dishes. Close, zoom 3, frame (177, 110).
#   3. blanquette. At noon, dining-nook, Clear, +417 ticks. Subject: the everyday pot of beef, pork and milk gets a real name. Instant: the guest has gone and Nelim slips Shogun a scrap of beef just as the hen creeps in for the crumbs. Gesture: Nelim stands at (176, 110) facing East carrying 1 Meat_Cow toward Shogun (177, 110) facing West, the hen Poule at (174, 110) facing East. Decor: VFEPD_CookingPan (173, 109), VFEPD_HayBaleSmall (173, 111), VFEPD_Fridge (172, 108), StandingLamp (172, 111), EggBox (173, 108). Foreground Nelim and Shogun, background pan, hay and lamp. Card of FlavorTextExtended_TwoMeatBlanquette. Medium, zoom 3.5, frame (178, 110).
#   4. garden. At noon, plant-garden, Clear, +625 ticks. Subject: the garden decides the menu; lunch is over. Instant: Nelim has just pulled a potato and carries it back toward the house, Shogun at her heels and the hen underfoot. Gesture: Nelim on the free cell nearest (189, 85) facing East (the carried RawPotatoes then do not hide her body), Poule (190, 85) facing West in front of her, Shogun (188, 86) facing East. Decor: PlantAppletree (186, 83), PlantCherrytree (188, 82) fully grown, VFEPD_WoodenWagon (186, 86), VFEPD_HayBaleMedium (188, 88), VFEPD_FoodBox (189, 87), VFEPD_WoodenLogs (190, 83). Foreground Nelim and the animals, background the trees, wagon and crates. Card of FlavorTextFR_GnocchiSolo. Medium-wide, zoom 3.5, frame (191, 85).
#
# EPISODES: (1) the table is laid and the guest arrives, (2) the first bite of the double dish, (3) the guest has left, the pot is named, (4) Nelim and Shogun step out into the garden that feeds the next menu. RISKS: forced Ingest or the mid-walk may not freeze (replay with another tick count); a carried item may drop under a walk (then she stands with it); Guest may vanish again (read her log line); Poule or Shogun may not stay in frame.
#
# Bodies are the retextured ones of Venus Touch Waistlines' pass (owner, 2026-10-07). Food Texture Variety gives the meals their own bowls. Table cells: meals on (175..176, 108..109), chairs (175, 110) and (176, 110). Order of every scenario: the waits first, then the game paused, then the dressing, "stands at" LAST, the face, the framing and the capture with no wait after.
@review @requires:nelim.pickletools.screenshotstudio @requires:nelim.pickletools.screenshotmode @requires:nelim.pickletools.stagedecor @requires:nelim.pickletools.colonistrace @requires:nelim.pickletools.camerazoom
Feature: Lunch is served

  Background:
    Given the save "Nelims-tribe" is loaded
    And game speed is paused
    And Nelim's Pickle Tools: the eclipse of the map is ended
    And Nelim's Pickle Tools: studio presentation mode is enabled
    And I set the hour to 12
    And I set the weather to "Clear"
    And Nelim's Pickle Tools: all animals are removed

  # 1. 12:00. Nelim brings the last plate while Guest walks in: four different meals on the table, the katsudon card at the right.
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
    And Nelim's Pickle Tools: I place the decor "StandingLamp" at (178, 107)
    And Nelim's Pickle Tools: I place the decor "VFEPD_Fridge" at (172, 108)
    And Nelim's Pickle Tools: I place the decor "EggBox" at (173, 108)
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (96, 150, 190)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (58, 60, 68)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Roo_HD_Hair_Highpony"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: a colonist "Guest" of kind "Colonist" exists
    And Nelim's Pickle Tools: "Guest" gender is Female
    And Nelim's Pickle Tools: "Guest" body type is Female
    And Nelim's Pickle Tools: "Guest" hairstyle is "Bob"
    And Nelim's Pickle Tools: "Guest" hair colour is rgb (196, 160, 96)
    And Nelim's Pickle Tools: "Guest" wears "Apparel_BasicShirt" dyed rgb (122, 58, 108)
    And Nelim's Pickle Tools: "Guest" wears "Apparel_Pants" dyed rgb (110, 130, 80)
    And Nelim's Pickle Tools: "Guest" face kit is "smile"
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (173, 111)
    Given Nelim's Pickle Tools: "Nelim" stands at (174, 109) facing East
    And Nelim's Pickle Tools: "Guest" stands at (174, 111) facing East
    And Nelim's Pickle Tools: the animal "Shogun" stands at (173, 111) facing East
    And Nelim's Pickle Tools: "Nelim" is forced to haul 1 of the item "FTV_MealFine" to (176, 110)
    And Nelim's Pickle Tools: "Guest" is forced to walk to (175, 110)
    When Nelim's Pickle Tools: I advance the paused game by exactly 20 ticks
    And Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: "Guest" face is held neutral
    And Nelim's Pickle Tools: "Guest" facial expression is "normal+moodCheerful2"
    And Nelim's Pickle Tools: I frame the cell (178, 108) at zoom 3.5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_Katsudon" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:00 - Nelim brings the last plate while Guest walks in, four dishes on the table, the katsudon card beside it"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 2. 12:05. First bite of the dish with two names at once, Guest waits for the verdict, Shogun lies at her feet.
  Scenario: Nelim eats the meal with two dishes at once
    Given Nelim's Sanctuary: I am at the sanctuary "dining-nook"
    And I wait 268 ticks
    And game speed is paused
    And Nelim's Pickle Tools: the temperature of the map is 20 degrees
    And Nelim's Pickle Tools: I let 120 ticks pass
    When Flavor Text Extended: a colonist cooks "FTV_CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    Given Nelim's Pickle Tools: I place the decor "EggBox" at (173, 108)
    And Nelim's Pickle Tools: I place the decor "VFEPD_CuttingBoard" at (173, 110)
    And Nelim's Pickle Tools: I place the decor "VFEPD_WineRack" at (173, 107)
    And Nelim's Pickle Tools: I place the decor "VFEPD_FoodTrolley" at (173, 109)
    And Nelim's Pickle Tools: I place the decor "StandingLamp" at (172, 111)
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (96, 150, 190)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (58, 60, 68)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Roo_HD_Hair_Highpony"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: a colonist "Guest" of kind "Colonist" exists
    And Nelim's Pickle Tools: "Guest" gender is Female
    And Nelim's Pickle Tools: "Guest" body type is Female
    And Nelim's Pickle Tools: "Guest" hairstyle is "Bob"
    And Nelim's Pickle Tools: "Guest" hair colour is rgb (196, 160, 96)
    And Nelim's Pickle Tools: "Guest" wears "Apparel_BasicShirt" dyed rgb (122, 58, 108)
    And Nelim's Pickle Tools: "Guest" wears "Apparel_Pants" dyed rgb (110, 130, 80)
    And Nelim's Pickle Tools: "Guest" face kit is "smile"
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (175, 111)
    Given Nelim's Pickle Tools: "Nelim" stands at (176, 110) facing South
    And Nelim's Pickle Tools: "Guest" stands at (175, 110) facing East
    And Nelim's Pickle Tools: the animal "Shogun" stands at (175, 111) facing South
    And Nelim's Pickle Tools: "Nelim" is forced into the job "Ingest" on the item "FTV_MealFine" at (176, 109)
    When Nelim's Pickle Tools: I advance the paused game by exactly 90 ticks
    And Nelim's Pickle Tools: "Nelim" facial expression is "normal+Ingest"
    And Nelim's Pickle Tools: "Guest" face is held neutral
    And Nelim's Pickle Tools: "Guest" facial expression is "normal+moodCheerful2"
    And Nelim's Pickle Tools: I frame the cell (177, 110) at zoom 3
    And Flavor Text Extended: the info card of a meal named after 2 dishes at once is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And Flavor Text Extended: "Guest" is logged
    And I take a screenshot "lunch 12:05 - Nelim's first bite of the meal with two dishes at once, Guest waits, its card beside"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 3. 12:10. Guest has left. The pot of beef, pork and milk is a blanquette: Nelim slips Shogun a scrap while the hen creeps in; both animals face each other and the camera side.
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
    And Nelim's Pickle Tools: I place the decor "VFEPD_HayBaleSmall" at (173, 111)
    And Nelim's Pickle Tools: I place the decor "VFEPD_Fridge" at (172, 108)
    And Nelim's Pickle Tools: I place the decor "StandingLamp" at (172, 111)
    And Nelim's Pickle Tools: I place the decor "EggBox" at (173, 108)
    Given Nelim's Pickle Tools: "Nelim" body type is Female
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (96, 150, 190)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (58, 60, 68)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Roo_HD_Hair_Highpony"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (177, 110)
    And Nelim's Pickle Tools: an adult animal of kind "Chicken" named "Poule" is spawned at (174, 110)
    Given Nelim's Pickle Tools: "Nelim" stands at (176, 110) facing East
    And Nelim's Pickle Tools: the animal "Shogun" stands at (177, 110) facing West
    And Nelim's Pickle Tools: the animal "Poule" stands at (174, 110) facing East
    And Nelim's Pickle Tools: "Nelim" carries 1 of the item "Meat_Cow"
    When Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: I frame the cell (178, 110) at zoom 3.5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextExtended_TwoMeatBlanquette" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:10 - the blanquette, Nelim slips Shogun a scrap while a hen creeps in"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 4. 12:15. After lunch, in the plant garden: Nelim goes out in a straw hat over her canon Roo_Royal_LongHD hair, six potatoes in her arms, a hen in front of her, the card of a potato dish beside her. Says: what grows here decides what lunch can be.
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
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Roo_HD_Hair_Highpony"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    Given Nelim's Pickle Tools: I place the decor "PlantAppletree" at (186, 83) fully grown
    And Nelim's Pickle Tools: I place the decor "PlantCherrytree" at (188, 82) fully grown
    And Nelim's Pickle Tools: I place the decor "VFEPD_WoodenWagon" at (186, 86)
    And Nelim's Pickle Tools: I place the decor "VFEPD_HayBaleMedium" at (188, 88)
    And Nelim's Pickle Tools: I place the decor "VFEPD_FoodBox" at (189, 87)
    And Nelim's Pickle Tools: I place the decor "VFEPD_WoodenLogs" at (190, 83)
    Given Nelim's Pickle Tools: an adult animal of kind "Chicken" named "Poule" is spawned at (190, 85)
    Given Nelim's Pickle Tools: an adult animal of kind "LabradorRetriever" named "Shogun" is spawned at (188, 86)
    Given Flavor Text Extended: "Nelim" stands on the free cell nearest to (189, 85)
    And Nelim's Pickle Tools: "Nelim" faces East
    And Nelim's Pickle Tools: the animal "Poule" stands at (190, 85) facing West
    And Nelim's Pickle Tools: the animal "Shogun" stands at (188, 86) facing East
    And Nelim's Pickle Tools: "Nelim" carries 1 of the item "RawPotatoes"
    When Nelim's Sanctuary: Nelim has her own face
    And Nelim's Pickle Tools: "Nelim" facial expression is "normal+moodCheerful2"
    And Nelim's Pickle Tools: I frame the cell (191, 85) at zoom 3.5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_GnocchiSolo" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then Flavor Text Extended: "Nelim" is logged
    And I take a screenshot "lunch 12:15 - Nelim in the plant garden with a potato in her arms, Shogun at her heels and a hen in front of her, the potato dish card beside"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs
