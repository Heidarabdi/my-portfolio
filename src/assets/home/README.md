# Homepage assets

The approved Wonder reference is implemented by `src/components/home/Homepage.astro`. `Layout.astro` has an opt-in homepage shell; existing pages keep their default shell. The previous homepage-specific components were not reused because their vintage sections, bordered cards, and typography do not match this composition. Existing content collections, project detail dialogs, metadata layout, and Lucide icons are reused.

## Sources

- `developer.png`: original generated illustration from `design-assets/studio-developer-illustration-v1.png`. This is an illustration, not a photograph or verified likeness of Heidar.
- `research.png` and `community.png`: original generated mockups from `design-assets/reference-*-mockup-v1.png`. Prompt notes are in `design-assets/reference-mockups-v1.md`. These are interface studies, not screenshots of shipped client projects.
- `blog-ai.jpg`: https://images.unsplash.com/photo-1498050108023-c5249f4df085
- `blog-accessibility.jpg`: https://images.unsplash.com/photo-1516321318423-f06f85e504b3
- `workspace.jpg`: https://images.unsplash.com/photo-1519389950473-47ba0277781c
- The four decorative SVG files preserve the original paths in the user's Wonder export. They are source artwork, separate from UI icons.

Images are imported through `astro:assets`; output sizes, WebP compression, lazy loading, and the eagerly loaded hero are handled in the component. Outfit is self-hosted through `@fontsource/outfit`.

## New design values

The earlier codebase has no equivalent tokens for this selected style. `src/styles/home.css` therefore defines scoped `--home-*` tokens rather than introducing Wonder-only token names or changing the older theme.

| Token | Value |
| --- | --- |
| paper | #ffffff |
| ink | #29282b |
| muted | #655e5c |
| orange | #ff4d16 |
| action | #bf3814 |
| apricot | #ffb193 |
| dark | #272727 |
| card | #414141 |
| divider | #595959 |
| light | #f3f3f3 |
| line | #e5ded8 |
| desktop gutter | 80px |

Source-specific geometry remains explicit: 1440px maximum frame, 740px desktop hero, 620px circle, 570×550px illustration slot, 40px dark section corners, 300px service stacks, 380px gallery images, 490px testimonial cards, and 280px article thumbnails. Responsive rules adapt these dimensions rather than scaling a fixed canvas.
