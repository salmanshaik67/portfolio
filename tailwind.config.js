/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#000000',
          900: '#0a0a0a',
          800: '#111111',
          700: '#181818',
          600: '#222222',
        },
        fg: {
          DEFAULT: '#ffffff',
          muted: '#a3a3a3',
          subtle: '#8a8a8a',
        },
        sky: '#00bbff',
        teal: '#77dddd',
        sun: '#ffcc66',
        lilac: '#bb88ff',
        coral: '#f07a52',
        rose: '#f07a8a',
        mint: '#b8eab0',
      },
      fontFamily: {
        sans: ['"Inter Tight Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"Azeret Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightish: '-0.01em',
        tighter2: '-0.025em',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
};
