# Feature Specification: Pinterest-Style Masonry Content Grid

**Feature Branch**: `feat/4-masonry-grid`
**Created**: 2026-03-27
**Status**: Draft
**Resolves**: #4
**Input**: User description: "implement a Pinterest-style masonry effect with projects, youtube thumbnails, and github texts below the sticky hero."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Dynamic Content Display (Priority: P1)

A visitor scrolls past the sticky hero and sees a visually engaging "wall" of diverse content (project cards, YouTube thumbnails, GitHub repo summaries). Instead of uniform rows that leave awkward empty vertical spaces, the cards interlock organically like bricks or a Pinterest board, maximizing screen real estate and creating an exploratory, fluid browsing experience.

**Why this priority**: The masonry layout is the core feature requirement and visually defines the portfolio's main content area.

**Independent Test**: Load the site and scroll down to the content grid. The grid should pack cards tightly together vertically regardless of their individual heights. There should be no "empty row" gaps caused by a tall card sitting next to a short one.

**Acceptance Scenarios**:

1. **Given** a collection of cards with varying heights (text-heavy vs. image-only), **When** they are rendered in the grid, **Then** they align into columns but interlock vertically without enforcing row alignment across columns.
2. **Given** the user is viewing the grid, **When** they look at the gaps between items, **Then** the vertical and horizontal gaps are uniform and visually pleasing (e.g., 16px - 24px consistent spacing).
3. **Given** the grid contains content, **When** the images finish loading, **Then** the grid layout stabilizes and does not overlap or break.

---

### User Story 2 - Mixed Card Types (Priority: P1)

The visitor can easily distinguish between different types of accomplishments. Some cards show full-bleed YouTube video thumbnails, others show rich project summaries with text and images, and others display clean text-based GitHub repository information. Each card type feels like a cohesive part of the whole while serving its specific content need.

**Why this priority**: The user explicitly requested three distinct content types (projects, YouTube thumbnails, GitHub texts). The layout must support and normalize these varying shapes and forms.

**Independent Test**: Verify that the grid contains all three distinct card types, and that clicking any card behaves correctly (e.g., routing to the appropriate external URL).

**Acceptance Scenarios**:

1. **Given** the grid is populated, **When** the visitor views it, **Then** they see distinct card templates for YouTube videos (image dominant), GitHub repos (text dominant), and Projects (mixed).
2. **Given** the visitor interacts with a card, **When** they click/tap it, **Then** the entire card acts as a clickable target and routes them to the external destination (YouTube, GitHub, etc.).
3. **Given** a card contains an image/thumbnail, **When** it loads, **Then** the image scales proportionally and forms the visual anchor of that specific card without stretching awkwardly.

---

### User Story 3 - Responsive Adaptability (Priority: P2)

As the visitor resizes their browser or views the site on different devices, the masonry grid dynamically adjusts its column count. On a large desktop, it spreads out to use the space; on mobile, it collapses to a single focused column for easy scrolling, preserving readability.

**Why this priority**: The project constitution demands complete responsiveness across all device sizes. A masonry grid that breaks on mobile is unacceptable.

**Independent Test**: Resize the browser window from 1440px down to 375px. The grid should seamlessly transition from multiple columns (desktop) to fewer columns (tablet) down to a single column (mobile).

**Acceptance Scenarios**:

1. **Given** the device is a mobile phone (≤480px), **When** the grid renders, **Then** it displays as a single vertical column where cards stack on top of each other.
2. **Given** the device is a tablet or small desktop, **When** the grid renders, **Then** it displays in 2 or more columns optimizing the available width.
3. **Given** the visitor resizes the window, **When** a breakpoint is crossed, **Then** the cards reflow smoothly without breaking the container bounds.

---

### Edge Cases

- What happens when a card's text is exceptionally long? The card should bound the text (e.g., line clamping) so it doesn't create an obnoxiously tall masonry block.
- What happens before images are fully loaded? The layout engine must either reserve space for images or recalculate the masonry packing once images fire their `onload` events to prevent overlapping cards.
- How do keyboard users navigate the grid? Focus must flow logically through the cards (typically DOM order) and the focus state must be clearly visible against the dark background.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The application MUST display a masonry grid layout below the sticky hero section.
- **FR-002**: The masonry layout MUST dynamically pack items vertically based on their content height, avoiding rigid horizontal row constraints, utilizing either CSS Grid (with JS span calculations) or CSS Columns.
- **FR-003**: The grid MUST support three distinct dummy card variants: Project Cards, YouTube Thumbnail Cards, and GitHub Text Cards.
- **FR-004**: Each card MUST be fully clickable as a single interactive element (routing to a placeholder/external URL).
- **FR-005**: YouTube Thumbnail cards MUST prioritize visual display, utilizing full-width images with minimal or overlaid text.
- **FR-006**: GitHub cards MUST prioritize text display, focusing on title, description, and metadata (stars, language) without requiring an image.
- **FR-007**: The grid MUST maintain consistent horizontal and vertical gaps (e.g., 16px - 24px) between all cards.
- **FR-008**: The grid MUST be fully responsive, collapsing to a single column on mobile devices (≤480px) and expanding to multiple columns on larger viewports.
- **FR-009**: The grid and card styling MUST adhere to the project's premium, dark-mode visual aesthetic, utilizing subtle borders or background contrast rather than heavy drop shadows.
- **FR-010**: The layout MUST recalculate or stabilize correctly when images within the cards finish loading to prevent layout shifts or overlapping content.
- **FR-011**: All cards MUST meet basic accessibility standards, including interactive focus states and logical keyboard traversal order.

### Assumptions

- The data populating the cards will be static/mock data for this initial implementation. No external API fetching (like the live GitHub or YouTube APIs) is required for this specific issue.
- The overall page background will remain dark as established in the sticky-hero feature.
- Content parsing and text clamping will be applied to prevent any single card from dominating the entire screen vertically.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A true masonry layout is achieved: varying-height cards interlock vertically with uniform gaps, not restricted by rigid row heights.
- **SC-002**: Three distinct visual card types (Project, YouTube, GitHub) are successfully rendered in the grid.
- **SC-003**: The grid successfully transitions between a multi-column layout on desktop to a single-column layout on mobile (≤480px) without horizontal scrolling.
- **SC-004**: 100% of the cards are logically focusable via keyboard and provide a clear visual focus indicator.
- **SC-005**: No cards overlap each other after the page and all inner images have fully loaded.
