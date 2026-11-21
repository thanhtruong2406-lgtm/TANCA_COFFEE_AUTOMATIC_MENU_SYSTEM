import { useEffect, useState } from "react";

function DrinkImage({ drink, panelBg = "#E6ECD8", activeImage = null, slideImages = null }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const images =
    slideImages?.length > 1
      ? slideImages
      : [activeImage || drink?.image].filter(Boolean);

  const matchedIndex = activeImage ? images.indexOf(activeImage) : -1;
  const shouldAutoSlide = !activeImage && images.length > 1;

  useEffect(() => {
    if (!shouldAutoSlide) return undefined;

    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % images.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [shouldAutoSlide, images.length]);

  if (!drink) return null;

  const displayIndex =
    matchedIndex >= 0 ? matchedIndex : slideIndex % images.length;

  return (
    <div
      className="flex w-full flex-col items-center justify-between rounded-2xl p-5 sm:p-7"
      style={{ backgroundColor: panelBg }}
    >
      <div className="relative w-full overflow-hidden rounded-xl shadow-md">
        {images.length > 1 ? (
          <>
            <div
              className="flex w-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${displayIndex * 100}%)` }}
            >
              {images.map((src, index) => (
                <div key={src} className="w-full shrink-0">
                  <img
                    src={src}
                    alt={`${drink.name} ${index + 1}`}
                    draggable={false}
                    className="aspect-[4/4.3] h-full w-full select-none object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/25 px-2.5 py-1 backdrop-blur-xs">
              {images.map((src, index) => (
                <span
                  key={src}
                  className={`h-1.5 rounded-full transition-all ${
                    index === displayIndex ? "w-5 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        ) : (
          <img
            src={images[0]}
            alt={drink.name}
            draggable={false}
            className="aspect-[4/4.3] h-full w-full select-none object-cover"
          />
        )}
      </div>

      <p className="mt-4 text-center text-lg font-semibold italic tracking-wide text-brown sm:text-xl">
        {drink.name}
      </p>
    </div>
  );
}

export default DrinkImage;
