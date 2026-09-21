# The pass WITH the optional providers, staged from Tests/Pickle/wsl-deps.avec-facultatifs.map:
# VV New Harvest, RimLife Cultivation Plus and RimLife Expansion Trading (with its own framework).
#
# Run in the pass named `avec-facultatifs` only, with `-Filter 02-avec-facultatifs.feature`: its
# first scenario asserts that the providers are present, and 01 asserts the opposite. Its point is the opposite of 01: with the mods
# present, the guarded <li> entries stop being dropped and have to RESOLVE. A name that no longer
# exists in a provider is the failure this mod is exposed to, and it shows as a red line at load:
# `Could not resolve cross-reference to Verse.ThingDef named ...`.
# `_tools/Test-OptionalIngredients.ps1` checks the 47 references against the providers' XML; only
# the loader says whether they resolve.
#
# Chinese Traditional Cultural Things Expanded is not staged: see the map for why. So this pass
# covers only part of the 47 references, and says so rather than implying the rest.
Feature: Flavor Text Extended beside its optional ingredient providers

  Scenario: the providers are really there, so this is not the bare pass under another name
    Then mod "vvenchov.vvnewharvest" is loaded
    And mod "daylight.rlevvcultivationplus" is loaded
    And mod "daylight.rimlifeextrgmod" is loaded
    # One def each, from the exact set this mod names. A provider that loaded but no longer
    # defines what the patches attach would pass the three lines above and break the mod.
    And def "VV_Leeks" exists
    And def "VV_Chingensai" exists
    And def "RLE_DriedMeat" exists
    And def "RLE_CheesNatureAged" exists

  Scenario: the patches aimed at the providers' ingredients land
    # These categories are patched by operations that carry a MayRequire; with the provider
    # active there is no doubt that they apply.
    Then def "FT_Onion" was patched by mod "Flavor Text Extended"
    And def "FT_Tomato" was patched by mod "Flavor Text Extended"
    And def "FT_MeatRaw" was patched by mod "Flavor Text Extended"
    And def "FT_Cheese" was patched by mod "Flavor Text Extended"

  Scenario: the providers' ingredients are filed where the patches send them
    # T10 of TESTS.md, and the attachment risk the whole guard arrangement exists for. Each line is
    # one <li MayRequire> of Patches/Keywords_Cultivation.xml or Keywords_Mods.xml, resolved by the
    # loader and read back from the category tree: a name the provider dropped fails here, in the
    # attribution, and not only as a red line in the log.
    Then Flavor Text Extended: "VV_Chingensai" is filed under "FT_LeafyVeg"
    And Flavor Text Extended: "VVTomato" is filed under "FT_Tomato"
    And Flavor Text Extended: "VVOnion" is filed under "FT_Onion"
    And Flavor Text Extended: "VVPaprika" is filed under "FT_BellPepper"
    And Flavor Text Extended: "RLE_DentCorn" is filed under "FT_Corn"
    And Flavor Text Extended: "RLE_DriedMeat" is filed under "FT_MeatRaw"
    And Flavor Text Extended: "RLE_CheesNatureAged" is filed under "FT_Cheese"

  Scenario: leek is not onion
    # T8 of TESTS.md. VV_Leeks is absorbed by the leek category, whose parent is the generic
    # vegetable one; a leek that fell under onion would let every onion dish fire on it.
    Then Flavor Text Extended: "VV_Leeks" is filed under "FT_Leek"
    And Flavor Text Extended: "VV_Leeks" is not filed under "FT_Onion"

  Scenario: the leek category is defined by this mod, with VV_Leeks around
    # FT_Leek absorbs VV_Leeks behind a MayRequire on its <li>. Here that reference is live.
    Then def "FT_Leek" is defined by mod "Flavor Text Extended"

  Scenario: it loads beside the providers and says nothing
    # An unresolved reference is logged by the loader, so it is attributed to nobody:
    # `no errors were logged` is the assertion that catches it, and the one that matters most in
    # this pass. The attributed check covers what this mod itself logs.
    Then no warnings from mod "Flavor Text Extended"
    And no errors were logged
