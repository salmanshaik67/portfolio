/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#04050a',
          900: '#070915',
          800: '#0b0f22',
          700: '#12152b',
          600: '#1a1d38',
        },
        fg: {
          DEFAULT: '#eef0ff',
          muted: '#a7adc6',
          subtle: '#8087a3',
        },
        electric: '#5b8cff',
        violet: '#9b7bff',
        cyan: '#3fd8f0',
        magenta: '#f072d6',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.055em',
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
