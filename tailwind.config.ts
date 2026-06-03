import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#0B008A',
        'dark-blue': '#06004A',
        'neon-green': '#99FF00',
        'sky-blue': '#67AFFF',
        'glass-white': 'rgba(255,255,255,0.07)',
      },
      fontFamily: {
        aileron: ['var(--font-aileron)', 'Arial Black', 'sans-serif'],
        century: ['var(--font-century)', 'Trebuchet MS', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-main':
          'linear-gradient(135deg, #0B008A 0%, #1a0099 40%, #67AFFF 100%)',
        'gradient-hero':
          'linear-gradient(180deg, rgba(11,0,138,0.92) 0%, rgba(103,175,255,0.75) 100%)',
        'gradient-section':
          'linear-gradient(180deg, #0B008A 0%, #2a1aaa 50%, #67AFFF 100%)',
        'gradient-cta': 'linear-gradient(135deg, #99FF00 0%, #7acc00 100%)',
      },
      boxShadow: {
        neon: '0 0 30px rgba(153,255,0,0.4), 0 0 60px rgba(153,255,0,0.2)',
        blue: '0 0 40px rgba(103,175,255,0.3)',
        glass: '0 8px 32px rgba(11,0,138,0.25)',
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
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(153,255,0,0.6)' },
          '50%': { boxShadow: '0 0 0 20px rgba(153,255,0,0)' },
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
