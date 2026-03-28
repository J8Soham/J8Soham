# Data Model: Sticky Hero Title Screen

This feature is purely presentational — no persistent data, API calls, or state management beyond local UI state. The "data model" describes the static content entities and component props.

## Entities

### HeroCardData

Represents the content rendered inside the hero card.

| Field       | Type       | Description                                      |
|-------------|------------|--------------------------------------------------|
| `avatarSrc` | `string`   | Path to the circular avatar image                |
| `avatarAlt` | `string`   | Alt text for the avatar image                    |
| `handle`    | `string`   | Hashtag-style display name (e.g., `@j8soham`)    |
| `subtitle`  | `string`   | Casual greeting line (e.g., "hey, i build things") |
| `links`     | `SocialLink[]` | Array of contact/social links                |

### SocialLink

| Field    | Type     | Description                            |
|----------|----------|----------------------------------------|
| `label`  | `string` | Display text (e.g., "GitHub")          |
| `url`    | `string` | Link URL (or empty for obfuscated email) |
| `icon`   | `string` | Icon identifier or SVG                 |
| `type`   | `'link' \| 'email'` | Differentiates obfuscated email from normal links |

### RevealSectionData

| Field      | Type     | Description                              |
|------------|----------|------------------------------------------|
| `id`       | `string` | Unique section identifier                |
| `children` | `ReactNode` | Content to render inside the section  |

## Component Tree

```
App
├── StickyHero (hero-anchor + hero-card)
│   ├── Avatar image
│   ├── Handle text
│   ├── Subtitle text
│   └── SocialLinks (GitHub, Email, LinkedIn)
└── ContentSections (content-sections wrapper)
    ├── RevealSection (placeholder card 1)
    └── RevealSection (placeholder card 2)
```

## State

- **No global state** — no Redux, Context, or state management needed.
- **Local ref** — `useScrollBlur` hook manages a `ref` to the hero card element for the JS fallback blur.
- **CSS class toggle** — `RevealSection` uses `IntersectionObserver` to add a `.visible` class; no React state involved.
