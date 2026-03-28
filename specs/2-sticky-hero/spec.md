# Feature Specification: Clear Template & Create Sticky Hero Title Screen

**Feature Branch**: `feat/2-sticky-hero`
**Created**: 2026-03-27
**Status**: Draft
**Resolves**: #2
**Input**: User description: "Clear the default Vite+React template content and create a title screen with dummy text underneath using the sticky hero skill."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clean Landing Experience (Priority: P1)

A visitor navigates to the portfolio site and is greeted with a clean, premium title screen — not the default Vite+React starter page. The title screen displays the site owner's name/identity as a centered hero card, floating against a dark background. The hero card feels intentional and polished, setting the tone for the rest of the site.

**Why this priority**: The hero is the very first impression. If the visitor sees the default Vite scaffold (counter button, framework logos, "Get started" text), the site feels unfinished and immediately loses credibility.

**Independent Test**: Navigate to the root URL — the hero card with the owner's name/handle should be visible, centered, and fully sharp. None of the original Vite template elements (counter, documentation links, social links, framework logos) should be present.

**Acceptance Scenarios**:

1. **Given** a visitor loads the site for the first time, **When** the page renders, **Then** they see a centered hero card with the owner's name/handle on a dark background — no Vite/React template content is visible.
2. **Given** the page has fully loaded, **When** the visitor has not scrolled, **Then** the hero card is perfectly sharp, fully opaque, and centered both horizontally and vertically within the viewport.
3. **Given** the hero card is displayed, **When** the visitor inspects the page, **Then** there are no remnant template elements (counter button, framework logos, documentation links, social sections).

---

### User Story 2 - Scroll-Driven Blur & Content Reveal (Priority: P2)

As the visitor scrolls down past the hero section, the hero card progressively blurs and fades, while descriptive content sections smoothly fade and slide into view beneath it. This creates a depth-of-field camera effect, shifting the visitor's attention from "who" (the hero) to "what" (the content).

**Why this priority**: The scroll interaction is the core differentiator of the sticky hero pattern — it transforms a static page into an engaging, alive experience. Without it, the hero is just a centered heading.

**Independent Test**: Scroll the page from top to bottom. The hero should blur and fade proportionally to scroll depth. Content sections below should fade/slide in as they enter the viewport.

**Acceptance Scenarios**:

1. **Given** the hero is displayed at the top, **When** the visitor scrolls down, **Then** the hero progressively blurs (from 0px to ~8-12px) and fades (from opacity 1 to ~0.15-0.2) proportionally to scroll position.
2. **Given** the visitor is scrolling, **When** content sections enter the viewport, **Then** each section fades in (opacity 0→1) and slides up (translateY 24px→0) smoothly.
3. **Given** the visitor scrolls back to the top, **When** scroll position returns to 0, **Then** the hero returns to fully sharp and fully opaque.

---

### User Story 3 - Responsive Layout (Priority: P2)

The title screen and content sections display correctly across desktop, tablet, and mobile viewports. The hero remains centered and readable on all screen sizes. Content sections adjust gracefully without horizontal overflow or broken layouts.

**Why this priority**: Per the project constitution, responsiveness is a non-negotiable requirement. The portfolio must look premium on every device.

**Independent Test**: Resize the browser to common breakpoints (mobile 375px, tablet 768px, desktop 1440px). The hero and content should remain properly centered and readable at every width.

**Acceptance Scenarios**:

1. **Given** the visitor is on a mobile device (≤480px), **When** the page loads, **Then** the hero card text is readable, properly sized, and centered without horizontal overflow.
2. **Given** the visitor is on a desktop (≥1024px), **When** the page loads, **Then** the hero card and content sections utilize the available space elegantly without feeling stretched or sparse.

---

### Edge Cases

- What happens when JavaScript is disabled? The hero should still display centered and readable (graceful degradation).
- What happens on browsers that don't support `animation-timeline: scroll()`? A JavaScript fallback must handle the blur effect.
- What happens when the page has very little content below the hero? The page should still provide enough scroll distance for the blur effect to be visible (minimum page height).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST remove all default Vite+React template content (counter component, framework logos, documentation links, social links, "Get started" heading, spacer sections).
- **FR-002**: The application MUST display a centered hero card containing the site owner's name/handle as the primary title element.
- **FR-003**: The hero card MUST use `position: sticky; top: 0` positioning so it remains visible during scroll.
- **FR-004**: The hero section MUST occupy the full initial viewport height (`min-height: 100vh`) with the card centered both horizontally and vertically.
- **FR-005**: The hero card MUST progressively blur and fade as the user scrolls, using CSS `animation-timeline: scroll()` with a JavaScript fallback for unsupported browsers.
- **FR-006**: Content sections below the hero MUST start invisible and animate into view (fade + slide up) when they enter the viewport via `IntersectionObserver`.
- **FR-007**: The page MUST use a dark background (`#111`–`#1a1a1a` range) to maximize the depth-of-field blur aesthetic.
- **FR-008**: The application MUST include at least two dummy content sections below the hero with placeholder descriptive text to demonstrate the scroll reveal effect.
- **FR-009**: The layout MUST be fully responsive across mobile (≤480px), tablet (481–1023px), and desktop (≥1024px) breakpoints.
- **FR-010**: The hero card MUST be perfectly sharp and fully opaque at scroll position 0 (no blur or fade before the user begins scrolling).

### Assumptions

- The site owner's name will be used as placeholder text in the hero card. A reasonable default (e.g., "J8Soham" matching the repo name) will be used until the user customizes it.
- Dummy/placeholder text for the content sections will use brief descriptive paragraphs (lorem-style or thematic) to demonstrate the scroll reveal pattern. These are intentionally temporary.
- The dark background applies globally to the page, not just the hero section.
- The existing Tailwind CSS setup will be retained for general layout styling, while the sticky hero effect uses vanilla CSS as prescribed by the skill.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: No default Vite template elements are visible on the page — 100% of template content is removed.
- **SC-002**: The hero card is centered within the viewport and fully visible without scrolling on first load.
- **SC-003**: The scroll-driven blur effect activates smoothly (no snap/jump) within the first 60vh of scrolling distance.
- **SC-004**: At least 2 content sections below the hero animate into view as the user scrolls.
- **SC-005**: The page renders correctly on viewports from 375px to 1440px wide without horizontal overflow or layout breakage.
- **SC-006**: The page achieves a visually premium first impression consistent with the project constitution's "wow factor" requirement.
