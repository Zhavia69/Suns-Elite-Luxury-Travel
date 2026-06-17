/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // ── Core Brand Palette ─────────────────────────────────────
        deepBlack:       '#0A0A0A',
        midnight:        '#111827',
        charcoal:        '#1C1C1C',
        richNavy:        '#112240',
        luxuryCharcoal:  '#2D2D2D',
        elevatedBlack:   '#121212',
        surfaceGray:     '#1A1A1A',

        // ── Luxury Gold System ─────────────────────────────────────
        champagneGold:   '#C8A96B',
        mutedGold:       '#D4AF37',
        gold:            '#D4AF37',
        goldLight:       '#E8C97A',
        goldDark:        '#A8893A',
        champagne:       '#F7E7CE',
        bronze:          '#B08D57',

        // ── Text Palette ───────────────────────────────────────────
        warmIvory:       '#F7F5EF',
        softWhite:       '#F8F8F8',
        pureWhite:       '#FFFFFF',
        mutedBeige:      '#A8A29E',
        neutralGray:     '#7A7A7A',
        subtleGray:      '#D1D5DB',
        sand:            '#E5E1D8',

        // ── Semantic Tokens (CSS var-backed) ───────────────────────
        border:     'var(--color-border)',
        input:      'var(--color-input)',
        ring:       'var(--color-ring)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT:    'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        secondary: {
          DEFAULT:    'var(--color-secondary)',
          foreground: 'var(--color-secondary-foreground)',
        },
        destructive: {
          DEFAULT:    'var(--color-destructive)',
          foreground: 'var(--color-destructive-foreground)',
        },
        muted: {
          DEFAULT:    'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        accent: {
          DEFAULT:    'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        popover: {
          DEFAULT:    'var(--color-popover)',
          foreground: 'var(--color-popover-foreground)',
        },
        card: {
          DEFAULT:    'var(--color-card)',
          foreground: 'var(--color-card-foreground)',
        },
        success: {
          DEFAULT:    'var(--color-success)',
          foreground: 'var(--color-success-foreground)',
        },
        warning: {
          DEFAULT:    'var(--color-warning)',
          foreground: 'var(--color-warning-foreground)',
        },
        error: {
          DEFAULT:    'var(--color-error)',
          foreground: 'var(--color-error-foreground)',
        },
        surface: 'var(--color-surface)',
      },

      fontFamily: {
        'display':  ['Cormorant Garamond', 'Georgia', 'serif'],
        'heading':  ['Playfair Display', 'Georgia', 'serif'],
        'body':     ['Manrope', 'Inter', 'sans-serif'],
        'sans':     ['Manrope', 'Inter', 'sans-serif'],
        'mono':     ['JetBrains Mono', 'monospace'],
      },

      fontSize: {
        'xxs':  ['0.65rem',  { lineHeight: '1' }],
        '2xs':  ['0.7rem',   { lineHeight: '1.2' }],
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display': ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },

      letterSpacing: {
        'ultra': '0.25em',
        'widest-xl': '0.35em',
      },

      borderRadius: {
        lg:   "var(--radius)",
        md:   "calc(var(--radius) - 2px)",
        sm:   "calc(var(--radius) - 4px)",
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      boxShadow: {
        'luxury':       '0 2px 8px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.12)',
        'luxury-lg':    '0 4px 16px rgba(0,0,0,0.22), 0 16px 48px rgba(0,0,0,0.18)',
        'luxury-xl':    '0 8px 32px rgba(0,0,0,0.28), 0 24px 64px rgba(0,0,0,0.22)',
        'gold':         '0 0 24px rgba(200,169,107,0.25), 0 0 8px rgba(200,169,107,0.15)',
        'gold-lg':      '0 0 48px rgba(200,169,107,0.35), 0 0 16px rgba(200,169,107,0.2)',
        'inner-gold':   'inset 0 1px 0 rgba(200,169,107,0.3)',
        'glass':        '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'card-luxury':  '0 1px 3px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.2)',
      },

      backgroundImage: {
        'gold-gradient':    'linear-gradient(135deg, #C8A96B 0%, #D4AF37 40%, #E8C97A 60%, #C8A96B 100%)',
        'gold-shimmer':     'linear-gradient(90deg, transparent 0%, rgba(200,169,107,0.4) 50%, transparent 100%)',
        'dark-gradient':    'linear-gradient(180deg, #0A0A0A 0%, #111827 100%)',
        'hero-overlay':     'linear-gradient(180deg, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.2) 40%, rgba(10,10,10,0.65) 100%)',
        'hero-overlay-lg':  'linear-gradient(135deg, rgba(10,10,10,0.8) 0%, rgba(10,10,10,0.4) 50%, rgba(10,10,10,0.6) 100%)',
        'card-overlay':     'linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)',
        'section-dark':     'linear-gradient(180deg, #0A0A0A 0%, #111111 100%)',
        'grain':            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to:   { transform: "translateX(0)" },
        },
        "slide-right": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to:   { transform: "translateX(0)",   opacity: "1" },
        },
        "gold-shimmer": {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(200,169,107,0.4)" },
          "50%":      { boxShadow: "0 0 0 12px rgba(200,169,107,0)" },
        },
        "line-grow": {
          from: { scaleX: "0", transformOrigin: "left" },
          to:   { scaleX: "1", transformOrigin: "left" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.96)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        "chevron-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(6px)" },
        },
      },

      animation: {
        "accordion-down":  "accordion-down 0.2s ease-out",
        "accordion-up":    "accordion-up 0.2s ease-out",
        "fade-in":         "fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-up":         "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-in":        "slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-right":     "slide-right 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "gold-shimmer":    "gold-shimmer 3s linear infinite",
        "float":           "float 4s ease-in-out infinite",
        "pulse-gold":      "pulse-gold 2s ease-in-out infinite",
        "line-grow":       "line-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in":        "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "chevron-bounce":  "chevron-bounce 1.5s ease-in-out infinite",
      },

      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '92': '23rem',
        '100': '25rem',
        '108': '27rem',
        '120': '30rem',
        '128': '32rem',
      },

      backdropBlur: {
        'xs': '2px',
        '2xl': '40px',
        '3xl': '64px',
      },

      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}