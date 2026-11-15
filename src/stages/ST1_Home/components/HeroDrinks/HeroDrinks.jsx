import { motion, useReducedMotion } from "motion/react";

// Đường dẫn ảnh hai ly nước cùng khay gỗ
const DRINK_IMAGE = "/images/ST1/home/hero-drinks.png";

function HeroDrinks() {
  // Kiểm tra chế độ giảm chuyển động của thiết bị
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      // Hiệu ứng xuất hiện của cụm đồ uống
      initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        delay: reduceMotion ? 0 : 0.2,
        ease: "easeOut",
      }}
      className="
        pointer-events-none absolute z-10
        bottom-[5%] left-1/2
        w-[65%] -translate-x-1/2

        sm:w-[50%]

        lg:bottom-[5%]
        lg:left-[57%]
        lg:w-[43%]

        xl:w-[44%]
      "
      style={{ x: "-50%" }}
    >
      {/* Bóng đổ khuếch tán trên mặt bàn gỗ */}
      <div
        aria-hidden="true"
        className="
    absolute bottom-[3%] left-[54%]
    h-[9%] w-[76%]
    -translate-x-1/2
    rounded-[50%]
    bg-[#492B16]/[0.7] blur-[15px]
  "
      />

      {/* Bóng tiếp xúc trực tiếp giữa khay gỗ và mặt bàn */}
      <div
        aria-hidden="true"
        className="
    absolute bottom-[5%] left-1/2
    h-[4%] w-[70%]
    -translate-x-1/2
    rounded-[50%]
    bg-[#38200F]/50
    blur-[5px]
  "
      />
      {/* Hình ảnh đồ uống nằm phía trên lớp bóng */}
      {/* Hình ảnh đồ uống có bóng đổ nhẹ theo hướng ánh sáng */}
      <img
        src={DRINK_IMAGE}
        alt="Cà phê sữa đá và Matcha Latte trên khay gỗ"
        className="
    relative z-10 h-auto w-full
    select-none object-contain
  "
        style={{
          filter: "drop-shadow(12px 8px 10px rgba(60, 35, 18, 0.25))",
        }}
        draggable={false}
      />
    </motion.div>
  );
}

export default HeroDrinks;
