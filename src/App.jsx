import React, { useState } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import MenuPage from "./components/MenuPage";
import CartModal from "./components/CartModal";
import Button from "./components/ButtonStart";

function App() {
  const [stage, setStage] = useState("intro");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // start
  if (stage === "intro") {
    return (
      <div className="min-h-screen bg-[#F5EBDD] flex flex-col items-center justify-center gap-6 p-4">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-[#6B4F3A] tracking-wider">
            TANCA COFFEE
          </h1>
          <p className="text-[#6B4F3A]/70 text-sm">
            [slogan]
          </p>
        </div>
        {
          // carAnimation
        }
        <div className="w-80 h-48 border-2 border-dashed border-[#6B4F3A]/30 rounded-2xl flex items-center justify-center text-[#6B4F3A]/60 bg-white/40">
          [ Animation ]
        </div>

        {
          // buttonStart
        }
        <Button onClick={() => setStage("home")}>START &gt;</Button>
      </div>
    );
  }

  // mainStage
  return (
    <div className="min-h-screen bg-[#F5EBDD]/40 text-stone-800 flex flex-col">
      {
        // header
      }
      <Header
        activeTab={stage}
        onNavigate={(page) => setStage(page)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={0}
      />

      {
        // mainContent
      }
      <main className="flex-1">
        {stage === "home" && <Banner onExploreMenu={() => setStage("menu")} />}
        {stage === "menu" && <MenuPage />}
      </main>

      {
        // popUp
      }
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
