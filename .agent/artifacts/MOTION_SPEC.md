# 🎬 CHEGGIE MOTION SPEC

**Motion Primitives Design System**  
**Version:** 1.0

---

## CORE PRINCIPLES

1. **Purposeful Motion** - Every animation serves UX, not decoration
2. **Consistent Timing** - Unified easing and duration vocabulary
3. **Reduced Motion First** - All animations skippable via `prefers-reduced-motion`
4. **Performance** - 60fps or bust, GPU-accelerated transforms only

---

## TIMING TOKENS

```css
/* Duration Scale */
--duration-instant: 100ms; /* Micro-feedback (button press) */
--duration-fast: 200ms; /* Hover states, toggles */
--duration-normal: 400ms; /* Standard transitions */
--duration-entering: 500ms; /* Elements entering view */
--duration-slow: 800ms; /* Hero animations, page transitions */
--duration-glacial: 1200ms; /* Ambient loops */

/* Easing Functions */
--ease-out-expo: cubic-bezier(
  0.16,
  1,
  0.3,
  1
); /* Primary - sharp start, gentle land */
--ease-in-out-expo: cubic-bezier(0.87, 0, 0.13, 1); /* Emphasis - symmetrical */
--ease-spring: cubic-bezier(0.22, 1.2, 0.36, 1); /* Bouncy - playful */
--ease-linear: linear; /* Loops only */
```

---

## ANIMATION PATTERNS

### 1. **Reveal on Scroll (In-View)**

```typescript
// Trigger: Element enters viewport (margin: -100px)
// Default state: opacity 0, translateY 40px
// Animate to: opacity 1, translateY 0

const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // ease-out-expo
    },
  },
};

// Usage with stagger
const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
```

**Data-AGID targets:**

- `data-agid="section-features"` - Stagger cards
- `data-agid="section-workflow"` - Stagger steps
- `data-agid="section-insights"` - Grid reveal

---

### 2. **Magnetic Hover (CTAs)**

```typescript
// Trigger: Mouse within 100px of element
// Effect: Element shifts toward cursor

const magneticStrength = 0.3; // 30% of offset

const onMouseMove = (e: MouseEvent, element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = (e.clientX - centerX) * magneticStrength;
  const deltaY = (e.clientY - centerY) * magneticStrength;

  element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
};

// Spring animation on release
transition: { type: 'spring', stiffness: 150, damping: 15 }
```

**Data-AGID targets:**

- `data-agid="cta-primary"` - Main hero CTA
- `data-agid="cta-secondary"` - Secondary actions

---

### 3. **Animated Counter**

```typescript
// Trigger: Element in view
// Effect: Count from 0 to target over 2s

const AnimatedNumber = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    });

    return controls.stop;
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
};
```

**Data-AGID targets:**

- `data-agid="stat-analyses"` - "10K+"
- `data-agid="stat-accuracy"` - "99.9%"
- `data-agid="stat-users"` - Active users

---

### 4. **Glassmorphism Depth**

```css
/* Layered blur with parallax depth */
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.glass-card:hover {
  backdrop-filter: blur(16px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transform: translateY(-4px);
  transition: all var(--duration-fast) var(--ease-out-expo);
}
```

---

### 5. **Page Transition Panels**

```typescript
// For route changes

const pageTransition = {
  initial: { opacity: 0, x: 20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: { duration: 0.3 },
  },
};

// Wrap routes
<AnimatePresence mode="wait">
  <motion.div key={location.pathname} {...pageTransition}>
    {children}
  </motion.div>
</AnimatePresence>;
```

---

### 6. **Navbar Scroll Morph**

```typescript
const [scrollY, setScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => setScrollY(window.scrollY);
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Navbar style changes
const navStyle = {
  background: scrollY > 50 ? "rgba(10, 10, 10, 0.95)" : "transparent",
  backdropFilter: scrollY > 50 ? "blur(16px)" : "blur(0px)",
  borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.1)" : "none",
};
```

---

### 7. **Text Split Reveal**

```typescript
// Animate each word/character

const SplitText = ({ text, type = "words" }: Props) => {
  const items = type === "words" ? text.split(" ") : text.split("");

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="inline-block"
        >
          {item}
          {type === "words" ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};
```

---

## REDUCED MOTION

```typescript
// Utility hook
const usePrefersReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
};

// Usage
const prefersReduced = usePrefersReducedMotion();

const variants = prefersReduced
  ? { hidden: {}, visible: {} } // No animation
  : { hidden: { opacity: 0 }, visible: { opacity: 1 } };
```

---

## COMPONENT MOTION MAP

| Component       | Animation           | Trigger       | Duration | Easing         |
| --------------- | ------------------- | ------------- | -------- | -------------- |
| Navbar          | Background blur     | Scroll > 50px | 200ms    | ease-out-expo  |
| Hero Title      | Split word reveal   | Mount         | 800ms    | ease-out-expo  |
| Hero Stats      | Counter + fade      | In-view       | 2000ms   | ease-out-expo  |
| Feature Cards   | Reveal + stagger    | In-view       | 600ms    | ease-out-expo  |
| CTA Buttons     | Magnetic hover      | Mouse move    | spring   | spring(150,15) |
| Section Headers | Slide up + fade     | In-view       | 500ms    | ease-out-expo  |
| Dashboard Tiles | Scale up + fade     | Mount         | 400ms    | ease-spring    |
| Language Picker | Dropdown slide      | Click         | 200ms    | ease-out-expo  |
| Toast           | Slide in from right | Trigger       | 300ms    | ease-out-expo  |

---

## FRAMER MOTION PRESETS

```typescript
// Reusable presets for codebase

export const motionPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },

  scaleUp: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: [0.22, 1.2, 0.36, 1] },
  },

  slideInRight: {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },

  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
};
```

---

_Motion Spec v1.0 - Antigravity AI Architect_
