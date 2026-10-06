# Next gallery, scenes. NOT in Features/ yet: see README.md next to this file. @review: a green run proves the path ran, never that the picture is right.
#
# Order on the Steam page (image 1 is shown large):
#   1. a laid table, a colonist eating, one card beside it;
#   2. before / after (two passes, composite made outside the game, labelled as an edit);
#   3. breadth: many dish names at once.
# Frame: `dining-nook` (the table of the house, indoors) for 1 and 3; the card is the support, not the subject.
@review @requires:nelim.pickletools.screenshotstudio @requires:nelim.pickletools.screenshotmode @requires:nelim.pickletools.stagedecor
Feature: what the next Workshop gallery shows

  Background:
    Given the save "Nelims-tribe" is loaded
    And game speed is paused
    And Nelim's Pickle Tools: the eclipse of the map is ended
    And Nelim's Pickle Tools: studio presentation mode is enabled
    And I set the hour to 12
    And I set the weather to "Clear"
    And Nelim's Pickle Tools: all animals are removed
    And Nelim's Pickle Tools: I am at the sanctuary "dining-nook"

  # 1. The laid table. Four different meals, one per cell, so four names are on the table; the card of the most telling one is open beside it.
  Scenario: a laid table with named meals and one card beside it
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized", 100 times
    And Flavor Text Extended: a colonist cooks "CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    And Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "EggChickenUnfertilized", 300 times
    # NEW: the table cells (x1, z1) to (x2, z2) are to be read on an empty capture of the dining nook.
    And Flavor Text Extended: the meals are put on the table from (175, 107) to (177, 109)
    # NEW or ASK PICKLE TOOLS: a seated, eating Nelim. Without it the scene has the table and the meals only.
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_Katsudon" is opened
    # NEW
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then I take a screenshot "table - named meals laid out, the katsudon card beside them"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 3. Breadth. As many different meals as the pass can cook, so that many different dish names appear; the cards are opened one after the other
  # in the single run and the capture shows the stockpile list or a row of cards. How to show many names at once is open: ASK PICKLE TOOLS.
  Scenario: many dish names at once
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized", 100 times
    And Flavor Text Extended: a colonist cooks "CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    And Flavor Text Extended: 12 of the meals are placed on the map
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then I take a screenshot "breadth - a dozen meals, each with its own dish name"
    When Nelim's Pickle Tools: screenshot mode is disabled

# 2. Before / after has no scenario of its own: it is the same card captured twice. Pass 1, the mod absent (a game without
# nelim.flavortextextended, the bare pass of the suite minus the mod): `a meal cooked from rice, pork and egg is a "simple meal"`. Pass 2: this
# file's first scenario. The composite is cut and labelled outside the game. Needs a map without the mod in `-DepMap`, to be written
# (`wsl-deps.without-the-mod.map`) once Pickle Tools confirms a pass can drop the mod under test.
