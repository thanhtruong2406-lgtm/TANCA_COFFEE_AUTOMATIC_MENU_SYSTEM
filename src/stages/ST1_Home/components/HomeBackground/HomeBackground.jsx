
// Đường dẫn ảnh nền của trang Home
const BACKGROUND_IMAGE = "public/images/ST1/intro/ST1_Home_BG.png";

// Component chịu trách nhiệm hiển thị background
function HomeBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Background phủ toàn bộ màn hình */}
      <img
        src={BACKGROUND_IMAGE}
        alt=""
        draggable={false}
        className="
          h-full w-full select-none
          object-cover
          object-[35%_center]
          md:object-center
        "
        fetchPriority="high"
      />
    </div>
  );
}

export default HomeBackground;
