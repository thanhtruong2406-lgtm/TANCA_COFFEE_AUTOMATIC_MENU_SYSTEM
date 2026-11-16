import { motion } from "motion/react";

import DrinkCarousel from "../components/DrinkCarousel/DrinkCarousel.jsx";

function CategoryPage({
  categories = [],
  activeCategory,
  onSelectCategory,
  drinks = [],
  selectedDrinkId,
  onSelectDrink,
}) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10">
      {/* DẢI 5 THẺ DANH MỤC CHÍNH (CÀ PHÊ, MATCHA, TRÀ TRÁI CÂY, DETOX, HOT TREND) */}
      <div>
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brown/60">
            TANCA MENU
          </p>
          <h1 className="mt-1 text-3xl font-bold text-brown sm:text-4xl">
            Khám Phá Hương Vị Yêu Thích
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-5 sm:gap-4">
          {categories.map((category) => {
            const isActive = activeCategory?.id === category.id;

            return (
              <motion.button
                key={category.id}
                type="button"
                whileHover={{ y: -4 }}
                onClick={() => onSelectCategory(category.id)}
                className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white text-center shadow-md transition-all ${
                  isActive
                    ? "ring-2 shadow-xl"
                    : "opacity-85 hover:opacity-100 hover:shadow-lg"
                }`}
                style={{
                  "--tw-ring-color": category.accentColor,
                }}
              >
                <div className="aspect-[4/4.2] w-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    draggable={false}
                    className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="py-2.5">
                  <span className="text-sm font-bold text-brown sm:text-base">
                    {category.name}
                  </span>
                </div>

                {/* VẠCH MÀU ĐẶC TRƯNG DƯỚI CHÂN MỖI DANH MỤC */}
                <div
                  className="h-1.5 w-full transition-all"
                  style={{
                    backgroundColor: category.accentColor,
                    opacity: isActive ? 1 : 0.65,
                  }}
                />
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* DANH SÁCH MÓN TRONG DANH MỤC ĐANG CHỌN */}
      <div>
        <div className="mb-5 flex items-end justify-between border-b border-brown/15 pb-3">
          <div>
            <h2
              className="text-2xl font-bold sm:text-3xl"
              style={{ color: activeCategory?.accentColor || "#6B4F3A" }}
            >
              {activeCategory?.name}
            </h2>
            <p className="mt-1 text-sm text-brown/70">
              {activeCategory?.subtitle}
            </p>
          </div>
          <span className="text-xs font-semibold text-brown/60 sm:text-sm">
            {drinks.length} món
          </span>
        </div>

        <DrinkCarousel
          drinks={drinks}
          accentColor={activeCategory?.accentColor}
          selectedDrinkId={selectedDrinkId}
          onSelectDrink={onSelectDrink}
        />
      </div>
    </div>
  );
}

export default CategoryPage;
