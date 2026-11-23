---
name: gorkiland-motion
description: Design and implement polished, performant motion for the ГоркиLand website, including GSAP, ScrollTrigger, transitions, and interactive states. Use when a requested change involves animation or motion behavior.
---

# ГоркиLand motion

Create motion that supports the visitor's understanding of the page and the energy of attractions while keeping the site readable, responsive, and easy to control.

## Before changing motion

- Inspect the current framework, package scripts, installed animation libraries and versions, existing motion patterns, component lifecycle, and page structure. Follow the project's existing architecture.
- Read `AGENTS.md`, `01_BRANDBOOK/Брендбук_ГоркиLand.pdf`, and `02_DESIGN/Сайт_ГоркиLand.pdf` when the change affects the brand or a page shown in the reference. The brandbook does not prescribe a particular animation style; do not claim that a proposed effect is an official brand rule.
- Identify the intended user action or content transition. Choose motion only where it improves orientation, hierarchy, feedback, or continuity.

## Implementation

- Use GSAP and ScrollTrigger when they fit the existing stack or the requested interaction. Reuse installed dependencies; inspect the actual version and its API before writing code. Add a dependency only when the task calls for it and the project's setup supports it.
- Keep movement controlled and intentional. Use short, coherent sequences; avoid gratuitous motion, competing animation layers, scroll hijacking, and effects that obscure content or make navigation harder.
- For scroll-driven motion, keep content reachable without scrolling, avoid pinning large areas unnecessarily, and check behavior at short and narrow viewports. Provide sensible non-scroll or reduced-motion behavior where appropriate.
- Respect `prefers-reduced-motion`. Reduce or remove nonessential movement while preserving content, state changes, and functionality. Do not rely on motion as the only way to reveal information.
- Keep interactive controls usable by pointer, keyboard, and touch. Provide clear focus and state feedback. Avoid hover-only interactions.
- Tie animation setup and cleanup to the framework's lifecycle. Clean up timelines and ScrollTriggers when components unmount or rerun, and prevent duplicate triggers during navigation or hot reload.
- Prefer animating `transform` and `opacity` for continuous effects. Avoid repeated layout- or paint-heavy animation when a composited alternative works. Do not add a smooth-scrolling library or global scroll behavior without a clear need and compatibility check.
- Preserve the brand assets, colors, type, copy, and approved composition described by the project's sources. Do not morph or distort the logo.

## Verification when implementing

Use the project's available browser and development workflow to inspect the actual interaction at desktop and narrow/mobile widths. Check initial state, entry/exit, repeated navigation, resize, scroll boundaries, touch/keyboard operation, and reduced-motion behavior. Look for stuck pins, duplicate triggers, layout shifts, hidden content, console errors, and animation that continues after leaving the page. Use existing project checks when relevant; do not invent performance results.

Summarize what animates, the implementation approach, accessibility behavior, and any limitations observed.
