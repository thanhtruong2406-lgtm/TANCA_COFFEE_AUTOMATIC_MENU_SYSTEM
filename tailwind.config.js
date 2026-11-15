/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      // Khai báo màu sắc chủ đạo của TANCA COFFEE
      colors: {
        beige: "#F5EBDD",
        brown: "#6B4F3A",
      },

      // Bổ sung font chữ viết tay dành cho tiêu đề Home
      // Không ghi đè các font mặc định của Tailwind
      fontFamily: {
        handwritten: ['"Dancing Script"', "cursive"],
      },
    },
  },

  plugins: [],
};
