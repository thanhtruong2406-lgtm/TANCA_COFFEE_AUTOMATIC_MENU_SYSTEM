import useBannerSlider from "../../hooks/useBannerSlider.js";

// Danh sách ảnh Banner
const banners = [
  {
    id: 1,
    image: "/images/ST2/banner/best-seller-1.png",
    name: "Strawberry Matcha",
  },
  {
    id: 2,
    image: "/images/ST2/banner/best-seller-2.png",
    name: "Peach Tea",
  },
  {
    id: 3,
    image: "/images/ST2/banner/best-seller-3.png",
    name: "Signature Coffee",
  },
];

const slides = [...banners, { ...banners[0], id: "clone" }];

function BestSellerBanner({ onClick }) {
  // Lấy logic điều khiển từ Custom Hook
  const {
    currentIndex,
    slideIndex,
    isTransitioning,
    handleTransitionEnd,
    setIsHovered,
    goToSlide,
  } = useBannerSlider(banners.length, 2000);

  return (
    <div className="mx-auto w-full max-w-[950px]">

      {/* Khu vực hiển thị Banner */}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Khám phá đồ uống yêu thích"
        className="
          group relative block w-full
          aspect-[1900/680]
          overflow-hidden rounded-2xl
          cursor-pointer shadow-lg

          transition-all duration-[1500ms] ease-out

          hover:-translate-y-1
          hover:shadow-2xl
          active:scale-[0.98]
        "
      >
        {/* Dải ảnh ngang, có bản sao ảnh đầu để lặp liên tục */}
        <div
          className={`flex h-full w-full ${isTransitioning ? "transition-transform duration-[1500ms] ease-in-out" : "transition-none"}`}
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
          onTransitionEnd={(event) => {
            if (event.target === event.currentTarget && event.propertyName === "transform") {
              handleTransitionEnd();
            }
          }}
        >
          {slides.map((banner, index) => (
            <div key={banner.id} aria-hidden={slideIndex !== index} className="h-full w-full shrink-0 overflow-hidden">
              <img src={banner.image} alt={banner.name} draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
            </div>
          ))}
        </div>
      </button>

      {/* Các dấu chấm điều hướng */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {banners.map((banner, index) => (
          <button
            key={banner.id}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Hiển thị banner ${index + 1}`}
            aria-current={currentIndex === index}
            className={`
              h-2 rounded-full

              transition-all duration-300

              ${
                currentIndex === index
                  ? "w-7 bg-[#6B4F3A]"
                  : "w-2 bg-[#D4B99C] hover:bg-[#A08060]"
              }
            `}
          />
        ))}
      </div>

    </div>
  );
}

export default BestSellerBanner;