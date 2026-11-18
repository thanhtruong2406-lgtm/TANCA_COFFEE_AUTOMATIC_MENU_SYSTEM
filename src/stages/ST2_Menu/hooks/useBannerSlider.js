import { useState, useEffect } from "react";

function useBannerSlider(totalSlides, delay = 5000) {
  // Vị trí hiện tại của slider
  const [slideIndex, setSlideIndex] = useState(0);

  // Bật hoặc tắt hiệu ứng chuyển động
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Kiểm tra trạng thái hover
  const [isHovered, setIsHovered] = useState(false);

  // Vị trí thực tế dùng cho các dấu chấm
  const currentIndex = slideIndex % totalSlides;

  // Tự động chuyển ảnh sau 5 giây
  useEffect(() => {
    if (
      isHovered ||
      totalSlides <= 1 ||
      slideIndex === totalSlides
    ) return;

    const timer = setTimeout(() => {
      setIsTransitioning(true);
      setSlideIndex((prev) => prev + 1);
    }, delay);

    // Dọn dẹp timer cũ
    return () => clearTimeout(timer);
  }, [slideIndex, isHovered, totalSlides, delay]);

  // Quay về ảnh đầu tiên khi chạy hết slider
  const handleTransitionEnd = () => {
    if (slideIndex === totalSlides) {
      setIsTransitioning(false);
      setSlideIndex(0);
    }
  };

  // Chuyển ảnh khi click vào dấu chấm
  const goToSlide = (index) => {
    if (index < 0 || index >= totalSlides) return;

    setIsTransitioning(true);
    setSlideIndex(index);
  };

  return {
    slideIndex,
    currentIndex,
    isTransitioning,
    setIsHovered,
    handleTransitionEnd,
    goToSlide,
  };
}

export default useBannerSlider;