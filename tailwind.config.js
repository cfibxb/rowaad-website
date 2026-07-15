/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0A0A0F",
        foreground: "#F5F5F7",
        primary: { DEFAULT: "#6D5DFC", foreground: "#F5F5F7" },
        secondary: { DEFAULT: "#22D3EE", foreground: "#0A0A0F" },
        muted: { DEFAULT: "#9CA3AF", foreground: "#6B7280" },
        accent: { DEFAULT: "#6D5DFC", foreground: "#F5F5F7" },
        card: { DEFAULT: "#14141B", foreground: "#F5F5F7" },
        popover: { DEFAULT: "#14141B", foreground: "#F5F5F7" },
        destructive: { DEFAULT: "#EF4444", foreground: "#F5F5F7" },
        amber: "#F5A623",
        coral: "#FF6B57",
      },
      borderRadius: { lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)" },
      fontFamily: { heading: ["Clash Display", "Space Grotesk", "sans-serif"], body: ["Inter", "sans-serif"] },
      keyframes: {
        "accordion-down": { from: { height: 0 }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: 0 } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}