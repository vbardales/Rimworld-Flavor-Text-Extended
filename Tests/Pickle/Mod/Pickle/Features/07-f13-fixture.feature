# Produces the F13 input fixture for the French companion.  This pass deliberately stages Flavor
# Text and Flavor Text Extended, but never Flavor Text Extended - Francais: the saved meals must
# predate installation of that translation.
@wip
Feature: create a legacy Flavor Text meal fixture for the French companion

  Scenario: stored Flavor Text meals are saved before FTFR is installed
    Given the save "test-colony" is loaded
    And a colonist "Cook" exists
    And I spawn a "FueledStove" at (140, 155)
    When Flavor Text Extended: a colonist cooks "CookMealSimple" at the "FueledStove" from "RawRice, Meat_Pig, EggChickenUnfertilized", 100 times
    And Flavor Text Extended: 6 of the meals are placed on the map
    And Flavor Text Extended: I save the placed meals as "legacy-meals-before-ftfr"
    Then no errors were logged
