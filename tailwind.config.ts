import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
        // 1970s Retro Palette
        'burnt-orange': {
          DEFAULT: '#CC5500',
          light: '#FF6B1A',
          dark: '#A34400',
        },
        mustard: {
          DEFAULT: '#E1AD01',
          light: '#F5C842',
          dark: '#B89200',
        },
        avocado: {
          DEFAULT: '#568203',
          light: '#7CB342',
          dark: '#3D5C02',
        },
        cream: {
          DEFAULT: '#F5EEDC',
          dark: '#E8DCC8',
        },
        walnut: {
          DEFAULT: '#3E2614',
          light: '#5C3D2E',
          dark: '#2A1A0D',
        },
        bronze: '#8B6914',
        teak: '#9B7653',
        'amber-glow': '#FFB347',
        'vintage-gold': '#C9A227',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-retro-serif)', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['var(--font-typewriter)', 'Courier Prime', 'Courier New', 'monospace'],
        retro: ['var(--font-retro-serif)', 'Georgia', 'Times New Roman', 'serif'],
        typewriter: ['var(--font-typewriter)', 'Courier Prime', 'Courier New', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'vu-meter': 'vu-meter 0.3s ease-in-out infinite',
        'tape-spin': 'tape-spin 2s linear infinite',
        'static-noise': 'static-noise 0.5s steps(10) infinite',
        'slide-up': 'slide-up 0.4s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 5px rgba(204, 85, 0, 0.5), 0 0 10px rgba(204, 85, 0, 0.3)' },
          '50%': { boxShadow: '0 0 15px rgba(204, 85, 0, 0.8), 0 0 25px rgba(204, 85, 0, 0.5)' },
        },
        'vu-meter': {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'tape-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'static-noise': {
          '0%, 100%': { backgroundPosition: '0 0' },
          '10%': { backgroundPosition: '-5% -10%' },
          '20%': { backgroundPosition: '-15% 5%' },
          '30%': { backgroundPosition: '7% -25%' },
          '40%': { backgroundPosition: '-5% 25%' },
          '50%': { backgroundPosition: '-15% 10%' },
          '60%': { backgroundPosition: '15% 0%' },
          '70%': { backgroundPosition: '0% 15%' },
          '80%': { backgroundPosition: '3% 35%' },
          '90%': { backgroundPosition: '-10% 10%' },
        },
        'slide-up': {
          from: { transform: 'translateY(100%)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      boxShadow: {
        'retro': '0 4px 6px -1px rgba(62, 38, 20, 0.3), 0 2px 4px -1px rgba(62, 38, 20, 0.2)',
        'retro-lg': '0 10px 15px -3px rgba(62, 38, 20, 0.3), 0 4px 6px -2px rgba(62, 38, 20, 0.2)',
        'glow-orange': '0 0 10px rgba(204, 85, 0, 0.5), 0 0 20px rgba(204, 85, 0, 0.3)',
        'glow-amber': '0 0 10px rgba(255, 179, 71, 0.5), 0 0 20px rgba(255, 179, 71, 0.3)',
        'inset-retro': 'inset 0 2px 4px 0 rgba(62, 38, 20, 0.2)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
