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
# Baseline, measured on 2026-09-26 on the published 1.1.0 defs (seeds 1, 2, 3; docs/runs/2026-09-26-frequency.md): 0.0 percent
# of the two-ingredient meals, 0.8 of the three, 2.3 of the four carried a dish of this mod. The floors below sit under
# what the shorter forms of the dishes are expected to give (about 8 percent for two ingredients on the offline model,
# _tools/frequency.js) and stay at 1 percent where the shorter forms change nothing. They are not targets: read the
# logged number in Player.log.
#
# English only, like 03-cooking.
Feature: how often this mod's dishes name a meal

  Background:
    Given the save "test-colony" is loaded
    And a colonist "Cook" exists
    And I spawn a "FueledStove" at (140, 155)

  Scenario: two random ingredients
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from 2 random ingredients, 400 times, seed 1
    Then Flavor Text Extended: at least 3 percent of the named meals carry a dish of this mod
    And no errors were logged

  Scenario: three random ingredients
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from 3 random ingredients, 400 times, seed 2
    Then Flavor Text Extended: at least 1 percent of the named meals carry a dish of this mod
    And no errors were logged

  Scenario: four random ingredients
    When Flavor Text Extended: a colonist cooks "CookMealFine" at the "FueledStove" from 4 random ingredients, 400 times, seed 3
    Then Flavor Text Extended: at least 1 percent of the named meals carry a dish of this mod
    And no errors were logged
