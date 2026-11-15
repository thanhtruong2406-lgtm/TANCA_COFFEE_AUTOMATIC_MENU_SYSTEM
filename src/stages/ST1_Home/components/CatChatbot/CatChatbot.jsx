
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";

import CatMascot from "../CatMascot/CatMascot.jsx";
import ChatWindow from "./ChatWindow.jsx";
import useChatbot from "../../hooks/useChatbot.js";

// Nội dung bong bóng chào khách
const GREETING =
  "Mình có thể giúp bạn khám phá menu, gợi ý đồ uống phù hợp và hỗ trợ đặt món nhé! ♡";

function CatChatbot() {
  // Quản lý trạng thái đóng/mở cửa sổ chat
  const [isOpen, setIsOpen] = useState(false);

  // Nội dung hiển thị trong hiệu ứng đánh chữ
  const [typedText, setTypedText] = useState("");

  const reduceMotion = useReducedMotion();

  // Lấy dữ liệu và các hàm xử lý từ custom hook
  const chatbot = useChatbot();

  // Hiệu ứng đánh chữ tự động khi khách vào Home
  useEffect(() => {
    if (reduceMotion) {
      setTypedText(GREETING);
      return;
    }

    let index = 0;

    const timer = setInterval(() => {
      index += 1;
      setTypedText(GREETING.slice(0, index));

      // Dừng khi đã hiển thị hết nội dung
      if (index >= GREETING.length) {
        clearInterval(timer);
      }
    }, 25);

    // Dọn dẹp timer khi component bị hủy
    return () => clearInterval(timer);
  }, [reduceMotion]);

  return (
    <>
      {/* Giữ nguyên mascot đã chốt, bổ sung sự kiện mở chat */}
      <CatMascot onOpenChat={() => setIsOpen(true)} />

      {/* BONG BÓNG CHÀO KHÁCH TRÊN DESKTOP */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.5,
              delay: reduceMotion ? 0 : 0.4,
            }}
            aria-label="Mở TANCA Assistant"
            className="
              absolute bottom-[54%] right-[5%]
              z-30 hidden w-[260px]
              rounded-[2rem] border border-brown/30
              bg-[#FFF8ED] px-5 py-4
              text-center text-brown shadow-lg
              lg:block xl:w-[300px]
            "
          >
            {/* Tiêu đề chào khách */}
            <p className="font-bold">
              Konnichiwa! 🐾
            </p>

            <p className="mt-1 text-sm font-semibold">
              Mình là TANCA Assistant!
            </p>

            {/* Nội dung có hiệu ứng đánh chữ */}
            <p className="mt-2 text-sm leading-relaxed">
              {typedText}
            </p>

            {/* Phần đuôi bong bóng hướng xuống mèo */}
            <span
              aria-hidden="true"
              className="
                absolute -bottom-[11px] right-[30%]
                h-5 w-5 rotate-45
                border-b border-r border-brown/30
                bg-[#FFF8ED]
              "
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* NÚT MỞ CHATBOT RIÊNG CHO MOBILE */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Mở TANCA Assistant"
          className="
            absolute bottom-4 right-4 z-40
            h-16 w-16 rounded-full
            border-2 border-brown/30
            bg-beige p-1 shadow-lg
            lg:hidden
          "
        >
          <img
            src="/images/ST1/home/tanca-mascot.png"
            alt=""
            className="h-full w-full object-contain"
          />
        </button>
      )}

      {/* CỬA SỔ HỘI THOẠI */}
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            {...chatbot}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default CatChatbot;
