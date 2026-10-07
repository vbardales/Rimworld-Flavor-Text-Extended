# Next gallery, scenes. Pass: -DepMap wsl-deps.gallery-scenes.map -Filter 10-gallery-scenes.feature (plan and open points: Tests/Pickle/next-gallery/README.md). @review: a green run proves the path ran, never that the picture is right.
#
# THE STORY: "Lunch is served" (Nelim's lunch). One midday on the Sanctuary, told in four pictures, the table first because Steam shows image 1 large.
#   1. 12:00  The table is laid: several cooked meals, each with a different dish name, on the dining nook's table; one card beside them.
#   2. 12:05  Nelim sits and eats; the card of the meal with two dishes at once is open beside her.
#   3. 12:10  The simplest dish, a medium-boiled egg, and a hen that came to see (a daytime animal at noon).
#   4. 12:15  After lunch, Nelim is in the plant garden, where the ingredients of the next meal grow.
# Not here: the breadth picture (many dish names at once) and the before / after composite. See README.md.
#
# RHYTHM (author's choice, PUBLISHING.md "temps de la série"): the same hour of departure in every scenario (12), then an accumulated wait
# before the capture, 5 minutes of game time per picture: 2 500 ticks per game hour, about 208 ticks for 5 minutes. Each Scenario reloads
# the save, so every one replays its own wait: 60 ticks of set-up, then +0, +208, +417, +625. The living things are posed AFTER the wait so that
# they have not left the frame.
#
# PLACES (chosen on the empty photographs of PickleTools sanctuaire-places2, 2026-10-06, not on the names; the same place may serve several
# pictures, there is no need to change it each time): `dining-nook` for 1 to 3 (wooden floor, a table on a white rug with two chairs, torches,
# logs and plants along the bottom edge), `plant-garden` for 4 (a fenced garden of mixed plants). None of them is a framing still under review.
#
# 4 puts Nelim on the free cell nearest to (190, 85): that exact cell was not standable on the first pass and the listing step is gone.
# CHOICES (every cell is provisional, to be read on the first played image): the free cells of the table, where Nelim stands, the cell of the hen.
# Nelim is dressed by the photographer, vanilla garments only (no third-party mod in the pass): a teal shirt against the orange wood, cream
# trousers, a ponytail of dark brown hair; never the default outfit. Steps from TailorMadeWaistlines' gallery (wears ... dyed rgb, hairstyle, hair colour).
@review @requires:nelim.pickletools.screenshotstudio @requires:nelim.pickletools.screenshotmode @requires:nelim.pickletools.stagedecor
Feature: Lunch is served

  Background:
    Given the save "Nelims-tribe" is loaded
    And game speed is paused
    And Nelim's Pickle Tools: the eclipse of the map is ended
    And Nelim's Pickle Tools: studio presentation mode is enabled
    And I set the hour to 12
    And I set the weather to "Clear"
    And Nelim's Pickle Tools: all animals are removed

  # 1. 12:00. Four different meals on the table, the katsudon's card beside them.
  Scenario: the table is laid
    Given Nelim's Pickle Tools: I am at the sanctuary "dining-nook"
    And I wait 60 ticks
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized", 100 times
    And Flavor Text Extended: a colonist also cooks "CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    And Flavor Text Extended: a colonist also cooks "CookMealSimple" at the "FueledStove" from "EggChickenUnfertilized", 300 times
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    And Nelim's Pickle Tools: I frame the cell (181, 108) at zoom 6.5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_Katsudon" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then I take a screenshot "lunch 12:00 - the table is laid, the katsudon card beside it"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 2. 12:05. Nelim at the table. A seated pose is the open question (no step known, ASK PICKLE TOOLS): until then she stands at the table.
  Scenario: Nelim eats the meal with two dishes at once
    Given Nelim's Pickle Tools: I am at the sanctuary "dining-nook"
    And Nelim's Pickle Tools: "Nelim" stands at (176, 106) facing North
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (46, 102, 112)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (222, 210, 184)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Ponytails"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    And I wait 268 ticks
    When Flavor Text Extended: a colonist cooks "CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    And Nelim's Pickle Tools: I frame the cell (181, 108) at zoom 6.5
    And Flavor Text Extended: the info card of a meal named after 2 dishes at once is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then I take a screenshot "lunch 12:05 - Nelim and the meal with two dishes at once, its card beside"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 3. 12:10. The egg and a hen. The hen is posed after the wait.
  Scenario: the medium-boiled egg and a hen that came to see
    Given Nelim's Pickle Tools: I am at the sanctuary "dining-nook"
    And Nelim's Pickle Tools: "Nelim" stands at (176, 106) facing North
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (46, 102, 112)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (222, 210, 184)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Ponytails"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    And I wait 477 ticks
    And an adult animal of kind "Chicken" named "Poule" is spawned at (177, 106)
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "EggChickenUnfertilized", 300 times
    And Flavor Text Extended: the meals are put on the table from (175, 108) to (176, 109)
    And Nelim's Pickle Tools: I frame the cell (181, 108) at zoom 6.5
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_OeufMollet" is opened
    And Flavor Text Extended: the info card is placed at the "right" of the screen
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then I take a screenshot "lunch 12:10 - the medium-boiled egg and a hen at the table"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  # 4. 12:15. After lunch, in the plant garden. No card: a picture of the place and of the woman who grows what the dishes need.
  Scenario: after lunch, the plant garden
    Given Nelim's Pickle Tools: I am at the sanctuary "plant-garden"
    And Flavor Text Extended: "Nelim" stands on the free cell nearest to (190, 85)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_BasicShirt" dyed rgb (46, 102, 112)
    And Nelim's Pickle Tools: "Nelim" wears "Apparel_Pants" dyed rgb (222, 210, 184)
    And Nelim's Pickle Tools: "Nelim" hairstyle is "Ponytails"
    And Nelim's Pickle Tools: "Nelim" hair colour is rgb (70, 46, 32)
    And I wait 685 ticks
    When Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then I take a screenshot "lunch 12:15 - Nelim in the plant garden, where the next meal grows"
    When Nelim's Pickle Tools: screenshot mode is disabled

# The 5-minute rhythm above: 60 + 0 = 60 (not used, scenario 1 waits 60), 60 + 208 = 268, 60 + 417 = 477, 60 + 625 = 685.
# The before / after has no scenario of its own: it is the same card captured twice. Pass 1, the mod absent (a game without
# nelim.flavortextextended, the bare pass of the suite minus the mod): the meal of rice, pork and egg is a "simple meal". Pass 2: scenario 1 of
# this file. The composite is cut and labelled outside the game. Needs a map without the mod in `-DepMap` (`wsl-deps.without-the-mod.map`,
# to be written) once Pickle Tools confirms a pass can drop the mod under test.
