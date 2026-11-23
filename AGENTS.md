# ГоркиLand website development rules

These rules apply to work in this repository. Read the relevant project files before changing the site.

## Project sources

- `01_BRANDBOOK/Брендбук_ГоркиLand.pdf` is the authority for the brand identity.
- `02_DESIGN/Сайт_ГоркиLand.pdf` is the supplied visual and page-composition reference for the website.
- `03_LOGOS/` and `04_IMAGES/` contain supplied brand and attraction assets. Inspect asset contents and dimensions before use.
- Original source files in `01_BRANDBOOK/` through `07_CONCEPT/` are local-only and ignored by GitHub; the deployable, optimized website assets are in `public/assets/`.
- If a referenced local source is unavailable in a clone, do not infer or invent its contents; preserve the confirmed project decisions and ask for the source when needed.
- When instructions conflict, follow the user's current request; otherwise follow the brandbook for identity decisions and the website PDF for depicted page design. Do not invent missing brand rules or business facts.
- The design PDF contains example copy/contact details. Do not treat placeholder or illustrative details as verified production content without confirmation in project sources.

## Brand identity

- Use the brandbook's base colors: Dark Space `#1F1F1F`, Energy Orange `#E7441A`, and Clean White `#FFFFFF`.
- Use Inter as the brand typeface and the shown Regular, SemiBold, and Black weights when available in the project.
- Use supplied logo artwork without redrawing, distorting, cropping, recoloring, or effects. Inspect SVG backgrounds before using them as inline/transparent marks. Follow the brandbook's clear-space diagram; do not substitute an invented numeric rule.
- Keep imagery faithful to the supplied sources and preserve the attraction as the focal subject.

## Engineering

- Inspect the existing app structure, dependencies, scripts, and conventions before choosing an implementation or adding a library. Do not assume a framework or build tool that is not present.
- Keep changes scoped to the requested work and consistent with established code patterns. Preserve Russian copy and project content unless asked to edit them.
- Keep pages usable across viewport sizes and with keyboard input. Respect reduced-motion preferences for nonessential animation.
- Avoid unsupported claims about speed, SEO, accessibility, or test coverage; report what was actually measured or checked.
- Run only relevant checks already available in the project when verification is requested. Do not add tests or broaden scope without a request.
