# Artwork sources

`Preview.png` is the preserved illustration without text; `Preview-source.png` is its
original filename. `archive/` preserves the delivered images before this correction. This file, under `Art/`, is not
touched by the ModIcon badge below; only `Mod/About/Preview.png` carries it.

Run `./Art/render-preview.ps1` from PowerShell with Chrome installed. The script reads
`preview-palette.json` and the declared RimWorld version, generates `preview.html`, and
renders the delivered `Mod/About/Preview.png` at 896 x 504. Segoe UI is the intended font.
The brown veil comes from the wooden table, the secondary tan from the warm food and
wood tones, and the green accent from the garnish, separated from those warm hues.

`Mod/About/ModIcon.png` is the original mascot icon, ribbon lettering included, enlarged from
64 x 64 to 128 x 128 (bicubic) at the author's request. The 64 x 64 original is
`archive/ModIcon-before-fix.png`.

Since 2026-09-29, `Mod/About/Preview.png` carries `ModIcon.png` as a badge in the emptiest corner
(bottom-left, +15° rotation, 140px, centered 60px inside the corner so it just touches the edge). `ModIcon-cutout.png`,
in this folder, is `ModIcon.png` with its black square background removed (flood fill from the four borders) — the
badge uses this cutout, not `ModIcon.png` itself, which keeps its square background for the in-game list icon.
`Art/Workshop-captures/00-preview.png` is a copy of
that badged `Preview.png`, the new image 0 of the Workshop gallery (see `PUBLICATION.md`, "Captures for the Workshop
page"). `Art/Preview.png`, the text-free source illustration above, is not badged.

`ModIcon-source.png` is a ribbon-less variant edited with OpenAI's built-in image generation
tool on 2026-09-13. It was **not adopted** and is kept only as a source. Its final edit prompt was:

> Use case: precise-object-edit. Edit target: supplied Flavor Text mascot icon. Create its corrected square mod icon, preserving the recognizable warm orange round mascot head, winking eye, tiny ponytail at upper right, thick near-black outline and simple flat cel shading. Remove the entire text-bearing ribbon and ALL lettering. Place one small simple bowl of food against the lower right of the head to convey cooking. Plain near-black background, one tiny four-point sparkle, no glow, no gradient, no second character, no border, no logo, absolutely no letters or text. Crisp clean simple silhouette readable at 32 pixels. Output a square PNG intended for final 128x128 delivery; preserve mascot identity.
