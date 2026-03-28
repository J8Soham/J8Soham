# Tasks: Clear Template & Create Sticky Hero Title Screen

**Input**: Design documents from `/specs/2-sticky-hero/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅

**Tests**: Not requested — no test tasks included.

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install dependencies, delete template assets, prepare folder structure

- [x] T001 Delete Vite template assets: `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, and `src/App.css`
- [x] T002 Install `react-router-dom` dependency via `npm install react-router-dom`
- [x] T003 [P] Create component folder structure: `src/components/Hero/`, `src/components/ContentSection/`, `src/pages/`
- [x] T004 [P] Generate placeholder avatar image and save to `src/assets/avatar.webp`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Global theme and app shell — MUST complete before user story components

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T005 Rewrite `src/index.css` — remove light-mode variables, `prefers-color-scheme` media query, and template styles (`h1`/`h2`/`code`/`.counter`/`#root` bordered container); set dark background (`#141414`), light text, keep `@import "tailwindcss"`, add Google Font import (Inter)
- [x] T006 Rewrite `src/App.tsx` — replace all template content with `BrowserRouter > Routes > Route path="/" element={<HomePage />}`; import `HomePage` from `src/pages/HomePage.tsx`
- [x] T007 Update `index.html` — set `<title>` to "Soham | Portfolio" and add `<meta name="description">` tag for SEO

**Checkpoint**: Foundation ready — dark-themed app shell with routing, no template remnants

---

## Phase 3: User Story 1 — Clean Landing Experience (Priority: P1) 🎯 MVP

**Goal**: Visitor sees a centered hero card (avatar, @j8soham handle, subtitle, social links) on a dark background — zero Vite template content visible.

**Independent Test**: Navigate to `/` — hero card is visible, centered, fully sharp. No counter, logos, or "Get started" text.

### Implementation for User Story 1

- [x] T008 [P] [US1] Create `Hero.css` in `src/components/Hero/Hero.css` — hero anchor (`position: sticky; top: 0; height: 100vh`), hero card centering, avatar circle styling, handle typography, contact link styles; dark background aesthetic
- [x] T009 [P] [US1] Create `Hero.tsx` in `src/components/Hero/Hero.tsx` — render hero anchor with centered hero card containing: circular avatar image (from `src/assets/avatar.webp`), `@j8soham` handle, casual greeting subtitle ("hey, i build things"), and social links (GitHub, obfuscated email via JS concatenation per FR-011, LinkedIn)
- [x] T010 [US1] Create `HomePage.tsx` in `src/pages/HomePage.tsx` — compose `Hero` component inside a `page-wrapper` div; add minimal structure for content sections below (empty placeholder for now)
- [x] T011 [US1] Verify no Vite template remnants — confirm counter, logos, documentation links, and "Get started" heading are fully removed from all files

**Checkpoint**: User Story 1 complete — hero card visible at `/`, premium dark aesthetic, email obfuscated in source

---

## Phase 4: User Story 2 — Scroll-Driven Blur & Content Reveal (Priority: P2)

**Goal**: Hero progressively blurs/fades on scroll; placeholder content sections fade + slide in as they enter viewport.

**Independent Test**: Scroll top-to-bottom — hero blurs/fades proportionally. Content sections animate in. Scroll back to top — hero returns to sharp/opaque.

### Implementation for User Story 2

- [x] T012 [P] [US2] Create `useScrollBlur.ts` in `src/components/Hero/useScrollBlur.ts` — custom hook returning a `ref`; check `CSS.supports("animation-timeline", "scroll()")` for native CSS support; JS fallback: scroll listener calculating blur (0–10px) and opacity (1–0.15) between 10vh–65vh scroll depth
- [x] T013 [P] [US2] Add scroll-driven animation keyframes to `Hero.css` — `@keyframes hero-blur-out` with `animation-timeline: scroll(root)` for browsers that support it
- [x] T014 [US2] Integrate `useScrollBlur` hook into `Hero.tsx` — attach returned ref to the hero card element
- [x] T015 [P] [US2] Create `ContentSection.css` in `src/components/ContentSection/ContentSection.css` — initial state: `opacity: 0; transform: translateY(24px)`; `.visible` state: `opacity: 1; transform: translateY(0)` with `transition: 0.5s ease`; staggered children via `transition-delay`
- [x] T016 [P] [US2] Create `ContentSection.tsx` in `src/components/ContentSection/ContentSection.tsx` — wrapper using `IntersectionObserver` (threshold 0.15) to add `.visible` class on intersection; disconnect observer after first reveal; accept `children` and optional `className`
- [x] T017 [US2] Update `HomePage.tsx` — add two `ContentSection` placeholder cards below the hero with minimal content (title + short text) to demonstrate scroll-reveal; ensure enough scroll height (min-height on content wrapper) for blur effect per research decision #7

**Checkpoint**: User Stories 1 & 2 complete — full scroll-driven blur + content reveal working

---

## Phase 5: User Story 3 — Responsive Layout (Priority: P2)

**Goal**: Hero and content display correctly across mobile (≤480px), tablet (481–1023px), and desktop (≥1024px).

**Independent Test**: Resize browser to 375px, 768px, 1440px — hero centered and readable, no horizontal overflow at any width.

### Implementation for User Story 3

- [x] T018 [P] [US3] Add responsive breakpoints to `Hero.css` — mobile (≤480px): stack hero card content vertically, adjust font sizes, reduce avatar size; tablet/desktop: horizontal or centered layout with appropriate spacing
- [x] T019 [P] [US3] Add responsive breakpoints to `ContentSection.css` — adjust card padding, margins, and max-width for mobile/tablet/desktop
- [x] T020 [US3] Verify responsive layout in `HomePage.tsx` — ensure `page-wrapper` and `content-sections` don't cause horizontal overflow on small viewports

**Checkpoint**: All 3 user stories complete — responsive, scroll-animated, premium hero page

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, edge cases, and final verification

- [x] T021 [P] Ensure semantic HTML and accessibility — verify `<header>`, `<main>`, `<section>` usage; add `alt` text on avatar; ensure all links are keyboard-navigable; check text contrast against `#141414` background (FR-012)
- [x] T022 [P] Graceful degradation — verify hero displays centered and readable when JavaScript is disabled (edge case from spec)
- [x] T023 Run `npm run build` and `npm run lint` — zero errors, zero warnings
- [x] T024 Browser test: verify all acceptance scenarios from spec (hero visible, scroll blur, content reveal, responsive, email obfuscation in page source)

---

## Phase 7: Refinements (Post-MVP)

**Purpose**: Restructure React architecture and refine scroll-blur behavior based on user feedback.

- [x] T025 Restructure `src/main.tsx` — Add `BrowserRouter` and `StrictMode` wrappers around `<App />` and remove them from `App.tsx`.
- [x] T026 Update `Hero.css` — Change `.hero-anchor` to `top: -15vh` so the hero scrolls up before sticking. Update `animation-range` for `hero-blur-out` to start later (e.g., `15vh 65vh`).
- [x] T027 Update `useScrollBlur.ts` — Adjust the JS fallback distances so `startFade` and `endFade` account for the new `-15vh` offset before blurring begins.
- [x] T028 Run compilation check (`npm run build`).

---

## Phase 9: Fluid Scroll Refinements
**Purpose**: Per recent architectural feedback, shifting from a fixed sticky hero to a fluidly scrolling hero that disappears via extreme blur.

- [x] T032 `Hero.css` — Remove `position: sticky` and negative offsets. Change `.hero-anchor` to `position: relative` so it scrolls naturally with the page.
- [x] T033 `HomePage.tsx` — Remove overlapping `z-index` from content sections so they follow sequentially rather than physically layering over the hero.
- [x] T034 `useScrollBlur.ts` & `Hero.css` — Update animation and scroll tracking values to blur deeply and instantly as the user begins scrolling down (`0vh` starting mark).

---

## Phase 10: Framer Motion Parallax Match
**Purpose**: Integrate `framer-motion` to smoothly decouple the hero's scroll speed from the page (`0.5x`), allowing content sections to visually close the gap without overlapping, while perfectly clamping blur and opacity.

- [x] T035 Install `framer-motion`.
- [x] T036 Refactor `Hero.tsx` to use `<motion.div>` with `useScroll` and `useTransform` (`y`, `opacity`, `filter`).
- [x] T037 Delete `useScrollBlur.ts` and native CSS `animation-timeline` blocks from `Hero.css`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **US1 (Phase 3)**: Depends on Foundational
- **US2 (Phase 4)**: Depends on Foundational; T014 depends on US1's Hero.tsx (T009)
- **US3 (Phase 5)**: Depends on US1 + US2 CSS files existing
- **Polish (Phase 6)**: Depends on all user stories complete

### User Story Dependencies

- **US1 (P1)**: Independent after Foundational
- **US2 (P2)**: Builds on US1's `Hero.tsx` and `Hero.css` (adds hook + keyframes)
- **US3 (P2)**: Builds on US1 + US2's CSS files (adds responsive breakpoints)

### Within Each User Story

- CSS and TSX can be created in parallel ([P] marked)
- Integration tasks (homepage composition, hook wiring) depend on component files

### Parallel Opportunities

```bash
# Phase 1 parallel:
Task T003: Create folder structure
Task T004: Generate avatar image

# US1 parallel:
Task T008: Hero.css
Task T009: Hero.tsx

# US2 parallel:
Task T012: useScrollBlur.ts
Task T013: Hero.css keyframes update
Task T015: ContentSection.css
Task T016: ContentSection.tsx

# US3 parallel:
Task T018: Hero.css responsive
Task T019: ContentSection.css responsive

# Polish parallel:
Task T021: Accessibility audit
Task T022: Graceful degradation check
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (delete template, install deps, generate avatar)
2. Complete Phase 2: Foundational (dark theme, app shell, routing)
3. Complete Phase 3: User Story 1 (hero card visible, centered, premium)
4. **STOP and VALIDATE**: Hero renders at `/`, no template remnants
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Dark app shell ready
2. Add US1 → Hero card visible → **MVP! ✅**
3. Add US2 → Scroll blur + content reveal → Interactive experience
4. Add US3 → Responsive across devices → Production-ready
5. Polish → Accessibility + build validation → Ship it

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story
- No test tasks generated (not requested in spec)
- Email obfuscation (T009) uses JS concatenation per research decision #2
- Scroll blur (T012–T013) uses CSS `animation-timeline` + JS fallback per research decision #1
- Avatar (T004) generated via `generate_image` tool per research decision #3
- Vanilla CSS for hero/content components, Tailwind for global layout per research decision #4
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently

## Summary

| Metric | Value |
|---|---|
| **Total tasks** | 24 |
| **Phase 1 (Setup)** | 4 tasks |
| **Phase 2 (Foundational)** | 3 tasks |
| **Phase 3 (US1 — MVP)** | 4 tasks |
| **Phase 4 (US2 — Scroll)** | 6 tasks |
| **Phase 5 (US3 — Responsive)** | 3 tasks |
| **Phase 6 (Polish)** | 4 tasks |
| **Parallel opportunities** | 10 tasks across 5 groups |
| **MVP scope** | Phases 1–3 (11 tasks) |
