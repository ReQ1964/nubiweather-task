/** @type {import("tailwindcss").Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        spinFast: {
          '100%': { transform: 'rotate(360deg)' },
        },
        skeletonLoading: {
          '0%': { backgroundColor: 'hsl(200, 20%, 80%)' },
          '100%': { backgroundColor: 'hsl(200, 10%, 95%)' },
        },
      },
      animation: {
        spinFast: 'spinFast 0.75s linear infinite',
        skeletonLoading: 'skeletonLoading 1s linear infinite alternate',
      },
    },
  },
};
