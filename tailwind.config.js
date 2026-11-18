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

      // Bổ sung font chữ viết tay dành cho tiêu đề Home và font serif hỗ trợ đầy đủ tiếng Việt
      fontFamily: {
        handwritten: ['"Dancing Script"', "cursive"],
        serif: ['"Lora"', '"Times New Roman"', "serif"],
      },
    },
  },

  plugins: [],
};
