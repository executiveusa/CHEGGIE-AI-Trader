# 🎨 FIGMA-READY WIREFRAME MAP

**Frames & Components Guide**  
**For Cheggie Lifestyle Finance Redesign**

---

## FRAME STRUCTURE

```
📁 Cheggie Lifestyle Finance
├── 📁 🎨 Design System
│   ├── 🔲 Colors
│   ├── 🔲 Typography
│   ├── 🔲 Spacing
│   ├── 🔲 Effects (Shadows, Blur)
│   └── 🔲 Breakpoints
│
├── 📁 🧩 Components
│   ├── 📁 Navigation
│   │   ├── 🔲 Nav Desktop
│   │   ├── 🔲 Nav Mobile
│   │   ├── 🔲 Nav Item (Default/Hover/Active)
│   │   └── 🔲 Language Switcher
│   │
│   ├── 📁 Buttons
│   │   ├── 🔲 Primary (Default/Hover/Focus)
│   │   ├── 🔲 Secondary
│   │   ├── 🔲 Ghost
│   │   ├── 🔲 Magnetic CTA
│   │   └── 🔲 Icon Button
│   │
│   ├── 📁 Cards
│   │   ├── 🔲 Glass Card
│   │   ├── 🔲 Feature Card
│   │   ├── 🔲 Insight Card (Large/Medium/Small)
│   │   ├── 🔲 Tracking Card
│   │   └── 🔲 Dashboard Tile
│   │
│   ├── 📁 Inputs
│   │   ├── 🔲 Text Input
│   │   ├── 🔲 Search
│   │   └── 🔲 Language Select
│   │
│   └── 📁 Feedback
│       ├── 🔲 Badge
│       ├── 🔲 Progress Bar
│       ├── 🔲 Toast
│       └── 🔲 Loading Skeleton
│
├── 📁 📱 Pages - Mobile (375px)
│   ├── 🔲 Language Selection
│   ├── 🔲 Home
│   ├── 🔲 Dashboard
│   └── 🔲 Auth
│
├── 📁 💻 Pages - Desktop (1440px)
│   ├── 🔲 Language Selection
│   ├── 🔲 Home
│   ├── 🔲 Dashboard
│   └── 🔲 Auth
│
└── 📁 🎬 Prototypes
    ├── 🔗 Language → Home Flow
    ├── 🔗 Nav Scroll Behavior
    └── 🔗 Dashboard Interaction
```

---

## DESIGN TOKENS

### Colors

```
Background:
  --bg-primary: #0F172A (slate-900)
  --bg-secondary: #1E293B (slate-800)
  --bg-card: rgba(255, 255, 255, 0.05)
  --bg-card-hover: rgba(255, 255, 255, 0.08)

Primary:
  --primary-500: #10B981 (emerald)
  --primary-600: #059669
  --primary-400: #34D399

Accent:
  --accent-500: #14B8A6 (teal)
  --accent-400: #2DD4BF

Text:
  --text-primary: #F8FAFC (slate-50)
  --text-secondary: #94A3B8 (slate-400)
  --text-muted: #64748B (slate-500)

Border:
  --border-default: rgba(255, 255, 255, 0.1)
  --border-focus: rgba(16, 185, 129, 0.5)
```

### Typography

```
Font Family: Inter (fallback: system-ui)

Display:
  --text-7xl: 72px / 1.1 / -0.02em (Hero)
  --text-5xl: 48px / 1.15 / -0.02em (Section titles)
  --text-4xl: 36px / 1.2 (Card titles)

Body:
  --text-xl: 20px / 1.6 (Lead text)
  --text-lg: 18px / 1.5 (Body large)
  --text-base: 16px / 1.5 (Body)
  --text-sm: 14px / 1.4 (Small text)
  --text-xs: 12px / 1.4 (Caption)

Weights:
  --font-normal: 400
  --font-medium: 500
  --font-semibold: 600
  --font-bold: 700
```

### Spacing

```
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

### Effects

```
Glass:
  background: rgba(255, 255, 255, 0.05)
  backdrop-filter: blur(12px)
  border: 1px solid rgba(255, 255, 255, 0.1)

Shadow Glow:
  box-shadow: 0 0 30px rgba(16, 185, 129, 0.3)

Shadow Elevated:
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2)

Radius:
  --radius-sm: 6px
  --radius-md: 12px
  --radius-lg: 16px
  --radius-xl: 24px
  --radius-full: 9999px
```

---

## COMPONENT SPECS

### Navigation (Desktop)

```
Frame: Full width, height 64px
Background: transparent → blur on scroll
Layout: Container (max-width 1280px), flex between

Left:
  - Logo: 40×40 icon + "Cheggie AI" text

Center:
  - Nav links: gap 24px
  - Each link: 14px medium, padding 8px 12px
  - Active: underline accent

Right:
  - Language switcher: 40×40 icon button
  - Login: Ghost button, 14px
  - Sign Up: Primary button, glow shadow
  - Gap: 12px
```

### Hero Section

```
Frame: 100vh, full width
Background: Image + gradient overlay

Layout:
  - Container max-width 1280px
  - Content left-aligned, max-width 600px
  - Vertical center

Content Stack (gap 24px):
  - Badge: Pill with "Finance + Lifestyle"
  - H1: 72px bold, gradient text optional
  - Subtitle: 20px, text-secondary
  - Button row: gap 16px
    - Primary CTA: lg size, emerald, glow
    - Secondary CTA: lg size, ghost with border

Right Side / Below:
  - Video player: Rounded card, 16:9
  - Feature cards: 3-column grid, gap 16px
```

### Language Card

```
Frame: max-width 560px, centered
Background: Glass card on dark gradient

Content:
  - Title: 40px semibold, centered
  - Subtitle: 18px muted, centered
  - Language buttons: Stack, gap 12px
    - Each: 64px height, full width
    - Left: Flag 32px
    - Center: Language name, 18px semibold
    - Right: Check icon (if selected)
    - Selected: Ring 2px primary, glow
  - Continue button: lg, bottom, full width
```

### Tracking Card

```
Frame: Fill container cell
Background: Glass card

Layout:
  - Padding: 20px
  - Header: Icon (24px) + Title
  - Metric: Large number (32px bold)
  - Footer: "Updated X ago" muted

Variants:
  - Default
  - Live (pulsing dot indicator)
  - Positive (green accent)
  - Negative (red accent)
```

### Dashboard Tile

```
Base:
  - Background: Glass card
  - Border radius: 16px
  - Padding: 24px
  - Header: Title + Icon/Action

Sizes:
  - Large: col-span-8, row-span-2 (Chart tile)
  - Medium: col-span-4 (List tile)
  - Small: col-span-4 (Metric tile)
  - Wide: col-span-6 (Table/notes)
```

---

## PAGE LAYOUTS

### Home Page (Desktop 1440px)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [NAV] Logo                    [Links]                 Lang │ Login │SignUp│
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │ HERO (100vh)                                                         │  │
│   │                                                                       │  │
│   │   [Badge: Finance + Lifestyle]                                        │  │
│   │                                                                       │  │
│   │   Design Wealth. Live Free.                                          │  │
│   │                                                                       │  │
│   │   I harmonize personal rituals, capital flows...                     │  │
│   │                                                                       │  │
│   │   [Start Journey] [Explore]                                           │  │
│   │                                                                       │  │
│   │   [Video Player]     [Feature] [Feature] [Feature]                   │  │
│   │                                                                       │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │ TRACKING SNAPSHOT                                                     │  │
│   │                                                                       │  │
│   │   What I'm Tracking Now                                               │  │
│   │                                                                       │  │
│   │   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │  │
│   │   │ Market   │ │Watchlist │ │ Brief    │ │ Delta    │               │  │
│   │   │ Pulse    │ │          │ │          │ │          │               │  │
│   │   │ 3 signals│ │ 12 assets│ │ Ready    │ │ +2.4%    │               │  │
│   │   └──────────┘ └──────────┘ └──────────┘ └──────────┘               │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │ INSIGHTS GRID                                                         │  │
│   │                                                                       │  │
│   │   Selected Insights & Projects                                        │  │
│   │                                                                       │  │
│   │   ┌───────────────────────┐ ┌──────────┐ ┌──────────┐               │  │
│   │   │                       │ │          │ │          │               │  │
│   │   │   FEATURED PROJECT    │ │ Post     │ │ Insight  │               │  │
│   │   │                       │ │          │ │          │               │  │
│   │   │                       │ ├──────────┤ ├──────────┤               │  │
│   │   │                       │ │ Post     │ │ Insight  │               │  │
│   │   └───────────────────────┘ └──────────┘ └──────────┘               │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │ ABOUT                                                                 │  │
│   │                                                                       │  │
│   │   ┌──────────┐  Trevor Arriaga                                        │  │
│   │   │          │  Financial Intelligence & Lifestyle Design            │  │
│   │   │  PHOTO   │                                                        │  │
│   │   │          │  [Bio text here...]                                    │  │
│   │   └──────────┘                                                        │  │
│   │                 🇷🇸 🇬🇧 🇲🇽    [LinkedIn] [X] [Schedule]           │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │ CTA BANNER (Gradient)                                                 │  │
│   │                                                                       │  │
│   │         Ready to Design Your Wealth?                                  │  │
│   │         [Get Started Free]                                            │  │
│   │                                                                       │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
├────────────────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                                    │
│  Brand    │ Navigation │ Resources │ Legal                                  │
│  © 2024   │ Links      │ Links     │ Links    │ Social                     │
└────────────────────────────────────────────────────────────────────────────┘
```

### Dashboard (Desktop 1440px)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ [NAV] Logo            [Links]                    Lang │ [Trading] [Business]│
├────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   Welcome · Trevor                                                          │
│   Command Center                                                            │
│   [Launch Lovable] [OpenRouter Tasks]                                       │
│                                                                             │
│   ┌────────────────────────────────────────────────┐ ┌──────────────────┐  │
│   │                                                │ │                  │  │
│   │                MARKET PULSE                    │ │    WATCHLIST     │  │
│   │                                                │ │                  │  │
│   │   [Chart Area]                                 │ │   Asset 1  $XXX  │  │
│   │                                                │ │   Asset 2  $XXX  │  │
│   │   AI Signal: STRONG BUY BTC   [Confidence 85%]│ │   Asset 3  $XXX  │  │
│   │                                                │ │                  │  │
│   ├────────────────────────────────────────────────┤ │   [+ Add Asset]  │  │
│   │                (continues)                      │ │                  │  │
│   └────────────────────────────────────────────────┘ └──────────────────┘  │
│                                                                             │
│   ┌──────────────────────────────┐ ┌──────────────────────────────────────┐│
│   │                              │ │                                      ││
│   │       DAILY BRIEF            │ │             NOTES                    ││
│   │                              │ │                                      ││
│   │   Today's summary...         │ │   [Note input field]                 ││
│   │   Key events:                │ │                                      ││
│   │   • Event 1                  │ │   Recent notes list...               ││
│   │   • Event 2                  │ │                                      ││
│   │                              │ │                                      ││
│   └──────────────────────────────┘ └──────────────────────────────────────┘│
│                                                                             │
│   ┌────────────────────────────────────────────────────────────────────────┤
│   │                        QUICK ACTIONS                                    │
│   │                                                                         │
│   │   [Launch OpenRouter]  [Sync Lovable]  [Manage Stripe]                 │
│   │                                                                         │
│   └─────────────────────────────────────────────────────────────────────────│
│                                                                             │
└────────────────────────────────────────────────────────────────────────────┘
```

---

## MOBILE FRAME (375px)

Key differences:

1. Nav collapses to hamburger
2. Hero content stacks vertically
3. Cards go full-width single column
4. Dashboard tiles stack 1-per-row
5. Footer columns stack

---

## INTERACTION NOTES FOR PROTOTYPE

1. **Language Selection → Home**

   - Select language → Ring animation
   - Continue → Page transition (slide left)

2. **Nav Scroll**

   - On scroll past 50px → Background blur appears
   - Click anchor → Smooth scroll to section

3. **Magnetic CTA**

   - Hover within 100px → Button follows cursor slightly
   - Leave → Spring back to center

4. **Dashboard Tiles**
   - Hover → Subtle lift + shadow increase
   - Click → Expand or navigate

---

_Figma Wireframe Map v1.0 - Antigravity AI Architect_
