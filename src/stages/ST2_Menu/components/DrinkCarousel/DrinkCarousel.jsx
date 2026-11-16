import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import DrinkCard from "../DrinkCard/DrinkCard.jsx";

function DrinkCarousel({
  drinks = [],
  accentColor = "#6B4F3A",
  selectedDrinkId,
  onSelectDrink,
}) {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {drinks.length > 3 && (
        <>
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label="Trượt sang trái"
            className="absolute -left-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-brown/15 bg-[#FFFBF4] text-brown shadow-md transition-transform hover:scale-105 lg:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label="Trượt sang phải"
            className="absolute -right-4 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-brown/15 bg-[#FFFBF4] text-brown shadow-md transition-transform hover:scale-105 lg:flex"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <div
        ref={scrollContainerRef}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {drinks.map((drink) => (
          <DrinkCard
            key={drink.id}
            drink={drink}
            accentColor={accentColor}
            isSelected={selectedDrinkId === drink.id}
            onSelect={onSelectDrink}
          />
        ))}
      </div>
    </div>
  );
}

export default DrinkCarousel;
