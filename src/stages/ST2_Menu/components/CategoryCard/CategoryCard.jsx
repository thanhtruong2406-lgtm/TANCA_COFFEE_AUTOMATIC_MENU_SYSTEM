import { Coffee, Leaf, Citrus, Sprout, Flame, CakeSlice } from "lucide-react";

// Icon tương ứng với từng danh mục
const categoryIcons = {
  coffee: Coffee,
  matcha: Leaf,
  "fruit-tea": Citrus,
  detox: Sprout,
  "hot-trend": Flame,
  bakery: CakeSlice,
};

// Màu nền riêng của mỗi nút
const categoryColors = {
  coffee: "#D1B597",
  matcha: "#BDC99E",
  "fruit-tea": "#EAC19B",
  detox: "#C1D4C1",
  "hot-trend": "#E8C0C1",
  bakery: "#EEDAB5",
};

function CategoryCard({ category, onClick }) {
  // Lấy icon dựa trên ID danh mục
  const Icon = categoryIcons[category.id] || Coffee;

  return (
    <button
      type="button"
      onClick={(event) => onClick?.(category.id, event.currentTarget)}
      style={{
        backgroundColor: categoryColors[category.id],
      }}
      className="
        group relative
        flex flex-col items-center justify-center

        h-[90px] w-full
        sm:h-[105px]
        lg:h-[120px]

        gap-2 rounded-2xl
        text-[#6B4F3A]
        cursor-pointer

        transition-all duration-500 ease-out

        hover:-translate-y-1.5
        hover:scale-105
        hover:shadow-xl

        active:scale-95
      "
    >
      {/* Icon danh mục */}
      <Icon
        size={28}
        strokeWidth={1.7}
        className="
          transition-transform duration-500
          group-hover:scale-110
        "
      />

      {/* Tên danh mục sử dụng font viết tay */}
      <h3
        className="
          font-handwritten
          text-lg font-bold
          lg:text-[22px]
        "
      >
        {category.name}
      </h3>
    </button>
  );
}

export default CategoryCard;
