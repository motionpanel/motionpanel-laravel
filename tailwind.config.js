/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector"],
  content: ["./resources/ts/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Nunito", "sans-serif"],
    },
    fontSize: {
      xs: ["0.625rem", { lineHeight: "1rem" }],
      sm: ["0.75rem", { lineHeight: "1.25rem" }],
      base: ["0.875rem", { lineHeight: "1.5rem" }],
      lg: ["1rem", { lineHeight: "1.75rem" }],
      xl: ["1.125rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.375rem", { lineHeight: "2rem" }],
      "3xl": ["1.75rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.125rem", { lineHeight: "2.5rem" }],
      "5xl": ["2.875rem", { lineHeight: "1" }],
      "6xl": ["3.625rem", { lineHeight: "1" }],
      "7xl": ["4.375rem", { lineHeight: "1" }],
      "8xl": ["5.875rem", { lineHeight: "1" }],
      "9xl": ["7.875rem", { lineHeight: "1" }],
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
