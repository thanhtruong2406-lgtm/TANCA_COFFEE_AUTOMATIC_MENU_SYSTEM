// Đường dẫn ảnh nền của trang Menu chính
const BACKGROUND_IMAGE =
  "/images/ST2/backgrounds/menu-background.png";

// Component chịu trách nhiệm hiển thị background ST2
function MenuBackground() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none absolute inset-0
        z-0 overflow-hidden bg-[#F5EBDD]
      "
    >
      {/* Ảnh nền phủ toàn bộ trang Menu */}
      <img
        src={BACKGROUND_IMAGE}
        alt=""
        draggable={false}
        className="
          h-full w-full
          select-none object-cover object-center
        "
        onError={(event) => {
          // Giữ nền beige nếu ảnh chưa được chuẩn bị
          event.currentTarget.style.display = "none";
        }}
      />

      {/* Lớp màu nhẹ giúp nội dung dễ đọc hơn */}
      <div
        className="absolute inset-0 bg-[#F5EBDD]/20"
      />
    </div>
  );
}

export default MenuBackground;