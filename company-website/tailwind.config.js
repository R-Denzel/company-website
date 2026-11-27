/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Two brand colours, measured from the logo: its navy ground and its azure mark.
        ink: {
          DEFAULT: '#090425',
          soft: '#140B45',
          line: '#2A2266',
        },
        brand: {
          DEFAULT: '#3799F9',
          light: '#77CEFB',
          pale: '#D1E7FB',
          // The same blue, deepened for text on white.
          deep: '#1F5FD0',
          // The light behind the mark.
          glow: '#1525B7',
        },
        // Neutral greys for grounds and supporting elements.
        paper: '#FFFFFF',
        mist: '#F4F5F7',
        line: '#E2E4E9',
        muted: {
          DEFAULT: '#50535D',
          invert: '#C2C5D6',
        },
        danger: '#A5261B',
        // Voltway sample shop only.
        violet: { DEFAULT: '#6440F5', deep: '#4B2CCB', soft: '#C8BAFF' },
        coral: { DEFAULT: '#FF7A5C', soft: '#FFC3B3' },
        // Karafuu sample shop only.
        k: {
          night: '#0B0807',
          ivory: '#F7F2EA',
          gold: '#B89255',
          bronze: '#856531',
          line: '#E8DFD0',
          smoke: '#6B6259',
        },
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'system-ui', 'sans-serif'],
        // Headings: the closest match to the lettering in the logo.
        display: ['Fira Sans', 'Hanken Grotesk', 'system-ui', 'sans-serif'],
        parfum: ['Jost', 'Century Gothic', 'sans-serif'],
      },
      fontSize: {
        // One body size, and two headline sizes for the whole company site.
        base: ['1.0625rem', { lineHeight: '1.7' }],
        heading: ['clamp(2.125rem, 4.4vw, 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '600' }],
        subheading: ['clamp(1.25rem, 1.7vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        // Voltway sample shop only.
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
