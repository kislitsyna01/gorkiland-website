---
name: gorkiland-qa
description: Audit and verify the ГоркиLand website for responsive behavior, functional errors, performance, and SEO. Use when the user requests site QA, pre-release review, or verification of a website change.
---

# ГоркиLand website QA

Run a scoped, evidence-based review of the requested page or change. Establish what is observable, reproduce findings, and separate confirmed defects from recommendations.

## Prepare

- Read `AGENTS.md` and inspect the framework, package scripts, build setup, routes, assets, and existing test or lint tooling before choosing checks.
- Determine the target pages, supported browsers/devices if documented, and whether the site can be run locally. Do not assume a particular framework, deployment, analytics service, or SEO target.
- Use the supplied site design reference and brandbook for relevant visual checks. Confirm details from files instead of treating mock contact data as production truth.

## Review areas

### Behavior and errors

- Exercise the page's primary navigation, links, buttons, forms, menus, accordions, and other interactive states in scope.
- Check the browser console and failed network requests when browser access is available. Reproduce errors and report their location and effect.
- Inspect keyboard focus and basic keyboard operation for key controls. Verify interactive elements remain usable when motion is reduced if the page uses animation.

### Responsive layout

- Inspect narrow/mobile, tablet-like, and desktop widths, including widths where content wraps or layout changes. Use breakpoints documented by the project when available; otherwise select representative widths appropriate to the page and name them in the report.
- Check horizontal overflow, clipped text or controls, overlaps, unreadable text, image crops, sticky/pinned behavior, touch target usability, and navigation state.
- Compare the visual result with the supplied website PDF for pages in its scope. Treat this as a project design reference, not as a source for missing functionality or verified business data.

### Performance

- Inspect asset dimensions and transfer sizes, image formats and responsive loading, font loading, and unnecessary JavaScript or blocking work that is relevant to the page.
- If reliable browser metrics are available, report the measured environment and values, including Core Web Vitals where applicable. Separate lab measurements from field data. Never fabricate measurements or imply that a build command alone proves runtime performance.
- Prioritize user-visible impact and measured evidence; distinguish large files from proven loading bottlenecks.

### SEO

- Check the page title, description, canonical URL when relevant, indexing directives, semantic landmarks, heading structure, link text, image alternatives, and social metadata.
- Check sitemap, robots rules, structured data, and localization only when those features are in project scope. Use verified facts for metadata and structured data; do not invent organization details, offers, locations, or product claims.
- Describe SEO gaps without promising ranking outcomes.

## Execution and reporting

- Use the project's existing QA, lint, typecheck, and build commands when they are relevant to the requested review. Do not create new tests or change production content as part of an audit unless the user asks for fixes or test implementation.
- Scope checks to the requested pages and risk. Record viewport, browser, command, or tool for each meaningful finding.
- Report findings by severity with concise evidence, reproduction steps, affected page/component, and a practical recommendation. Mark unverified concerns as unverified. Summarize passed checks and state what could not be exercised because of environment or access limits.
