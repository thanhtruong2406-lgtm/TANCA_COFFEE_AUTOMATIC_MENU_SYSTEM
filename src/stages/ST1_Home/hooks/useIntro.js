import { useState } from "react";

// Custom Hook quản lý trạng thái Intro
function useIntro() {
  // Luôn hiển thị Intro khi tải lại website
  const [started, setStarted] = useState(false);

  // Chuyển sang Home sau khi hiệu ứng lật sách kết thúc
  const startExperience = () => {
    setStarted(true);
  };

  // Cho phép chạy lại Intro khi cần
  const replayIntro = () => {
    setStarted(false);
  };

  return {
    started,
    startExperience,
    replayIntro,
  };
}

export default useIntro;