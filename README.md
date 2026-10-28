# ISMOS · Help Center

Public help docs for the ISMOS course platform (Moodle), served at **https://docs.ismos.xyz**. Static site, no login, independent of Moodle.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) and authored in [Markdoc](https://markdoc.dev) (`.mdoc`). Jira: ENG-453.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
```

Node 22+ (see `.nvmrc`).

## Content layout

```
src/content/docs/
├── index.mdoc                 # Spanish landing (default locale, served at /)
├── acceso/                    # Spanish topics → /acceso/<slug>/
├── cuenta/
├── en/                        # English mirror → /en/...
│   ├── index.mdoc
│   ├── acceso/                # same file names as Spanish → /en/acceso/<slug>/
│   └── cuenta/
└── pt/                        # Portuguese (pt-BR) mirror → /pt/...
```

Rules:

- **Spanish is the source of truth** (default locale). Every topic must exist in all three languages (Spanish, English, Portuguese); keep the **same file name** under `en/` and `pt/` so Starlight can pair them. If a translation is missing, Starlight shows the Spanish one with a notice.
- URLs follow the file path in every locale (`/acceso/login-nostr/`, `/en/acceso/login-nostr/`, `/pt/acceso/login-nostr/`). Do **not** override `slug` in translated pages: Starlight pairs translations by path, and a custom slug breaks the pairing and produces duplicate fallback pages.
- Sidebar sections are auto-generated from the directories (`acceso`, `cuenta`). Order pages with `sidebar: { order: N }` in the frontmatter. New sections: add a directory and register it in `astro.config.mjs` with its English and Portuguese labels.
- Use Starlight components as Markdoc tags: `{% aside type="tip" %}`, `{% steps %}`, `{% tabs %}`, `{% linkcard /%}`, `{% cardgrid %}`. See https://starlight.astro.build/guides/authoring-content/#markdoc

## Adding a topic

1. Create `src/content/docs/<seccion>/<nombre>.mdoc` in Spanish with `title`, `description` and `sidebar.order`.
2. Create `src/content/docs/en/<seccion>/<nombre>.mdoc` in English and `src/content/docs/pt/<seccion>/<nombre>.mdoc` in Portuguese with the same fields (same file name, no `slug`).
3. Link between pages with absolute paths (`/acceso/login-nostr/`, `/en/acceso/login-nostr/`, `/pt/acceso/login-nostr/`).
4. `npm run build` must pass with no warnings.

## Look and feel

The site uses the ISMOS design system, the same one as [libreriadesatoshi-web](https://github.com/LibreriadeSatoshi/libreriadesatoshi-web):

- `src/styles/ismos/tokens.css` and `fonts.css` are copies of that repo's `src/styles/ismos/` (tokens keyed on Starlight's `data-theme` instead of `.dark`/`.light`). Fonts are self-hosted in `public/fonts/ismos/`. When the design system changes there, copy the files again.
- `src/styles/custom.css` maps the tokens onto Starlight's `--sl-*` variables and restyles the few Starlight components that disagree with ISMOS (no pills, no card shadows, radius 4).
- `src/components/ThemeProvider.astro` overrides Starlight's only to default to light when the device states no preference.

## Deploy

Netlify, from `netlify.toml` (`npm run build` → `dist/`). `docs.ismos.xyz` is a CNAME (Cloudflare DNS, proxy off) to the Netlify site.

## TODO

- Open Graph / social preview image (the ISMOS lockup lives in the web repo's `public/media-kit/logos/`; needs a PNG for OG).
- Sections `cursos/` (enrolment, certificates) once the flows are confirmed with the team.
- Contact channel for the "escríbenos / contact us" mentions (support email or form).
