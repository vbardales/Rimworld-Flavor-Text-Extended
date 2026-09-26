# T2 of TESTING.md: the mod loads on a game WITHOUT Odyssey.
#
# Why it exists. Four of the six reptile meats named by Defs/FlavorCategoryDefs_Reptiles.xml come
# from Odyssey animals (alligator, monitor lizard, bullfrog, sea turtle), and they are referenced
# by name, each behind a MayRequire="ludeon.rimworld.odyssey" on its own <li>. Three of the four once
# had no guard (commit 31c4931), and Test-Xml.ps1 checks only that the guards are there, not that the
# loader honours them: it does not emulate the loader. Only a game without the expansion can say.
#
# The two "expansion" steps come from PickleTools (ExpansionSteps), staged by the pass map.
#
# Run it with -DepMap wsl-deps.without-odyssey.map -Filter 05-without-odyssey.feature, in English. Played in
# a pass that has Odyssey, its first scenario fails, on purpose: that is what says the pass really
# left the DLC out.
#
# The open question of this pass, from the staging side: whether the game keeps the DLC out of a
# loaded save. Two independent steps ask it (ModsConfig.IsActive, and the mod list), and the run's
# Player.log names the game's own list.
Feature: the mod on a game without Odyssey

  Scenario: the game really has no Odyssey
    Then Nelim's Pickle Tools: the expansion "Ludeon.RimWorld.Odyssey" is not active
    And mod "Ludeon.RimWorld.Odyssey" is not loaded
    # Ideology is one of the four the pass leaves ON: this says only Odyssey was dropped.
    And Nelim's Pickle Tools: the expansion "Ludeon.RimWorld.Ideology" is active
    And no def "Meat_Alligator" exists
    And no def "Meat_SeaTurtle" exists

  Scenario: it loads, and the four guarded meats raise nothing
    Then mod "hekmo.FlavorText" is loaded
    And mod "nelim.flavortextextended" is loaded
    # DISPLAY NAME, as in 01: the step compares against RimLogging's LogEntry.Mod.
    And no warnings from mod "Flavor Text Extended"
    # A reference that resolves to nothing is logged by the loader, so it is attributed to nobody:
    # this is the assertion that catches an unguarded Odyssey meat.
    And no errors were logged

  Scenario: the reptile categories stay declared, and Core's two meats stay filed
    # The guards sit on the entries, not on the category definitions: the five categories exist
    # whatever the modlist, so that their keywords keep attaching a crocodile or a gecko from
    # another mod. Without Odyssey the alligator, lizard and frog categories absorb nothing.
    Then def "FT_Meat_Alligator" is defined by mod "Flavor Text Extended"
    And def "FT_Meat_Lizard" is defined by mod "Flavor Text Extended"
    And def "FT_Meat_Frog" is defined by mod "Flavor Text Extended"
    And Flavor Text Extended: "Meat_Tortoise" is filed under "FT_Meat_Turtle"
    And Flavor Text Extended: "Meat_Iguana" is filed under "FT_Meat_Iguana"
