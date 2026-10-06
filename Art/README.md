# Artwork sources

Sources: `Preview-source.png` (text-free illustration), `echo.png` (line art), `ModIcon-source.png` (the owner's icon, full size)
and `Preview.config.json` (copy, typography, layout, palette; `modIconSource` makes the renderer write the 128 x 128 ModIcon).

`node ../../scripts/Render-Preview.cjs` from the repository root writes `Mod/About/ModIcon.png`, `Mod/About/Preview.png`, `Gallery/0-preview.png`
(a byte-for-byte copy of the Preview) and the two local `.ico` files. Its checks go to `.render/`, ignored by git.

`Gallery/` holds the images to upload to the Workshop page, in order; see `PUBLICATION.md`.
`ModIcon-original.png` is the first icon (mascot with its ribbon lettering, 128 x 128), kept as a record.
