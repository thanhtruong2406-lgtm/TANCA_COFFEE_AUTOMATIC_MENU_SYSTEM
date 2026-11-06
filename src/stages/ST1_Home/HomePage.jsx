
import { AnimatePresence, motion } from "motion/react";

import useIntro from "./hooks/useIntro.js";
import IntroScene from "./Components/IntroScene/IntroScene.jsx";

function HomePage() {
  const { started, startExperience, replayIntro } = useIntro();

  return (
    <AnimatePresence mode="wait">
      {!started ? (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <IntroScene onStart={startExperience} />
        </motion.div>
      ) : (
        <motion.main
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex min-h-screen flex-col items-center justify-center bg-beige px-6 text-center"
        >
          <p className="mb-4 tracking-[0.3em] text-milkBrown">
            WELCOME TO TANCA
          </p>

          <h1 className="mb-5 text-4xl font-bold text-brown md:text-6xl">
            TANCA COFFEE
          </h1>

          <p className="mb-8 max-w-xl leading-8 text-brown/70">
            Bạn đã hoàn thành Intro Animation.
            Homepage chính sẽ được thiết kế ở Part 2 của ST1.
          </p>

          <button
            type="button"
            onClick={replayIntro}
            className="rounded-full border border-brown px-7 py-3 font-semibold text-brown hover:bg-beigeDark"
          >
            Xem lại Intro
          </button>
        </motion.main>
      )}
    </AnimatePresence>
  );
}

export default HomePage;
