# Implementation Plan: Clear Template & Create Sticky Hero Title Screen

Clear the default Vite+React scaffold and replace it with a sticky hero title screen following the `sticky-hero` skill pattern. The hero card displays `@j8soham`, a casual subtitle, a circular avatar, and social links (GitHub, obfuscated email, LinkedIn). Scroll-driven blur fades the hero while placeholder content sections reveal beneath it.

> [!NOTE]
> The `.agent/skills/sticky-hero/` examples are **reference patterns only** — they demonstrate the CSS mechanics and general approach. All code will be written fresh for the actual stack (React 19, TypeScript, Vite, Tailwind v4). No example code will be copied directly.

## Constitution Check

| Principle | Status | Notes |
|---|---|---|
| I. Simplicity First | ✅ | One new dependency (`react-router-dom`). Vanilla CSS + one custom hook. |
| II. Curated Tech Stack | ✅ | React Router is in the constitution's approved list. No other additions. |
| III. Premium Design & Responsiveness | ✅ | Dark theme, scroll-driven blur, responsive breakpoints. |
| IV. Component Isolation | ✅ | `Hero` and `ContentSection` are self-contained components. |

## Folder Structure

```
src/
├── assets/
│   └── avatar.webp               # Generated placeholder avatar
├── components/
│   ├── Hero/                      # Portfolio hero card (sticky + blur)
│   │   ├── Hero.tsx
│   │   ├── Hero.css
│   │   └── useScrollBlur.ts
│   └── ContentSection/            # Scroll-reveal content section
│       ├── ContentSection.tsx
│       └── ContentSection.css
├── pages/
│   └── HomePage.tsx               # Composes Hero + ContentSections
├── App.tsx                        # BrowserRouter + Routes
├── index.css                      # Global dark theme + Tailwind
└── main.tsx                       # React root (unchanged)
```

## Proposed Changes

### Template Cleanup

#### [DELETE] [react.svg](file:///Users/soham/Developer/j8soham/src/assets/react.svg)
#### [DELETE] [vite.svg](file:///Users/soham/Developer/j8soham/src/assets/vite.svg)
#### [DELETE] [hero.png](file:///Users/soham/Developer/j8soham/src/assets/hero.png)
#### [DELETE] [App.css](file:///Users/soham/Developer/j8soham/src/App.css)

Remove all Vite template assets and styles.

---

### New Dependency

```bash
npm install react-router-dom
```

Adds client-side routing. Used immediately for the `/` route and prepares the app for future pages (masonry grid, etc.).

---

### New Avatar Asset

#### [NEW] [avatar.webp](file:///Users/soham/Developer/j8soham/src/assets/avatar.webp)

Generate a placeholder avatar via `generate_image` — stylized, premium look on dark background.

---

### Hero Component

#### [NEW] [Hero.tsx](file:///Users/soham/Developer/j8soham/src/components/Hero/Hero.tsx)

- Renders the hero anchor (`position: sticky; top: 0; height: 100vh`) with a centered hero card
- Hero card: circular avatar, `@j8soham` handle, casual subtitle, social links
- Email link uses JS-concatenated `mailto:` (obfuscation per FR-011)
- Applies the `useScrollBlur` hook ref to the hero card

#### [NEW] [Hero.css](file:///Users/soham/Developer/j8soham/src/components/Hero/Hero.css)

- Vanilla CSS: `@keyframes hero-blur-out` with `animation-timeline: scroll(root)`
- Hero card layout, avatar circle styling, handle typography, contact links
- Responsive: stacks vertically on mobile (≤480px)

#### [NEW] [useScrollBlur.ts](file:///Users/soham/Developer/j8soham/src/components/Hero/useScrollBlur.ts)

- Custom hook returning a `ref` for the hero card element
- Checks `CSS.supports("animation-timeline", "scroll()")` — skips JS if native support exists
- Fallback: scroll listener calculating blur/opacity between `10vh`–`65vh` scroll depth

---

### ContentSection Component

#### [NEW] [ContentSection.tsx](file:///Users/soham/Developer/j8soham/src/components/ContentSection/ContentSection.tsx)

- Wrapper component using `IntersectionObserver` (threshold 0.15)
- Adds `.visible` class on intersection; disconnects observer after first reveal
- Accepts `children` and optional `className`

#### [NEW] [ContentSection.css](file:///Users/soham/Developer/j8soham/src/components/ContentSection/ContentSection.css)

- Initial: `opacity: 0; transform: translateY(24px)`
- `.visible`: `opacity: 1; transform: translateY(0)` with `transition: 0.5s ease`
- Staggered children via `transition-delay`

---

### HomePage

#### [NEW] [HomePage.tsx](file:///Users/soham/Developer/j8soham/src/pages/HomePage.tsx)

- Composes `Hero` + two `ContentSection` placeholder cards inside a `page-wrapper` and `content-sections` structure
- Placeholder cards have minimal content (title + short text) to demonstrate scroll-reveal
- Ensures enough scroll height for the blur effect to be visible

---

### App & Global Changes

#### [MODIFY] [App.tsx](file:///Users/soham/Developer/j8soham/src/App.tsx)

Complete rewrite:
- Import `BrowserRouter`, `Routes`, `Route` from `react-router-dom`
- Single route: `<Route path="/" element={<HomePage />} />`
- No template content remains

#### [MODIFY] [index.css](file:///Users/soham/Developer/j8soham/src/index.css)

- Remove light-mode variables and `prefers-color-scheme` media query
- Set dark background (`#141414`), light text, dark-only theme
- Remove `#root` bordered container (full-bleed dark page)
- Remove template styles (`h1`/`h2`/`code`/`.counter`)
- Keep `@import "tailwindcss"` and base rendering settings
- Add Google Font import (Inter)

#### [MODIFY] [index.html](file:///Users/soham/Developer/j8soham/index.html)

- Add `<meta name="description">` for SEO
- Update `<title>` to "Soham | Portfolio"

### Refinements (Post-MVP)

#### [MODIFY] [main.tsx](file:///Users/soham/Developer/j8soham/src/main.tsx) & [App.tsx](file:///Users/soham/Developer/j8soham/src/App.tsx)
Move `BrowserRouter` and `StrictMode` entirely into `main.tsx`. `App.tsx` will now only contain the structural layout (`<div className="flex flex-col min-h-screen">`, `<main>`, etc.) and the pure `<Routes>` mapping, mimicking the `example/app.tsx` architecture.

#### [MODIFY] [Hero.tsx](file:///Users/soham/Developer/j8soham/src/components/Hero/Hero.tsx)
Integrate `framer-motion`. Utilize `useScroll` and `useTransform` to apply a `0.5x` parallax effect on the y-axis, causing trailing content sections to physically visually catch up to the hero as the user scrolls.

#### [DELETE] [useScrollBlur.ts](file:///Users/soham/Developer/j8soham/src/components/Hero/useScrollBlur.ts) & [MODIFY] [Hero.css](file:///Users/soham/Developer/j8soham/src/components/Hero/Hero.css)
Remove the native CSS `animation-timeline` code and the custom React Hook fallback, as `framer-motion` universally handles tracking scroll depth and linearly clamping `opacity` and `filter`.

## Verification Plan

### Build & Lint

```bash
npm run build   # TypeScript + Vite build — zero errors
npm run lint     # ESLint — zero violations
```

### Browser Testing

1. **Hero visible**: Navigate to `/` → hero card centered with avatar, `@j8soham`, subtitle, 3 links on dark background. No Vite template remnants.
2. **Scroll blur**: Scroll down → hero blurs/fades proportionally. Scroll up → returns to sharp/opaque.
3. **Content reveal**: Scroll → two placeholder sections fade + slide in.
4. **Responsive**: Resize to 375px → hero stacks vertically, no overflow.
5. **Email obfuscation**: Page source has no plain `mailto:` or raw email.
