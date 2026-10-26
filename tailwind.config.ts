import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0C0383',
        'dark-blue': '#0C0383',
        'brand-pink': '#FEA7EC',
        'sky-blue': '#67AFFF',
        'glass-white': 'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        aileron: ['var(--font-aileron)', 'Arial Black', 'sans-serif'],
        century: ['var(--font-century)', 'Trebuchet MS', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-hero':
          'linear-gradient(180deg, rgba(12,3,131,0.92) 0%, rgba(103,175,255,0.75) 100%)',
        'gradient-section':
          'linear-gradient(180deg, #0C0383 0%, #2a1aaa 50%, #67AFFF 100%)',
        'gradient-cta': 'linear-gradient(135deg, #FEA7EC 0%, #F58BDF 100%)',
      },
      boxShadow: {
        pink: '0 0 30px rgba(254,167,236,0.4), 0 0 60px rgba(254,167,236,0.2)',
        blue: '0 0 40px rgba(103,175,255,0.3)',
        glass: '0 8px 32px rgba(12,3,131,0.25)',
      },
      backdropBlur: {
        glass: '16px',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-cta': 'pulse-cta 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-cta': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(254,167,236,0.6)' },
          '50%': { boxShadow: '0 0 0 20px rgba(254,167,236,0)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
