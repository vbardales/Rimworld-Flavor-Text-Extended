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
# Run it with -DepMap wsl-deps.workshop-captures.map -Filter 06-workshop-captures.feature.
# ScreenshotStudio supplies Nelim's sanctuary (save "Nelims-tribe", one colonist: Nelim, that is Virginie). The card is an object inspect
# window, a fullscreen interface capture, so it goes over a window backdrop framing (PickleTools docs/GALERIE.md). "window-backdrop-for-width"
# ran green on 2026-10-06 (run 95a5); "window-backdrop-for-height" is NOT validated by PickleTools and is tried here at the owner's request, to
# compare. ScreenshotMode keeps the card while hiding the
# HUD and Pickle panels.
@review @requires:nelim.pickletools.screenshotmode @requires:nelim.pickletools.screenshotstudio
Feature: what the Workshop captures show

  Background:
    Given the save "Nelims-tribe" is loaded
    And game speed is paused
    And Nelim's Pickle Tools: the eclipse of the map is ended
    And Nelim's Pickle Tools: studio presentation mode is enabled
    And I set the hour to 12
    And I set the weather to "Clear"
    And Nelim's Pickle Tools: all animals are removed
    And Nelim's Pickle Tools: I am at the sanctuary "window-backdrop-for-height"

  Scenario: the info card of a katsudon
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized", 100 times
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_Katsudon" is opened
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then I take a screenshot "katsudon - the info card of a meal cooked from rice, pork and egg"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  Scenario: the info card of a meal with two dishes at once
    When Flavor Text Extended: a colonist cooks "CookMealFine" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized, RawPotatoes", 50 times
    And Flavor Text Extended: the info card of a meal named after 2 dishes at once is opened
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then I take a screenshot "two dishes at once - the info card of a meal cooked from four ingredients"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs

  Scenario: the info card of a medium-boiled egg
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "EggChickenUnfertilized", 300 times
    And Flavor Text Extended: the info card of a meal named after "FlavorTextFR_OeufMollet" is opened
    And Nelim's Pickle Tools: screenshot mode is enabled around the open windows
    Then I take a screenshot "medium-boiled egg - the info card of a meal cooked from one ingredient"
    When Nelim's Pickle Tools: screenshot mode is disabled
    And I close all dialogs
