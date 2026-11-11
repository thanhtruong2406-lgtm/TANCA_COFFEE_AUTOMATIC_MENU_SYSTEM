
import { useState } from "react";

import useIntro from "./hooks/useIntro.js";
import IntroScene from "./components/IntroScene/IntroScene.jsx";
import PageFlipTransition from "../../components/PageTransition/PageFlipTransition.jsx";
import HomeView from "./HomeView.jsx";

function HomePage() {
  const { started, startExperience, replayIntro } = useIntro();

  const [flipping, setFlipping] = useState(false);

  // Khi người dùng nhấn START
  const handleStart = () => {
    if (flipping) return;
    setFlipping(true);
  };

  // Chỉ chuyển hẳn sang Home sau khi lật xong
  const handleFlipComplete = () => {
    startExperience();
    setFlipping(false);
  };

  // Khi đã hoàn tất Intro, hiển thị Home
  if (started) {
    return <HomeView onReplay={replayIntro} />;
  }

  return (
    <PageFlipTransition
      flipping={flipping}
      onComplete={handleFlipComplete}
      currentPage={<IntroScene onStart={handleStart} />}
      nextPage={<HomeView onReplay={replayIntro} />}
    />
  );
}

export default HomePage;
