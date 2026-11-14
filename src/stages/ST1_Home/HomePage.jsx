import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import useIntro from "./hooks/useIntro.js";
import IntroScene from "./components/IntroScene/IntroScene.jsx";
import HomeBanner from "./components/HomeBanner/HomeBanner.jsx";
import Header from "../../components/Header/Header.jsx";
import ShoppingBasket from "../../components/ShoppingBasket/ShoppingBasket.jsx";
import MenuPage from "../ST2_Menu/MenuPage.jsx";

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: "easeOut" },
};

function HomePage() {
  const { started, startExperience } = useIntro();
  const [activePage, setActivePage] = useState("home");
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const goToPage = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative min-h-screen w-full bg-beige"
        >
          {
            // header
          }
          <Header
            activePage={activePage}
            onNavigate={goToPage}
            onOpenBasket={() => setIsBasketOpen(true)}
            basketCount={0}
          />

          {
            // pageContent
          }
          <AnimatePresence mode="wait">
            {activePage === "home" ? (
              <motion.div key="home" {...pageTransition}>
                <HomeBanner onExploreMenu={() => goToPage("menu")} />
              </motion.div>
            ) : (
              <motion.div key="menu" {...pageTransition}>
                <MenuPage />
              </motion.div>
            )}
          </AnimatePresence>

          {
            // popUp
          }
          <ShoppingBasket
            isOpen={isBasketOpen}
            onClose={() => setIsBasketOpen(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default HomePage;
