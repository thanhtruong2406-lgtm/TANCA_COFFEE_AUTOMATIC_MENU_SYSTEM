import { useEffect, useState } from "react";
import { motion } from "motion/react";

const formatPrice = (value) => `${value.toLocaleString("vi-VN")} đ`;

function DrinkCard({ drink, accentColor = "#6B4F3A", isSelected, onSelect }) {
  const slideImages = drink.slideImages?.length ? drink.slideImages : null;
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    if (!slideImages || slideImages.length <= 1) return undefined;

    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideImages.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [slideImages]);

  return (
    <motion.button
      type="button"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onClick={(event) => onSelect?.(drink, event.currentTarget)}
      className={`group flex cursor-pointer flex-col overflow-hidden rounded-3xl border bg-[#FFFBF4] text-left shadow-md transition-all ${
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
        {slideImages ? (
          <>
            <div
              className="flex h-full w-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${slideIndex * 100}%)` }}
            >
              {slideImages.map((src, index) => (
                <div
                  key={src}
                  aria-hidden={index !== slideIndex}
                  className="h-full w-full shrink-0"
                >
                  <img
                    src={src}
                    alt={`${drink.name} ${index + 1}`}
                    draggable={false}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/25 px-2 py-1 backdrop-blur-xs">
              {slideImages.map((src, index) => (
                <span
                  key={src}
                  className={`h-1.5 rounded-full transition-all ${
                    index === slideIndex ? "w-4 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <img
            src={drink.image}
            alt={drink.name}
            draggable={false}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {drink.badge && (
          <span
            className="absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-bold text-white shadow-sm"
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
