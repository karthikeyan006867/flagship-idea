/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enterprise dark mode palette
        background: {
          DEFAULT: '#0A0E1A',
          secondary: '#0F1420',
          tertiary: '#141926',
          elevated: '#1A202E',
        },
        surface: {
          DEFAULT: '#1E2635',
          hover: '#252D3F',
          active: '#2D3548',
        },
        primary: {
          50: '#E6F0FF',
          100: '#CCE1FF',
          200: '#99C3FF',
          300: '#66A5FF',
          400: '#3387FF',
          500: '#0069FF',
          600: '#0054CC',
          700: '#003F99',
          800: '#002A66',
          900: '#001533',
        },
        accent: {
          blue: '#0069FF',
          purple: '#7C3AED',
          cyan: '#06B6D4',
          green: '#10B981',
          amber: '#F59E0B',
          red: '#EF4444',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
          tertiary: '#94A3B8',
          muted: '#64748B',
        },
        border: {
          DEFAULT: '#2D3548',
          light: '#374151',
          heavy: '#4B5563',
        },
      },
      fontFamily: {
        heading: ['"IBM Plex Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 105, 255, 0.1)',
        'glass-lg': '0 16px 48px 0 rgba(0, 105, 255, 0.15)',
        'inner-glass': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
      },
    },
  },
  plugins: [],
}
