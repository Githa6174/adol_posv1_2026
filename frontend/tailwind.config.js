/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: 'var(--color-brand-50)',
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
        },
        surface: {
          light: 'var(--color-surface-light)',
          DEFAULT: 'var(--color-surface)',
          dark: 'var(--color-surface-dark)',
        },
        background: 'var(--color-background)',
        border: 'var(--color-border)',
        text: {
          main: 'var(--color-text-main)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
