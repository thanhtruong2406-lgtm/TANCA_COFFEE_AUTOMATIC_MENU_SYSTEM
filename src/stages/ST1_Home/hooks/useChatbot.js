
import { useState } from "react";

// Tin nhắn mặc định khi khách hàng mở chatbot
const INITIAL_MESSAGES = [
  {
    role: "assistant",
    text: "Konnichiwa! 🐾 Hôm nay bạn muốn uống gì nào?",
  },
];

// Hàm tạo phản hồi mẫu dựa trên nội dung khách hàng nhập
function getReply(message) {
  const text = message.toLowerCase();

  if (text.includes("matcha")) {
    return "Mình gợi ý Matcha Latte, thơm vị trà xanh và béo nhẹ nhé! 🍵";
  }

  if (text.includes("cà phê") || text.includes("coffee")) {
    return "Bạn có thể thử cà phê sữa đá, thơm và đậm vị nhé! ☕";
  }

  if (text.includes("trà")) {
    return "Bạn thích trà đào hay trà trái cây thanh mát? 🍑";
  }

  if (text.includes("detox")) {
    return "Bạn có thể khám phá các món Detox trong Menu nhé! 🌿";
  }

  return "Bạn thích đồ uống đậm vị, béo nhẹ hay thanh mát?";
}

// Custom Hook quản lý toàn bộ logic hội thoại
function useChatbot() {
  // Danh sách tin nhắn giữa khách hàng và chatbot
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  // Nội dung đang được nhập
  const [input, setInput] = useState("");

  // Gửi tin nhắn và tạo phản hồi mẫu
  const sendMessage = (value = input) => {
    const message = value.trim();

    // Không gửi tin nhắn rỗng
    if (!message) return;

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: message,
      },
      {
        role: "assistant",
        text: getReply(message),
      },
    ]);

    // Xóa nội dung sau khi gửi
    setInput("");
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
  };
}

export default useChatbot;
