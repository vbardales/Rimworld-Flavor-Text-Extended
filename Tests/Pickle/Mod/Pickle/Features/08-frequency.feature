# How often a meal carries a dish of this mod: the measure behind hekmo's Workshop report of
# 2026-09-25 ("I'm spawning hundreds of meals with random ingredients and only get Flavor Text's
# own dishes"). Run it in the bare pass, beside 03-cooking:
#   -Filter 08-frequency.feature
#
# Each scenario draws ingredients at random from everything Flavor Text files under a category,
# cooks 400 meals through GenRecipe.MakeRecipeProducts (see 03-cooking for what is real), and logs
# one line "[FTE frequency] ..." with the share of meals that carry a dish of this mod. The seed
# makes a run repeatable, so a change to the dishes can be compared with the run before it.
#
# The floor is 1 percent, only to tell "nothing ever fires" from "something does". It is not a
# target: read the logged number in Player.log and in the report. Raise the floor once a baseline
# is recorded in TESTING.md.
#
# English only, like 03-cooking.
Feature: how often this mod's dishes name a meal

  Background:
    Given the save "test-colony" is loaded
    And a colonist "Cook" exists
    And I spawn a "FueledStove" at (140, 155)

  Scenario: two random ingredients
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from 2 random ingredients, 400 times, seed 1
    Then Flavor Text Extended: at least 1 percent of the named meals carry a dish of this mod
    And no errors were logged

  Scenario: three random ingredients
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from 3 random ingredients, 400 times, seed 2
    Then Flavor Text Extended: at least 1 percent of the named meals carry a dish of this mod
    And no errors were logged

  Scenario: four random ingredients
    When Flavor Text Extended: a colonist cooks "CookMealFine" at the "FueledStove" from 4 random ingredients, 400 times, seed 3
    Then Flavor Text Extended: at least 1 percent of the named meals carry a dish of this mod
    And no errors were logged
