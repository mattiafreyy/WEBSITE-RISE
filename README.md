# DELREY — revisione spaziale

Vedi [modifiche e verifiche](qa/REVISIONE-SPAZIALE.md). Il sito aggiornato è in `dist/`; nessuna pubblicazione eseguita.

# DELREY Studio — visual-fidelity revision

Implementation staging copy of the original static DELREY site. The existing owner-private Sites identity is preserved in `.openai/hosting.json`. This folder is not evidence of a published version.

## What was rebuilt from direct observation

- Desktop spatial composition follows the measured 1180×757 reference: 79.5vh manifesto, one-viewport introduction, asymmetrical 3286px work sequence, 3.2-viewport room, 4.2-viewport method sequence, and 2.8-viewport finale **including** its footer.
- The introductory film uses a reversible threshold-triggered one-second transition. It finishes even after scrolling stops. The video is vertically centered in both states.
- Hero interaction has independent organic black/reveal masks at a 1.4 size ratio, with slower material inertia than the cursor. Three new pressure-inflated Blender renders retain the supplied wordmark's pixel-identical silhouette.
- Project entrance translation, whole-project velocity skew, and image-only hover zoom are distinct transforms. Wide stationery composition preserves both complete original images.
- An original concrete cinema room replaces the flat gallery. The film aperture is camera-projected, and the room/screen share a single measured pullback curve with a slow final tail.
- Two synchronized green-film halves uncover a black scene, retaining side strips. Four own-method cards replace unverified testimonials.
- The final icon follows an arc and rotation before accelerating into scale. Its cover lifts to reveal the stationary footer beneath it.

## Requested additions

The initial background DELREY symbol uses 33 genuine 3D views rendered from the supplied vector's extruded, beveled mesh. The production default is the visually verified 305 KB sequence, with scroll-linked position and physical rotation, plus a static reduced-motion poster. The mesh and WebGL renderer are retained as development source; GPU rendering is not enabled by default because the QA browser cannot create a WebGL context.

The mobile intro selects the authored 9:16 DELREY Italian film, rather than cropping the widescreen film. The room uses a complete compact 16:9 encode within the full-height cinematic room, with counter-scaled footage that preserves the complete frame throughout the pullback. Playback and sound controls remain available. The narrower home composition omits the reference's desktop-only method scene and giant finale icon; method content is retained on the Studio page. The initial background 3D symbol remains on mobile.

## Content and provenance

Nimbus Sans and Nimbus Mono PS retain their licence. DELREY vectors, own concept images, own films and original studio audio are preserved. No media or source code from the reference site is included. No client results, testimonials, office location imagery, or software partnerships are fabricated.

Contact and callback flows prepare a downloadable local brief. They do not transmit data, book calls or claim to have contacted the studio. A verified contact destination is still needed before a public launch.

## Verification status

Passed: JavaScript syntax, numerical geometry checks, mock-DOM interaction checks, real raster asset inspection, source-vector alpha registration, video codec/dimension checks and room-aperture pixel QA.

Not yet performed: rendered DELREY browser comparison, actual mobile/touch, Safari, WebGL appearance in the browser, frame-time profiling, cold-cache or screen-reader verification. Source and mock checks do **not** establish visual parity or deployment readiness. See `qa/RENDER_QA_REQUIRED.md`.

## Reproduce checks

    node --check app.js
    node --check motion.js
    node --check brand-scene.js
    node checks/motion-math.cjs
    node checks/source-behavior.cjs
    node checks/brand-scene.cjs
    python3 checks/stage-dist.py

The application is buildless. The staging helper combines the three authored scripts into one deferred production `site.js`, then stages `index.html`, `style.css`, that bundle and referenced `assets/` files into `dist/`. Render sources and QA files are not loaded by the website.
