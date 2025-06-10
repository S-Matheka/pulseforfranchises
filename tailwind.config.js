/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4f8edb',
          dark: '#3a7fd1'
        },
        dark: {
          DEFAULT: '#0f172a',
          lighter: '#1e293b'
        }
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.03)'
      },
      backdropFilter: {
        'glass': 'blur(12px)'
      },
      animation: {
        'gradient': 'gradient 2s ease infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '200% 0' },
          '50%': { backgroundPosition: '-200% 0' }
        }
      },
      fontSize: {
        'xxs': '0.65rem'
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        'glass-hover': '0 12px 40px 0 rgba(0, 0, 0, 0.3)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};