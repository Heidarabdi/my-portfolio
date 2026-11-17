# Homepage design QA

final result: passed

## Target and evidence

- Source visual truth: `docs/design-qa/reference.png`, the user's approved Wonder screenshot, 2880 × 11112 pixels. Its CSS design frame is 1440 × 5556, at 2× density.
- Implementation: `http://127.0.0.1:4376/`, the built Astro site in the in-app browser.
- Desktop viewport: 1440 × 1000 CSS pixels. Browser screenshots exclude the 12-pixel scrollbar: `docs/design-qa/desktop-final.jpg` is 1428 × 5542 pixels, at approximately 1× density. Both source and implementation were normalized to 1440-pixel width for comparison. The slight height difference includes normalization and browser text metrics.
- Full-view comparison: `docs/design-qa/desktop-comparison.jpg`, source on the left, implementation on the right.
- Focused comparison: `docs/design-qa/hero-comparison.jpg`, matching first 900 pixels of the normalized pages. Service imagery was also inspected at native browser size in `docs/design-qa/services-final.jpg` after lazy images finished painting.
- Responsive evidence: `docs/design-qa/tablet-final.jpg` (756 × 5728 image, 768 × 1024 CSS viewport), and `docs/design-qa/mobile-final.jpg` (378 × 7863 image, requested 390 × 844 CSS viewport; browser reported 391 CSS pixels wide). No horizontal document overflow at either breakpoint.
- State: white homepage, initial project pair, testimonials starting with the middle quote at desktop. Responsive captures also cover the naturally scrollable quote track.

## Findings and required fidelity surfaces

| Surface                          | Result                                                                                                                                                                                                                                                                                                                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonts and typography             | Outfit is self-hosted at weights 400, 500, and 600. Browser confirms it is loaded. Heading scale, line breaks, normal body copy, and orange emphasis follow the source. Minor renderer differences remain below P2.                                                                                                    |
| Spacing and layout rhythm        | All eleven regions appear in source order. Desktop uses the 80-pixel inset, 740-pixel hero, layered service cards, timeline, portrait section, two-image gallery, clipped testimonial carousel, invitation, ribbon, journal, and footer. Tablet/mobile deliberately reflow the composition.                            |
| Colors and tokens                | Source white, charcoal, bright orange, accessible orange button color, pale orange emphasis, gray cards, and fine dividers are mapped to homepage-scoped CSS variables. Existing page theme variables are unchanged.                                                                                                   |
| Image quality and asset fidelity | The original developer illustration and generated interface studies are reused. The exact three reference photos are stored locally. Astro creates responsive WebP variants. Original exported doodle paths are retained as SVG assets; Lucide icons use the existing icon library. Transparency and crops are intact. |
| Copy and content                 | Reference headings, quotes, contact email, availability, project experience, labels, and article display titles are preserved. Article dates now match the content entries. The generated project imagery is explicitly labeled as interface studies.                                                                  |

No actionable P0, P1, or P2 findings remain.

## Comparison and correction history

1. Initial implementation: build passed; targeted ESLint passed. Astro check found an unreachable TypeScript branch caused by checking `onscrollend` directly on an already typed HTMLElement. Feature detection now uses a separate temporary element. Full Astro and Worker checks subsequently passed.
2. First desktop/browser review found article dates one day earlier than the reference. The source collection dates represent local calendar dates; formatting in Africa/Nairobi restores 15 Jan 2025, 20 Nov 2024, and 10 Aug 2023. Project slide wrappers now preserve native anchor semantics. Subsequent browser state and final captures confirm the corrected copy and links.
3. At 768 pixels, the portrait circle and arrow collided with the availability proof. The 701–900px layout now places proof beneath the illustration. A general image selector was also reduced in specificity so decorative-image hiding applies. Final tablet capture and computed styles confirm the arrow is hidden and the proof is unobstructed.
4. Final normalized full-page and focused hero comparisons reviewed all five fidelity surfaces. A partial paint artifact in an early lazy-image screenshot was resolved by viewing the service region and recapturing after image loading; no missing asset remains.

## Behavior and validation

- Mobile menu opens, navigation goes to Services, and the menu closes after selection.
- Project Next advances the native track and announces its position. On desktop, navigation skips duplicate clamped endpoints when two projects are visible.
- Testimonial Next advances from the middle quote to the third and announces its position.
- Project link to SNWO opens `/projects#snwo-official-portal`; browser inspection confirmed the existing project dialog is open.
- Blog links target generated content routes; the existing route/RSS tests pass.
- Contact and Hire Me links lead to the existing contact page. Email address is a real mailto link; no message was sent during QA.
- Native scrolling, scroll snap, clear button labels, polite status, visible focus, and reduced-motion behavior are preserved. The environment reports reduced motion; only the expected Astro transition warning appeared in development. The production homepage has no captured console errors.
- `npm run check` with Node 24.22.0: passed, including Astro (47 files, zero errors/warnings/hints) and Cloudflare Worker types.
- Targeted ESLint: passed.
- `node --test`: 18 passed, zero failed.
- Final production build: passed, nine pages generated.
- `git diff --check`: passed.

## Follow-up polish and scope

- P3: tiny browser font/line-height differences from the canvas renderer remain.
- The new campus image is an additional carousel item so controls reveal meaningful content; the initial two images match the reference.
- Projects, About, Journal, article pages, and Contact now extend this design; see `docs/page-redesign-qa.md` for the follow-up checks. No deployment or commit was performed for this request.
- Preview remains available locally. Build and preview validation does not constitute a new live email-delivery test.
