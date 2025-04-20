/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced contrast colors
        'heading': '#111827', // Very dark gray for headings
        'body': '#1F2937',    // Dark gray for body text
        'muted': '#4B5563',   // Medium gray for less important text
        'accent': '#1D4ED8',  // Darker blue for better contrast
        'accent-hover': '#1E40AF', // Even darker blue for hover states
        'card-bg': '#F9FAFB', // Light gray for card backgrounds
      },
    },
  },
  plugins: [],
}