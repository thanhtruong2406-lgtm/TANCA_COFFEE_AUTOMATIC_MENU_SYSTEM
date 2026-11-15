import { motion, useReducedMotion } from "motion/react";

// Đường dẫn tài nguyên riêng của mèo và quầy cà phê
const CAT_IMAGE = "/images/ST1/home/tanca-mascot.png";
const STALL_IMAGE = "/images/ST1/home/coffee-stall.png";

// Component quản lý khu vực mascot bên phải trang Home
// Nhận sự kiện mở chatbot từ component cha
function CatMascot({ onOpenChat }) {
  // Hỗ trợ thiết bị sử dụng chế độ giảm chuyển động
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : 0.3,
        ease: "easeOut",
      }}
      className="
        pointer-events-none absolute z-20
        bottom-[5%] right-[1%]
        hidden w-[29%]
        lg:block
        "
    >
      {/* Bóng khuếch tán chung trên mặt bàn */}
      <div
        aria-hidden="true"
        className="
    absolute -bottom-[1%] right-[3%] z-0
    h-[10%] w-[90%]
    rounded-[50%]
    bg-[#492B16]/30
    blur-[12px]
  "
      />

      {/* Bóng tiếp xúc dưới chân quầy cà phê */}
      <div
        aria-hidden="true"
        className="
    absolute bottom-[3%] right-[7%] z-0
    h-[5%] w-[65%]
    rounded-[50%]
    bg-[#38200F]/45
    blur-[5px]
  "
      />

      {/* Bóng tiếp xúc riêng dưới chân mèo */}
      <div
        aria-hidden="true"
        className="
    absolute bottom-0 left-[12%] z-10
    h-[4%] w-[42%]
    rounded-[50%]
    bg-[#38200F]/40
    blur-[5px]
  "
      />

      {/* Layer 1: Quầy cà phê nằm phía sau mèo */}
      <img
        src={STALL_IMAGE}
        alt="Quầy cà phê TANCA"
        className="
          relative z-10 ml-auto
          h-auto w-[85%]
          select-none object-contain
        "
        draggable={false}
        // Bóng đổ nhẹ về phía bên phải theo hướng ánh sáng
        style={{
          filter: "drop-shadow(8px 6px 6px rgba(60, 35, 18, 0.25))",
        }}
      />

      {/* Layer 2: Mèo TANCA đứng phía trước quầy */}
      
{/* Nút tương tác với mèo TANCA */}
<motion.button
  type="button"
  onClick={onOpenChat}
  aria-label="Trò chuyện với mèo TANCA"
  animate={{
    rotate: reduceMotion ? 0 : [0, -3, 0, 3, 0],
  }}
  transition={{
    duration: 3,
    repeat: reduceMotion ? 0 : Infinity,
    ease: "easeInOut",
  }}
  className="
    pointer-events-auto cursor-pointer
    absolute bottom-0 left-[-3%] z-20
    w-[70%] origin-bottom
  "
>
  {/* Giữ nguyên hình ảnh và bóng đổ của mèo */}
  <img
    src={CAT_IMAGE}
    alt="Mèo TANCA vẫy tay chào khách"
    className="
      h-auto w-full select-none object-contain
      drop-shadow-[8px_6px_7px_rgba(60,35,18,0.25)]
    "
    draggable={false}
  />
</motion.button>
    </motion.div>
  );
}

export default CatMascot;
