# Captures for the Workshop page. Nothing here asserts anything about an image.
#
# @review is this project's convention from AUDIT.md, not a Pickle tag, and it changes no behaviour. A green
# scenario below means the trajectory ran, never that the picture shows what it was meant to show: a dish
# name that reads well, a card that is not clipped, no tool of the game in the corner are judgements a person
# makes by OPENING each file. AUDIT.md is explicit that a green @review does not count as a visual check.
#
# What each capture is for, in the order PUBLICATION.md proposes:
#   1. the info card of a katsudon: a dish vanilla would call "simple meal", named from rice, pork and egg;
#   2. the info card of a meal that carries two dishes at once: the mod's most distinctive behaviour;
#   3. the info card of the simplest one, a medium-boiled egg: the whole chain from a single ingredient.
#
# A capture is disqualified if it shows dev tools, another mod's overlay, the launcher panel of Pickle, or an
# empty window. The game's own capture mode hides the interface but keeps windows, so the card stays and the
# rest of the screen should not. English only: the run is staged in English.
#
# Run it with -Filter 06-workshop-captures.feature, in the bare pass.
@review
Feature: what the Workshop captures show

  Background:
    Given the save "test-colony" is loaded
    And a colonist "Cook" exists
    And I spawn a "FueledStove" at (140, 155)

  Scenario: the info card of a katsudon
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized", 100 times
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_Katsudon" is opened
    And I wait 30 ticks
    Then I take a screenshot "katsudon - the info card of a meal cooked from rice, pork and egg"
    When I close all dialogs

  Scenario: the info card of a meal with two dishes at once
    When Flavor Text Extended: a colonist cooks "CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    And Flavor Text Extended: the info card of a meal named after 2 dishes at once is opened
    And I wait 30 ticks
    Then I take a screenshot "two dishes at once - the info card of a meal cooked from four ingredients"
    When I close all dialogs

  Scenario: the info card of a medium-boiled egg
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "EggChickenUnfertilized", 300 times
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_OeufMollet" is opened
    And I wait 30 ticks
    Then I take a screenshot "medium-boiled egg - the info card of a meal cooked from one ingredient"
    When I close all dialogs
