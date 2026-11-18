import { motion } from "motion/react";

const formatPrice = (value) => `${value.toLocaleString("vi-VN")} đ`;

function DrinkCard({ drink, accentColor = "#6B4F3A", isSelected, onSelect }) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onClick={(event) => onSelect?.(drink, event.currentTarget)}
      className={`group flex text-left cursor-pointer flex-col overflow-hidden rounded-3xl border bg-[#FFFBF4] shadow-md transition-all ${
        isSelected
          ? "ring-2 shadow-xl"
          : "border-brown/15 hover:shadow-xl"
      }`}
      style={{
        borderColor: isSelected ? accentColor : undefined,
        "--tw-ring-color": accentColor,
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-beige">
        <img
          src={drink.image}
          alt={drink.name}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {drink.badge && (
          <span
            className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm"
            style={{ backgroundColor: accentColor }}
          >
            {drink.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <h3 className="font-handwritten text-lg font-bold text-brown group-hover:opacity-90">
            {drink.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-brown/70">
            {drink.story}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-brown/10 pt-3.5">
          <span
            className="text-base font-extrabold"
            style={{ color: accentColor }}
          >
            {formatPrice(drink.price)}
          </span>
          <span
            className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity group-hover:opacity-90"
            style={{ backgroundColor: accentColor }}
          >
            Tùy chọn món
          </span>
        </div>
      </div>
    </motion.button>
  );
}

export default DrinkCard;
