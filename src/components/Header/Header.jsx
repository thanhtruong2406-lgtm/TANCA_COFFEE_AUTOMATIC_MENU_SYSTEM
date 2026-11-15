import { motion } from "motion/react";

import shoppingBasketIcon from "../../assets/shoppingBasket.png";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
];

function Header({ activePage, onNavigate, onOpenBasket, basketCount = 0 }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-brown/10 bg-[#FBF6EE]/90 px-4 py-2.5 shadow-lg shadow-brown/10 backdrop-blur-md sm:px-7 sm:py-3">
        {
          // logo
        }
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="flex cursor-pointer items-center gap-2.5 text-brown"
          aria-label="Về trang chủ TANCA COFFEE"
        >
          {
            // logoImage
          }
          <span
            aria-hidden="true"
            className="block h-9 w-9 shrink-0 rounded-full border border-dashed border-brown/30"
          />
          <span className="flex flex-col items-start leading-none">
            <span className="text-lg font-bold tracking-[0.12em] sm:text-xl">
              TANCA
            </span>
            <span className="mt-0.5 text-xs font-semibold tracking-[0.32em] sm:text-sm">
              COFFEE
            </span>
          </span>
        </button>

        <div className="flex items-center gap-5 sm:gap-10">
          {
            // navMenu
          }
          <nav className="flex items-center gap-5 sm:gap-9">
            {NAV_ITEMS.map((item) => {
              const isActive = activePage === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative cursor-pointer py-1 text-sm font-semibold transition-colors sm:text-base ${
                    isActive ? "text-brown" : "text-brown/60 hover:text-brown"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="headerNavUnderline"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-brown"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {
            // basketButton
          }
          <button
            type="button"
            onClick={onOpenBasket}
            aria-label={`Mở giỏ hàng (${basketCount} sản phẩm)`}
            className="relative cursor-pointer rounded-full p-1.5 transition-colors hover:bg-brown/10"
          >
            <img
              src={shoppingBasketIcon}
              alt=""
              draggable={false}
              className="h-7 w-9 select-none object-contain mix-blend-multiply sm:h-8 sm:w-10"
            />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brown px-1 text-[11px] font-bold text-beige">
              {basketCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
