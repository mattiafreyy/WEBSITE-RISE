# DELREY Studio — source handoff

This is an unchanged website-source copy of the existing DELREY STUDIO Site, saved version 11.

- Source commit: `dfcf600c4f3a17a21ddbf53d8c6b6953fe50df20`.
- Existing Site: https://delrey-studio-agency.dm-immobilia-0863.chatgpt.site
- Site project ID is retained in `.openai/hosting.json`; it is an identifier, not a credential.
- Export prepared on 2026-10-28. Importing these files into GitHub does not itself establish two-way synchronization with Sites or alter the deployed website.

## Local preview

No runtime dependencies or framework installation are required. From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/`. To preview the deployment directory instead:

```sh
python3 -m http.server 8000 --directory dist
```

## Editing and staging

Edit `index.html`, `style.css`, `app.js`, `motion.js`, `brand-scene.js`, and `assets/` as needed. `site.js` is generated; do not edit the bundle independently. After source changes run:

```sh
python3 checks/stage-dist.py
```

This combines the three authored scripts into root `site.js`, recreates `dist/`, and writes a local QA staging manifest. Static hosting uses `dist/` as its publish directory. Hash-based client-side routes need no server-side application or database.

## Checks

```sh
node --check app.js
node --check motion.js
node --check brand-scene.js
node --check site.js
node checks/motion-math.cjs
npm ci --prefix checks
node checks/source-behavior.cjs
node checks/brand-scene.cjs
```

The `checks` package only supplies test dependencies; the website itself is buildless. Its generic `npm test` placeholder is not the check runner: use the explicit commands above.

## Editable creative assets

Original brand vectors, licensed fonts, films, rendered website images, the 3D symbol mesh/atlas, and the complete Blender cinema-room source are retained. `room-source/README.md` documents the editable scene and rebuild process. Historic local paths mentioned in source documentation are provenance, not required runtime locations.

## Scope and verification

Website source and assets have not been redesigned or changed for this export. Credentials, `.git` history, local dependency directories, internal QA screenshots, and historical generated QA reports are excluded. The retained historical README and `qa/RENDER_QA_REQUIRED.md` describe earlier test status; they are not a fresh acceptance result. The original final-version task reported desktop/responsive composition, video, 3D rotation, navigation, and CTA checks passed. Real-phone/Safari and performance validation were still unverified.

Contact/callback flows are deliberately local-only: they download a brief and do not send it. A real contact endpoint remains a separate change.
