---
name: gorkiland-brand
description: Apply the verified ГоркиLand brand identity to website design, UI, content styling, and brand asset use. Use when creating or changing branded frontend work in this project; consult project sources instead of inventing brand rules.
---

# ГоркиLand brand

Use this skill whenever a website change affects ГоркиLand's visual identity, logos, typography, brand colors, imagery, or brand presentation.

## Sources of truth

Read the relevant project files before making a brand decision:

- `01_BRANDBOOK/Брендбук_ГоркиLand.pdf` is the brand identity source.
- `02_DESIGN/Сайт_ГоркиLand.pdf` is the website composition and art-direction reference. Treat it as a design reference, not as a source for missing brand rules or verified business facts.
- `03_LOGOS/` contains supplied logo artwork. Inspect an SVG's viewBox and background before embedding it; some supplied SVGs include a colored background panel.
- `04_IMAGES/` contains supplied attraction and site imagery.

If a rule is not stated or shown clearly in these materials, do not invent it. Check the actual implementation and ask for direction only when the unresolved choice materially affects the requested result. Keep recommendations clearly labeled as recommendations, not brand requirements.

## Verified identity

The brandbook specifies:

- Dark Space: `#1F1F1F` (RGB 31, 31, 31), the base dark color.
- Energy Orange: `#E7441A` (RGB 231, 68, 26), the energetic accent.
- Clean White: `#FFFFFF` (RGB 255, 255, 255), used to provide visual space and legible typography.
- Inter as the main typeface, with Regular, SemiBold, and Black weights shown in the brandbook.
- The logo's sweeping arcs express movement and perspective; the black arc conveys stability and engineering precision, and the orange arc adds energy. The brandbook describes proportions using the golden ratio/Fibonacci sequence.
- The logo has a protected clear area defined by a diagram in the brandbook. Follow that diagram. Do not replace it with an invented pixel value or ratio.
- Use the monochrome logo in the situations described by the brandbook, including when full-color reproduction is unavailable or on a colored background. Match the supplied artwork to the background; preserve legibility.

These are the verified brand rules. Do not infer additional approved colors, typefaces, logo variants, gradients, corner radii, icon styles, or animation rules from mockups.

## Applying the identity

- Prefer supplied official logo artwork. Do not redraw, typeset, recolor, distort, crop, or add effects to the mark. Preserve its proportions and protected clear area.
- Because supplied SVGs may include a full background rectangle, inspect the SVG before using it as a transparent inline logo. Use a matching provided variant or an existing approved logo asset; do not silently alter official artwork to make it fit.
- Use the brand colors and Inter consistently. If a font file is not present or a weight cannot be verified, inspect the project dependencies and existing font setup; do not claim a substitute is brand-approved.
- Use `02_DESIGN/Сайт_ГоркиLand.pdf` for the intended website's sections, imagery, composition, and art direction where relevant to the task. Preserve its visible Russian copy when implementing that reference. Do not promote illustrative contact details or sample news in design materials into verified production facts.
- Supplied attraction imagery should remain recognizable and undistorted. Choose crops that retain the subject and the reference's intended focal point.
- Keep the presentation confident and engineered while retaining the excitement of attractions, as supported by the brandbook. Avoid adding decorative effects that compete with the logo or imagery.

## Review

Before handing off brand-related work, compare the result with the relevant brandbook page, the supplied website reference where applicable, and the actual project assets. Check color values, typeface and available weights, logo variant/background, proportions, clear area, contrast, image crop, and text. Report any ambiguity rather than presenting a guess as a rule.
