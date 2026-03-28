# Research: Sticky Hero Title Screen

## 1. Scroll-Driven Blur — CSS `animation-timeline: scroll()` Support

- **Decision**: Use the CSS Scroll-Driven Animations API as primary, with a JavaScript `scroll` event listener fallback.
- **Rationale**: The SKILL.md mandates a JS fallback because `animation-timeline: scroll()` is Chromium 115+ only (no Firefox/Safari support as of 2025). The spec (FR-005) also explicitly requires this dual approach.
- **Alternatives considered**:
  - IntersectionObserver for blur — rejected; IO only gives binary threshold signals, not continuous scroll progress.
  - Framer Motion scroll-linked — rejected; violates constitution's simplicity principle and adds an unnecessary dependency.
- **Implementation notes**: The skill example provides a `useScrollBlur` React hook that checks `CSS.supports("animation-timeline", "scroll()")` and only attaches the JS listener when needed. This aligns perfectly with the project.

## 2. Email Obfuscation Strategy (FR-011)

- **Decision**: Render the email address via JavaScript at runtime (concatenate parts), never placing a plain `mailto:` in the HTML source.
- **Rationale**: Simple, zero-dependency approach that blocks basic scrapers. More sophisticated methods (contact forms, CAPTCHA-protected endpoints) violate the simplicity principle.
- **Alternatives considered**:
  - CSS direction + unicode-bidi reversal — rejected; screen readers may read garbled text.
  - Base64 encoding decoded on click — viable but overly complex for no added value over JS concatenation.
  - Contact form — out of scope; adds backend complexity.

## 3. Avatar Image Source

- **Decision**: Use `generate_image` tool to create a placeholder avatar image during implementation. Ship a generated image at `src/assets/avatar.webp`.
- **Rationale**: The spec says "generated or placeholder avatar image." A real-looking generated avatar beats a gray circle for demonstrating the sticky hero effect and meeting the "premium first impression" success criterion.
- **Alternatives considered**:
  - Placeholder service URL (ui-avatars.com, etc.) — rejected; external dependency + network failure risk.
  - Empty circle with initials — minimal effort but doesn't feel "premium."

## 4. Tailwind CSS vs. Vanilla CSS for Sticky Hero Styling

- **Decision**: Use vanilla CSS (in a dedicated `StickyHero.css` file) for the sticky hero component. Tailwind remains for global layout utilities.
- **Rationale**: The constitution states: "Tailwind CSS should remain the primary styling methodology for all layouts outside of these dedicated, targeted custom skills." The SKILL.md provides CSS examples, not Tailwind classes. Mixing Tailwind utility classes into scroll-driven animation keyframes would be awkward and reduce readability.
- **Alternatives considered**:
  - All Tailwind — rejected; `@keyframes` and `animation-timeline` don't map well to utility classes.
  - All vanilla CSS — rejected; constitution prescribes Tailwind for general layout.

## 5. Component Architecture

- **Decision**: Create two isolated React components: `StickyHero` (the hero card + blur logic) and `RevealSection` (individual scroll-revealed content section). `App.tsx` composes them.
- **Rationale**: Constitution Principle IV (Component Isolation) requires "independent, self-contained components." The skill also naturally decomposes into these two pieces. A `useScrollBlur` custom hook (from the skill example) keeps the blur logic reusable.
- **Alternatives considered**:
  - Single monolithic `App.tsx` — rejected; violates component isolation.
  - Separate `useRevealObserver` hook — considered; could be a future refinement but a simple `useEffect` inside `RevealSection` suffices for now.

## 6. Dark Background Strategy

- **Decision**: Set the global page background to `#141414` (within the spec's `#111`–`#1a1a1a` range) and remove the light/dark color-scheme toggle from `index.css`.
- **Rationale**: FR-007 mandates a dark background. The SKILL.md says this pattern "works best on dark backgrounds." The current `index.css` has both light and dark themes via `prefers-color-scheme`, but the spec requires a fixed dark aesthetic.
- **Alternatives considered**:
  - Keep the light mode and only darken for sticky hero — rejected; spec says dark background applies "globally to the page."

## 7. Minimum Page Height for Blur Effect

- **Decision**: Ensure `content-sections` wrapper has a `min-height` that guarantees sufficient scroll distance (at least `100vh` of content below the hero viewport).
- **Rationale**: The edge case in the spec says "the page should still provide enough scroll distance for the blur effect to be visible." With only 2 placeholder cards, natural content height may be insufficient.
- **Alternatives considered**:
  - CSS `min-height: 200vh` on body — too blunt; breaks if real content is added later.
  - Extra spacer div — simpler; a bottom spacer or padding on the content wrapper achieves this cleanly.
