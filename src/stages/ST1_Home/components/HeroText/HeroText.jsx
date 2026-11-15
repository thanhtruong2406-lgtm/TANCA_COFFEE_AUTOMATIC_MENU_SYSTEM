import { ChevronRight } from "lucide-react";

// Tái sử dụng Button của thành viên trong nhóm
import Button from "../../../../components/ButtonStart/ButtonStart.jsx";

// Component hiển thị nội dung giới thiệu thương hiệu
function HeroText({ onExploreMenu }) {
  return (
    <div className="max-w-xl">
      {/* Tiêu đề viết tay theo thiết kế Home đã chốt */}
      <h1
        className="
    relative w-fit
    font-handwritten font-bold text-[#5B3826]
    text-[clamp(2.6rem,5.5vw,6.25rem)]
    leading-[1.05]
    -rotate-3
  "
      >
        {/* Dòng chữ thứ nhất */}
        <span className="block">Một chút</span>

        {/* Dòng thứ hai được dịch nhẹ sang phải */}
        <span className="ml-6 block sm:ml-10">bình yên</span>

        {/* Dòng chữ cuối có kích thước nhỏ hơn */}
        <span className="relative block text-[0.85em]">
          trong từng ngụm.
          {/* Nét gạch trang trí phía dưới tiêu đề */}
          <svg
            viewBox="0 0 200 20"
            aria-hidden="true"
            className="
        absolute -bottom-4 right-0
        h-5 w-[55%]
      "
          >
            <path d="M5 16 Q100 -2 195 5 Q100 6 5 18 Z" fill="#C29A65" />
          </svg>
        </span>
      </h1>

      {/* Đoạn giới thiệu ngắn về TANCA COFFEE */}
      <p className="mt-5 max-w-md text-base leading-7 text-brown/75 sm:text-lg">
        Cà phê, matcha và những hương vị được tạo ra dành riêng cho bạn.
      </p>

      {/* Nút điều hướng đến trang Menu */}
      <Button onClick={onExploreMenu} className="mt-8 gap-2">
        Khám phá Menu
        <ChevronRight size={18} strokeWidth={2.5} />
      </Button>
    </div>
  );
}

export default HeroText;
