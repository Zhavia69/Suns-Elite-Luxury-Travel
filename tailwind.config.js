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
        border: "var(--color-border)", /* champagne-gold-20 */
        input: "var(--color-input)", /* surface-gray */
        ring: "var(--color-ring)", /* champagne-gold */
        background: "var(--color-background)", /* deep-black */
        foreground: "var(--color-foreground)", /* warm-ivory */
        primary: {
          DEFAULT: "var(--color-primary)", /* champagne-gold */
          foreground: "var(--color-primary-foreground)", /* deep-black */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* elevated-black */
          foreground: "var(--color-secondary-foreground)", /* warm-ivory */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* deep-burgundy */
          foreground: "var(--color-destructive-foreground)", /* warm-ivory */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* surface-gray */
          foreground: "var(--color-muted-foreground)", /* muted-beige */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* champagne-gold */
          foreground: "var(--color-accent-foreground)", /* deep-black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* surface-gray */
          foreground: "var(--color-popover-foreground)", /* warm-ivory */
        },
        card: {
          DEFAULT: "var(--color-card)", /* elevated-black */
          foreground: "var(--color-card-foreground)", /* warm-ivory */
        },
        success: {
          DEFAULT: "var(--color-success)", /* deep-emerald */
          foreground: "var(--color-success-foreground)", /* warm-ivory */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* dark-goldenrod */
          foreground: "var(--color-warning-foreground)", /* warm-ivory */
        },
        error: {
          DEFAULT: "var(--color-error)", /* deep-burgundy */
          foreground: "var(--color-error-foreground)", /* warm-ivory */
        },
        surface: "var(--color-surface)", /* surface-gray */
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
        "slide-in": "slide-in 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
      boxShadow: {
        'luxury': '0 2px 8px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08)',
        'luxury-lg': '0 4px 16px rgba(0, 0, 0, 0.15), 0 12px 32px rgba(0, 0, 0, 0.1)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}