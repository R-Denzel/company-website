/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        mist: '#F4F2FC',
        line: '#E5E1F3',
        ink: {
          DEFAULT: '#140F2E',
          soft: '#221A48',
          line: '#352C63',
        },
        muted: {
          DEFAULT: '#4E4970',
          invert: '#BDB6DE',
        },
        violet: {
          DEFAULT: '#6440F5',
          deep: '#4B2CCB',
          soft: '#C8BAFF',
        },
        coral: {
          DEFAULT: '#FF7A5C',
          soft: '#FFC3B3',
        },
        gold: '#D4AF37',
        danger: '#A5261B',
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        statement: ['clamp(2.25rem, 4.6vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.035em' }],
        title: ['clamp(1.9rem, 3.4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        row: ['clamp(1.4rem, 2.6vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        lead: ['clamp(1.125rem, 1.5vw, 1.375rem)', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
      },
      transitionTimingFunction: {
        soft: 'cubic-bezier(0.25, 0.74, 0.22, 0.99)',
      },
    },
  },
  plugins: [],
};
