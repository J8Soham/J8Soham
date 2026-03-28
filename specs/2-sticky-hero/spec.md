# Feature Specification: Clear Template & Create Sticky Hero Title Screen

**Feature Branch**: `feat/2-sticky-hero`
**Created**: 2026-03-27
**Status**: Draft
**Resolves**: #2
**Input**: User description: "Clear the default Vite+React template content and create a title screen with dummy text underneath using the sticky hero skill."

## Clarifications

### Session 2026-03-27

- Q: What content should the hero card contain? → A: Avatar image, name displayed as a hashtag-style handle, a greeting-style subtitle, and contact/social links.
- Q: What should the dummy content sections below the hero contain? → A: The real content will be a Pinterest-style masonry grid (images, YouTube thumbnails, GitHub repo cards) — but that is a separate issue. For this feature, use minimal placeholder cards to demonstrate the scroll-reveal effect.
- Q: What style should the hero greeting subtitle have? → A: Casual, personality-driven (e.g., "hey, i build things") — approachable and authentic, not formal.
- Q: Which contact/social links on the hero card? → A: GitHub + email + LinkedIn. Email must be obfuscated (not easily scrapable by bots).
- Q: What level of accessibility support? → A: Basic: semantic HTML, image alt text, keyboard-navigable links, sufficient text contrast.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Clean Landing Experience (Priority: P1)

A visitor navigates to the portfolio site and is greeted with a clean, premium title screen — not the default Vite+React starter page. The title screen displays a centered hero card containing a circular avatar image, the owner's hashtag-style handle (e.g., "@j8soham"), a greeting subtitle, and contact/social links — all floating against a dark background. The hero card feels intentional and polished, setting the tone for the rest of the site.

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
- **FR-002**: The hero card MUST contain: (a) a circular avatar image, (b) the owner's name displayed as a hashtag-style handle (e.g., "@j8soham"), (c) a greeting-style subtitle line, and (d) contact/social links (e.g., email, GitHub).
- **FR-003**: The hero card MUST use `position: sticky; top: 0` positioning so it remains visible during scroll.
- **FR-004**: The hero section MUST occupy the full initial viewport height (`min-height: 100vh`) with the card centered both horizontally and vertically.
- **FR-005**: The hero card MUST progressively blur and fade as the user scrolls, using CSS `animation-timeline: scroll()` with a JavaScript fallback for unsupported browsers.
- **FR-006**: Content sections below the hero MUST start invisible and animate into view (fade + slide up) when they enter the viewport via `IntersectionObserver`.
- **FR-007**: The page MUST use a dark background (`#111`–`#1a1a1a` range) to maximize the depth-of-field blur aesthetic.
- **FR-008**: The application MUST include at least two dummy placeholder content cards/sections below the hero to demonstrate the scroll reveal effect. These are temporary stand-ins; the real masonry grid of images, YouTube thumbnails, and GitHub repo cards will be implemented in a separate issue.
- **FR-009**: The layout MUST be fully responsive across mobile (≤480px), tablet (481–1023px), and desktop (≥1024px) breakpoints.
- **FR-010**: The hero card MUST be perfectly sharp and fully opaque at scroll position 0 (no blur or fade before the user begins scrolling).
- **FR-011**: The email link on the hero card MUST be obfuscated to prevent automated scraping (e.g., rendered via JavaScript, encoded, or using a contact form redirect rather than a plain `mailto:` href in the HTML source).
- **FR-012**: The page MUST meet basic accessibility standards: semantic HTML elements, alt text on images, keyboard-navigable links, and sufficient text contrast against the dark background.

### Assumptions

- The hero card will use placeholder/default content: a generated or placeholder avatar image, "@j8soham" as the handle, a casual greeting subtitle (e.g., "hey, i build things"), and three links: GitHub, email (obfuscated), and LinkedIn. These are customizable later.
- Dummy placeholder cards below the hero are intentionally minimal — they exist only to demonstrate the scroll-reveal animation. The real content (Pinterest-style masonry grid with images, YouTube thumbnails, GitHub repo cards) is explicitly out of scope for this feature and will be a separate issue.
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
