import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

// Colors resolve to the CSS variables in src/styles/globals.css (light + .dark)
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        canvas: token('bg'),
        'bg-glow': token('bg-glow'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        line: token('line'),
        ink: token('ink'),
        muted: token('muted'),
        accent: token('accent'),
        'accent-ink': token('accent-ink'),
        'accent-soft': token('accent-soft'),
        'accent-btn': token('accent-btn'),
        'on-accent': token('on-accent'),
        success: token('success'),
        danger: token('danger'),
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans Variable"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono Variable"', ...defaultTheme.fontFamily.mono],
      },
      maxWidth: {
        content: '1200px',
      },
      borderRadius: {
        card: '20px',
        modal: '28px',
      },
      boxShadow: {
        card: '0 1px 2px rgb(22 19 15 / 0.04), 0 8px 24px rgb(22 19 15 / 0.06)',
        'card-hover': '0 12px 32px rgb(234 90 36 / 0.14)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config;
