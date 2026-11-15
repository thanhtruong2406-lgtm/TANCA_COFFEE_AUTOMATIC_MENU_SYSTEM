
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X, Send } from "lucide-react";

// Các lựa chọn nhanh dành cho khách hàng
const QUICK_OPTIONS = [
  "Cà phê",
  "Matcha",
  "Trà trái cây",
  "Detox",
];

// Component hiển thị cửa sổ hội thoại
function ChatWindow({
  messages,
  input,
  setInput,
  sendMessage,
  onClose,
}) {
  const messagesEndRef = useRef(null);

  // Tự động cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      block: "nearest",
    });
  }, [messages]);

  // Xử lý sự kiện gửi tin nhắn từ form
  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={{ duration: 0.25 }}
      aria-label="TANCA Assistant"
      className="
        absolute bottom-4 right-4 z-50
        flex w-[calc(100%-2rem)] max-w-[360px]
        h-[480px] max-h-[75svh]
        flex-col overflow-hidden rounded-3xl
        border border-brown/20
        bg-[#FFF8ED] shadow-2xl
        sm:bottom-6 sm:right-6
      "
    >
      {/* HEADER CỦA CHATBOT */}
      <div className="flex shrink-0 items-center gap-3 bg-brown p-4 text-white">
        <img
          src="/images/ST1/home/tanca-mascot.png"
          alt=""
          className="
            h-12 w-12 rounded-full
            bg-beige object-contain p-1
          "
        />

        <div className="flex-1">
          <h2 className="font-bold">
            TANCA Assistant
          </h2>

          <p className="text-xs text-white/80">
            Trợ lý đồ uống của bạn
          </p>
        </div>

        {/* Nút đóng khung chat */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng chatbot"
          className="rounded-full p-2 hover:bg-white/20"
        >
          <X size={20} />
        </button>
      </div>

      {/* KHU VỰC HIỂN THỊ TIN NHẮN */}
      <div
        aria-live="polite"
        className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`
                max-w-[85%] rounded-2xl
                px-4 py-3 text-sm leading-relaxed
                ${
                  message.role === "user"
                    ? "bg-brown text-white"
                    : "bg-[#EEDFCB] text-brown"
                }
              `}
            >
              {message.text}
            </div>
          </div>
        ))}

        {/* Điểm neo để tự động cuộn tin nhắn */}
        <div ref={messagesEndRef} />
      </div>

      {/* CÁC NÚT GỢI Ý NHANH */}
      <div className="flex shrink-0 flex-wrap gap-2 px-3 pb-3">
        {QUICK_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => sendMessage(option)}
            className="
              rounded-full border border-brown/30
              px-3 py-1.5 text-xs text-brown
              transition-colors
              hover:bg-brown hover:text-white
            "
          >
            {option}
          </button>
        ))}
      </div>

      {/* FORM NHẬP VÀ GỬI TIN NHẮN */}
      <form
        onSubmit={handleSubmit}
        className="
          flex shrink-0 items-center gap-2
          border-t border-brown/10 p-3
        "
      >
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Nhập tin nhắn..."
          aria-label="Nội dung tin nhắn"
          className="
            min-w-0 flex-1 rounded-full
            bg-beige px-4 py-3 text-sm
            text-brown outline-none
            focus:ring-1 focus:ring-brown
          "
        />

        <button
          type="submit"
          disabled={!input.trim()}
          aria-label="Gửi tin nhắn"
          className="
            rounded-full bg-brown p-3 text-white
            transition-colors hover:bg-[#4B3528]
            disabled:opacity-40
          "
        >
          <Send size={18} />
        </button>
      </form>
    </motion.section>
  );
}

export default ChatWindow;
