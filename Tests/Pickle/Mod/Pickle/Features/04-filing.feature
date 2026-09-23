# Where the game's ingredients are FILED among Flavor Text's categories: the "attachment" risk of
# TESTS.md, which is silent when it breaks (a category that absorbs nothing raises no error, its
# dishes just never fire). No save and no cooking: the categories are settled at the main menu.
#
# T9 of TESTS.md, and the reptile file's promise that the meats are told apart. Flavor Text keeps
# them all in one category; splitting them is the whole point of Defs/FlavorCategoryDefs_Reptiles.xml.
# The assertions read the category tree, so they hold without any dish, cooking mod or colony.
#
# The staging always activates Odyssey, so the four guarded meats are present here. Without Odyssey
# their guards drop the entries (TESTS.md T2), which this pass cannot show.
#
# Run it with the bare pass: -Filter 01-alone.feature,03-cooking.feature,04-filing.feature
Feature: reptile meats are told apart

  Scenario: each of the reptile meats sits in its own category
    Then Flavor Text Extended: "Meat_Tortoise" is filed under "FT_Meat_Turtle"
    And Flavor Text Extended: "Meat_SeaTurtle" is filed under "FT_Meat_Turtle"
    And Flavor Text Extended: "Meat_Iguana" is filed under "FT_Meat_Iguana"
    And Flavor Text Extended: "Meat_Alligator" is filed under "FT_Meat_Alligator"
    And Flavor Text Extended: "Meat_MonitorLizard" is filed under "FT_Meat_Lizard"
    And Flavor Text Extended: "Meat_Bullfrog" is filed under "FT_Meat_Frog"

  Scenario: a dish written for one reptile does not fire on another
    # A dish written for turtle fires on turtle meat and not on iguana meat: the slot accepts a
    # category and its descendants, so what has to hold is that neither meat sits under the other.
    Then Flavor Text Extended: "Meat_Iguana" is not filed under "FT_Meat_Turtle"
    And Flavor Text Extended: "Meat_Tortoise" is not filed under "FT_Meat_Iguana"
    And Flavor Text Extended: "Meat_Alligator" is not filed under "FT_Meat_Frog"
    And Flavor Text Extended: "Meat_Bullfrog" is not filed under "FT_Meat_Alligator"
