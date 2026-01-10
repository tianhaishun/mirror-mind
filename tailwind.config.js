import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 启用 class 模式
  theme: {
    extend: {
      colors: {
        mirror: {
          base: 'hsl(var(--color-base) / <alpha-value>)',
          surface: 'hsl(var(--color-surface) / <alpha-value>)',
          border: 'hsl(var(--color-border) / <alpha-value>)',
          text: {
            primary: 'hsl(var(--color-text-primary) / <alpha-value>)',
            secondary: 'hsl(var(--color-text-secondary) / <alpha-value>)',
            accent: 'hsl(var(--color-accent) / <alpha-value>)',
          }
        }
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          '-apple-system',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif'
        ],
        mono: ['SF Mono', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    typography,
  ],
}