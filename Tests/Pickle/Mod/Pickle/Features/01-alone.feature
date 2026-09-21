# The pass WITHOUT the optional mods: Core, the DLCs, Harmony, RimLogging, Pickle, Flavor Text and
# this mod, and nothing else. No ingredient provider is staged.
#
# Run it with `-Filter 01-alone.feature`. Its second scenario asserts that the providers are ABSENT,
# so it must not be played in the pass that stages them.
#
# What only a running game can show for this mod. Everything provable outside the game is proved
# outside it: `_tools/Test-Xml.ps1` applies the same patch operations in memory, and
# `_tools/checkdefs.js` and `Check-ConfigErrors.ps1` read all 901 dishes. What they cannot say:
#   - that the game loaded both mods, in this order;
#   - that the defs of a custom type (FlavorText.FlavorDef) reach the database under this mod;
#   - that the patches take effect once every other active mod has patched the same categories;
#   - that all of it happens without a red line. `Test-Xml.ps1` says itself that it does not
#     emulate the loader, and TESTS.md T3 records why that matters here: a MayRequire on an
#     <Operation> is read by nothing, the one on each <li> does the work, and only a real load
#     shows the arrangement holding.
#
# Not written here, on purpose: no assertion on what the patches ADD to a category's
# thingDefsToAbsorb. That would restate what Test-Xml.ps1 proves, and Pickle's `field` step has no
# documented form for list elements.
#
# The last scenario cannot fail for a reason of ours alone. `no errors were logged` is global:
# an error from Flavor Text itself, or from the companion test mod, fails it too. Read who logged
# it before blaming this mod.
Feature: Flavor Text Extended alone on Flavor Text

  Scenario: both mods are loaded, in the order that matters
    Then mod "hekmo.FlavorText" is loaded
    And mod "nelim.flavortextextended" is loaded
    # loadAfter is a request; the game decides.
    And mod "nelim.flavortextextended" loads after "hekmo.FlavorText"

  Scenario: no ingredient provider is present, so this really is the bare pass
    # Without these three lines a staging accident would pass as the bare pass. None of them is
    # a dependency of this mod.
    Then mod "vvenchov.vvnewharvest" is not loaded
    And mod "daylight.rlevvcultivationplus" is not loaded
    And mod "daylight.rimlifeextrgmod" is not loaded

  Scenario: the new categories and a sample of dishes are defined by this mod
    # DISPLAY NAME below, not the packageId: the last scenario says why the difference is not
    # cosmetic.
    Then def "FT_Leek" is defined by mod "Flavor Text Extended"
    And def "FT_Shallot" is defined by mod "Flavor Text Extended"
    And def "FT_Meat_Turtle" is defined by mod "Flavor Text Extended"
    And def "FT_Meat_Frog" is defined by mod "Flavor Text Extended"
    # One dish of each generation of the file layout: the original set, and the FoodCourt one.
    And def "FlavorTextFR_OeufMollet" is defined by mod "Flavor Text Extended"
    And def "FlavorTextFR_Katsudon" is defined by mod "Flavor Text Extended"
    And def "FlavorTextExtended_Altang" is defined by mod "Flavor Text Extended"

  Scenario: the unguarded keyword patches landed on Flavor Text's categories
    # Only the operations with no MayRequire at all. A guarded operation may or may not run
    # without its provider, and this pass is not the one that decides it.
    Then def "FT_Apple" was patched by mod "Flavor Text Extended"
    And def "FT_Soy" was patched by mod "Flavor Text Extended"
    And def "FT_Berry" was patched by mod "Flavor Text Extended"
    And def "FT_Meat_Insect" was patched by mod "Flavor Text Extended"
    And def "FT_AnimalFoods" was patched by mod "Flavor Text Extended"

  Scenario: it loads without its optional mods and says nothing
    # DISPLAY NAME on purpose: the step compares against RimLogging's LogEntry.Mod, which holds
    # About.xml's <name>. Its guard accepts a packageId too, then matches no warning ever and
    # reports green however loudly the mod complained.
    Then no warnings from mod "Flavor Text Extended"
    # A warning caused in vanilla or Flavor Text code is attributed to nobody, so the step above
    # cannot see it; that class needs `no warning matching ... was logged`, and nothing yet names
    # a symptom worth matching.
    And no errors were logged
