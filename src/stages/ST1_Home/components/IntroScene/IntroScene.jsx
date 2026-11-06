
import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "motion/react";

import CoffeeCart from "../CoffeeCart/CoffeeCart.jsx";
import IntroBrand from "../IntroBrand/IntroBrand.jsx";

function IntroScene() {
  const [arrived, setArrived] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <main
      className="
        relative h-[100svh] min-h-[480px]
        w-full overflow-hidden bg-[#F5EBDD]
        sm:flex sm:min-h-[550px] sm:flex-col
        sm:items-center sm:justify-between
        sm:px-4 sm:py-6
      "
    >
      {/* BACKGROUND */}
      <img
        src="/images/ST1/intro/tanca-street.jpg"
        alt=""
        aria-hidden="true"
        className="
          absolute inset-0 h-full w-full
          object-cover object-[55%_center]
          sm:object-center
        "
      />

      {/* LOGO - HIỆN KHI XE DỪNG */}
      <div
        className="
          pointer-events-none absolute inset-x-0
          top-[7%] z-20 flex justify-center px-3
          sm:relative sm:inset-auto sm:top-auto
          sm:min-h-[170px] sm:items-center
        "
      >
        <AnimatePresence>
          {arrived && (
            <div className="origin-top scale-[0.85] sm:scale-100">
              <IntroBrand />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* XE CÀ PHÊ */}
      <div
        className="
          pointer-events-none absolute inset-x-0
          bottom-[12%] z-10 flex
          items-center justify-center
          sm:relative sm:inset-auto sm:min-h-0
          sm:w-full sm:flex-1
        "
      >
        <motion.div
          initial={{
            x: reduceMotion ? 0 : "110vw",
          }}
          animate={{ x: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 3,
            ease: [0.22, 1, 0.36, 1],
          }}
          onAnimationComplete={() => setArrived(true)}
          className="
            w-[min(88vw,380px)]
            sm:w-[min(90vw,650px)]
          "
        >
          <CoffeeCart />
        </motion.div>
      </div>

      <span className="sr-only" aria-live="polite">
        {arrived
          ? "Xe cà phê đã dừng ở giữa màn hình."
          : "Mèo đang đẩy xe cà phê."}
      </span>
    </main>
  );
}

export default IntroScene;
