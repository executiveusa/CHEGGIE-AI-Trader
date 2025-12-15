# 🎨 GOOGLE STITCH PROMPT PIPELINE

**Foundation → Page-by-Page Prompts**  
**For generating consistent UI designs referencing data-agid targets**

---

## FOUNDATION PROMPT (Run First)

```
You are designing a premium personal brand website for "Cheggie Lifestyle Finance".

DESIGN SYSTEM:
- Style: Premium dark mode with glassmorphism
- Primary Color: Emerald (#10B981) with teal accents
- Background: Deep slate (#0F172A to #020617)
- Cards: Glass effect with subtle borders
- Typography: Inter or Outfit, clean hierarchy
- Motion: Subtle reveals, magnetic hover, animated counters
- Mood: Sophisticated, calm, trustworthy financial intelligence

CONSTRAINTS:
- Mobile-first responsive
- Accessibility: WCAG AA contrast
- No generic SaaS patterns
- First-person voice throughout
- Trilingual support (en, sr-Latn, es-MX)

ELEMENT NAMING:
Every major section must have a unique identifier:
- data-agid="nav-primary" for navigation
- data-agid="home-hero" for hero section
- data-agid="section-{name}" for content sections
- data-agid="tile-{name}" for dashboard tiles
- data-agid="cta-{type}" for call-to-action buttons

REFERENCE ASSETS:
Located at: public/stitch_language_selection/stitch_language_selection/
- public_homepage_hero/screen.png → Hero design reference
- home_page_1/screen.png → Landing layout reference
- user_dashboard/screen.png → Dashboard bento reference
```

---

## PAGE PROMPTS

### PROMPT 1: Language Selection Page

```
Design a language selection page for Cheggie Lifestyle Finance.

TARGET: data-agid="page-language"

REQUIREMENTS:
- Full viewport centered card on dark gradient background
- Three language options in a vertical stack:
  1. 🇷🇸 Srpski (latinica) - Serbian Latin
  2. 🇬🇧 English
  3. 🇲🇽 Español (MX) - Mexican Spanish
- Each option is a large button with flag, language name
- Selected state: Ring highlight + checkmark
- Continue button below options
- Subtle background image with dark overlay

COPY:
- Title: "Choose Your Language" (localized)
- Subtitle: "Start your financial journey"
- CTA: "Continue"

ANIMATION:
- Entrance: Fade up with stagger
- Selection: Scale pulse + ring
- Continue: Glow effect

REFERENCE: language_selection/screen.png
```

---

### PROMPT 2: Home Hero Section

```
Design the hero section for Cheggie Lifestyle Finance personal brand homepage.

TARGET: data-agid="home-hero"

REQUIREMENTS:
- Full viewport height
- Personal-voice headline (first person)
- Background: Cyprus beach + modern skyline blend (reference image)
- Gradient overlay for text legibility
- Left-aligned content for reading flow
- Two CTAs: Primary (Start My Journey) + Secondary (Explore Framework)

CONTENT:
- Badge: "Finance + Lifestyle" pill
- H1: "I help you design wealth and live free"
- Subtitle: "Harmonizing personal rituals, capital flows, and global opportunities"
- CTA Primary: data-agid="cta-primary" → "/auth"
- CTA Secondary: data-agid="cta-secondary" → "#tracking"

FEATURES (Right side or below):
- Video player with lifestyle reel (muted autoplay)
- 3 feature highlight cards with glassmorphism:
  1. "Flowwise Agents" - Adaptive guidance
  2. "Lifestyle Intelligence" - Ritual design
  3. "Global Perspective" - Worldwide opportunities

ANIMATION:
- Text: Split word reveal
- CTAs: Magnetic hover
- Video: Fade in with border glow

REFERENCE: public_homepage_hero/screen.png
```

---

### PROMPT 3: Tracking Snapshot Section

```
Design "What I'm Tracking Now" section for public homepage.

TARGET: data-agid="section-tracking"

PURPOSE: Public snapshot of current focus areas (teaser for dashboard)

LAYOUT:
- Section header with subtitle
- 3-4 card grid with live data appearance
- Each card shows: Icon, title, metric/status, last updated

CARDS:
1. Market Pulse - "3 active signals" - Updated 2h ago
2. Watchlist - "12 assets tracked" - Live
3. Today's Brief - "Summary available" - 8:00 AM
4. Portfolio Delta - "+2.4% this week" - Real-time

STYLE:
- Cards: Dark glassmorphism with subtle border
- Metrics: Large numbers with color coding (green up, red down)
- Hover: Slight lift + glow

ANIMATION:
- Section reveal on scroll
- Cards stagger entrance
- Numbers animate on view

CTA: "View Full Dashboard →" (requires login)
```

---

### PROMPT 4: Insights Grid Section

```
Design "Selected Insights" section for personal brand showcase.

TARGET: data-agid="section-insights"

PURPOSE: Showcase projects, writings, analyses (replaces generic testimonials)

LAYOUT:
- Section header: "Selected Insights & Projects"
- Masonry or bento grid layout
- Mix of card sizes for visual interest

CARD TYPES:
1. Featured Project (large) - Image + title + description
2. Blog Post (medium) - Title + excerpt + date
3. Quick Insight (small) - Icon + short text

CONTENT EXAMPLES:
- "Building Flowwise Agents for Serbian Youth"
- "Bitcoin Policy Navigation for NBS Compliance"
- "Lifestyle Design Framework v2"

STYLE:
- Mix of image cards and text-only cards
- Tags for categorization (Finance, Lifestyle, Tech)
- Read more links

ANIMATION:
- Stagger reveal on scroll
- Hover: Scale up slightly + shadow depth
```

---

### PROMPT 5: About Section

```
Design "About Me" section for personal brand.

TARGET: data-agid="section-about"

LAYOUT:
- Two column: Photo left, text right (or stacked mobile)
- Personal story format

CONTENT:
- Photo: Professional but warm headshot placeholder
- Name: "Trevor Arriaga" (or personal name)
- Title: "Financial Intelligence & Lifestyle Design"
- Bio: 2-3 paragraphs about mission, background, approach
- Key facts: Location, languages spoken, current focus

ELEMENTS:
- Social links (LinkedIn, X)
- Languages badges: 🇷🇸 🇬🇧 🇲🇽
- "Schedule a call" CTA

STYLE:
- Warm, approachable
- Professional photo treatment
- Subtle gradient background
```

---

### PROMPT 6: CTA Banner

```
Design closing CTA banner for homepage.

TARGET: data-agid="section-cta"

PURPOSE: Convert to dashboard signup/login

LAYOUT:
- Full-width gradient banner
- Centered content
- Single strong CTA

CONTENT:
- Headline: "Ready to Design Your Wealth?"
- Subtitle: "Access the full dashboard and start your journey"
- CTA: "Get Started Free" → /auth

STYLE:
- Gradient: Primary to accent sweep
- Button: Large, magnetic effect
- Glow/shadow for depth

ANIMATION:
- Scale entrance on scroll
- Button: Magnetic hover
- Background: Subtle shimmer
```

---

### PROMPT 7: Dashboard Overview

```
Design private dashboard with bento grid layout.

TARGET: data-agid="page-dashboard"

LAYOUT: 12-column bento grid

TILES:
1. Market Pulse (col-span-8, row-span-2) - data-agid="tile-market-pulse"
   - Live charts
   - AI signals list
   - Confidence meters

2. Watchlist (col-span-4) - data-agid="tile-watchlist"
   - Asset list with prices
   - Quick add button

3. Daily Brief (col-span-4) - data-agid="tile-brief"
   - AI-generated summary
   - Key events
   - Expandable

4. Notes (col-span-6) - data-agid="tile-notes"
   - Quick note input
   - Recent notes list

5. Quick Actions (col-span-6) - data-agid="tile-actions"
   - Large icon buttons
   - Launch Lovable, Stripe, OpenRouter

STYLE:
- Each tile: Card with subtle border
- Strong hierarchy
- Scannable at a glance

REFERENCE: user_dashboard/screen.png
```

---

### PROMPT 8: Navigation Bar

```
Design fixed navigation bar.

TARGET: data-agid="nav-primary"

LAYOUT:
- Fixed top, full width
- Left: Logo (trending icon + "Cheggie AI")
- Center: Navigation links (desktop)
- Right: Language switcher + Login + Sign Up

LINKS:
- Tracking (scroll to #tracking)
- Insights (scroll to #insights)
- About (scroll to #about)
- Dashboard (visible if logged in)

STATES:
- Default: Transparent background
- Scrolled (>50px): Blur backdrop, subtle border
- Active link: Underline accent

MOBILE:
- Hamburger menu icon
- Slide-out drawer

ANIMATION:
- Entrance: Slide down
- Scroll morph: Background opacity change
- Links: Underline grow on hover
```

---

### PROMPT 9: Footer

```
Design site footer.

TARGET: data-agid="footer-main"

LAYOUT:
- 4 column grid (1.2fr for brand, 3 equal for links)
- Full-width bottom bar

COLUMNS:
1. Brand: Logo, tagline, contact info, phone CTA
2. Navigation: Tracking, Insights, About
3. Resources: Docs, Status, API (external links)
4. Legal: Privacy, Terms, Security

BOTTOM BAR:
- Copyright
- Email link
- Status link
- Social links (LinkedIn, X)

STYLE:
- Muted background
- Subtle top border
- Smaller text
- Hover states on links
```

---

## ASSET INTEGRATION GUIDE

For each stitch asset in `public/stitch_language_selection/stitch_language_selection/`:

| Asset                                   | Prompt Reference | Integration              |
| --------------------------------------- | ---------------- | ------------------------ |
| `language_selection/screen.png`         | Prompt 1         | Direct implementation    |
| `public_homepage_hero/screen.png`       | Prompt 2         | Hero design reference    |
| `home_page_1/screen.png`                | Foundation       | Overall layout reference |
| `home_page_2/screen.png`                | Foundation       | Alternative layout       |
| `user_dashboard/screen.png`             | Prompt 7         | Dashboard bento grid     |
| `advisor_client_dashboard/screen.png`   | Admin pages      | Advisor view design      |
| `quick_analyze_modal_*/screen.png`      | Modal components | Analysis flow            |
| `saved_analyses_view/screen.png`        | Dashboard        | Saved state view         |
| `transaction_history_view_*/screen.png` | Dashboard        | History views            |

---

## EXECUTION ORDER

1. **Foundation** → Set design system
2. **Prompt 8 (Nav)** → Global navigation
3. **Prompt 1 (Language)** → Language selection
4. **Prompt 2 (Hero)** → Home hero
5. **Prompt 3 (Tracking)** → Tracking section
6. **Prompt 4 (Insights)** → Insights grid
7. **Prompt 5 (About)** → About section
8. **Prompt 6 (CTA)** → CTA banner
9. **Prompt 9 (Footer)** → Footer
10. **Prompt 7 (Dashboard)** → Private dashboard

---

_Stitch Prompt Pipeline v1.0 - Antigravity AI Architect_
