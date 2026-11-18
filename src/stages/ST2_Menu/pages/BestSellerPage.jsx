import { DRINKS } from "../data/drinks.js";
import { ArrowLeft } from "lucide-react";
import MenuBackground from "../components/MenuBackground/MenuBackground.jsx";

// Dữ liệu tạm thời của 3 món yêu thích
const favoriteDrinks = [
  {
    id: "trend-1",
    name: "Strawberry Matcha",
    image: "/images/ST2/banner/best-seller-1.png",
    color: "#F8DBDB",
  },
  {
    id: "coffee-2",
    name: "Signature Coffee",
    image: "/images/ST2/banner/best-seller-3.png",
    color: "#EBD6BC",
  },
  {
    id: "fruit-1",
    name: "Peach Tea",
    image: "/images/ST2/banner/best-seller-2.png",
    color: "#F8DEC4",
  },
];

function BestSellerPage({ onBack, onSelectDrink }) {
  return (
    <section
      className="
        relative isolate
        min-h-[100svh] w-full
        px-5 pt-28 pb-6
      "
    >
      {/* Background của trang */}
      <MenuBackground />

      {/* Nội dung trang Best Seller */}
      <div
        className="
        st2-page-enter
        relative z-10 mx-auto max-w-6xl
        "
      >
        {/* Nút quay lại Menu */}
        <button
          type="button"
          onClick={onBack}
          className="
            flex items-center gap-2
            rounded-xl bg-white/60
            px-4 py-2 text-[#6B4F3A]
            transition-all duration-300
            hover:bg-white
            hover:-translate-x-1
          "
        >
          <ArrowLeft size={20} />
          Quay lại Menu
        </button>

        {/* Tiêu đề */}
        <h1
          className="
            mt-4 text-center
            font-handwritten
            text-4xl font-bold
            text-[#6B4F3A]
            lg:text-5xl
          "
        >
          Signature Favorites
        </h1>

        <p className="mt-2 text-center text-[#947456]">
          Những hương vị được yêu thích nhất
        </p>

        {/* Danh sách đồ uống */}
        <div
          className="
            mt-8 grid grid-cols-1
            gap-6 sm:grid-cols-3
          "
        >
          {favoriteDrinks.map((drink) => (
            <button
              key={drink.id}
              type="button"
              onClick={(event) =>
                onSelectDrink?.(DRINKS.find((item) => item.id === drink.id), event.currentTarget)
              }
              style={{
                backgroundColor: drink.color,
              }}
              className="
                 group overflow-hidden
                 rounded-2xl shadow-md
                cursor-pointer

                transition-all duration-500 ease-out

                hover:-translate-y-2
                hover:scale-[1.03]
                hover:shadow-xl

                active:scale-[0.98]
                "
            >
              {/* Hình ảnh đồ uống */}
              <div className="overflow-hidden">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="
                    h-[220px] w-full
                    object-cover
                    transition-transform duration-700
                    group-hover:scale-105
                  "
                />
              </div>

              {/* Tên đồ uống */}
              <h2
                className="
                  py-4 font-handwritten
                  text-3xl font-bold
                  text-[#6B4F3A]
                "
              >
                {drink.name}
              </h2>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BestSellerPage;
