import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    spacing: {
      0: "0",
      px: "1px",
      0.5: "0.125rem", // 2px
      1: "0.25rem",    // 4px
      1.5: "0.375rem", // 6px
      2: "0.5rem",     // 8px
      2.5: "0.625rem", // 10px
      3: "0.75rem",    // 12px
      3.5: "0.875rem", // 14px
      4: "1rem",       // 16px
      5: "1.25rem",    // 20px
      6: "1.5rem",     // 24px
      7: "1.75rem",    // 28px
      8: "2rem",       // 32px
      9: "2.25rem",    // 36px
      10: "2.5rem",    // 40px
      12: "3rem",      // 48px
      14: "3.5rem",    // 56px
      16: "4rem",      // 64px
      20: "5rem",      // 80px
      24: "6rem",      // 96px
      28: "7rem",      // 112px
      32: "8rem",      // 128px
      36: "9rem",      // 144px
      40: "10rem",     // 160px
      44: "11rem",     // 176px (touch target height)
      48: "12rem",     // 192px
      52: "13rem",     // 208px
      56: "14rem",     // 224px
      60: "15rem",     // 240px
      64: "16rem",     // 256px
      72: "18rem",     // 288px
      80: "20rem",     // 320px
      96: "24rem",     // 384px
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],        // 12px
      sm: ["0.875rem", { lineHeight: "1.25rem" }],    // 14px
      base: ["1rem", { lineHeight: "1.5rem" }],       // 16px
      lg: ["1.125rem", { lineHeight: "1.75rem" }],    // 18px
      xl: ["1.25rem", { lineHeight: "1.75rem" }],     // 20px
      "2xl": ["1.5rem", { lineHeight: "2rem" }],      // 24px
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],   // 36px
      "5xl": ["3rem", { lineHeight: "1" }],           // 48px
      "6xl": ["3.75rem", { lineHeight: "1" }],        // 60px
      "7xl": ["4.5rem", { lineHeight: "1" }],         // 72px
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          glow: "hsl(var(--secondary-glow))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-success': 'var(--gradient-success)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'glow': 'var(--shadow-glow)',
        'success': 'var(--shadow-success)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--transition-smooth)',
        'bounce': 'var(--transition-bounce)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
