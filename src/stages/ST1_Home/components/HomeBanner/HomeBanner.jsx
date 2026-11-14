import { ChevronRight } from "lucide-react";

import Button from "../../../../components/ButtonStart/ButtonStart.jsx";

function HomeBanner({ onExploreMenu }) {
  return (
    <section className="relative flex min-h-[100svh] w-full items-center overflow-hidden">
      {
        // backgroundImage
      }
      <div aria-hidden="true" className="absolute inset-0 bg-beige" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 pt-32 sm:px-10">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold leading-tight text-brown sm:text-5xl lg:text-6xl">
            Một chút bình yên
            <br />
            trong từng ngụm.
          </h1>

          <p className="mt-5 max-w-md text-base leading-7 text-brown/75 sm:text-lg">
            Cà phê, matcha và những hương vị được tạo ra dành riêng cho bạn.
          </p>

          {
            // exploreMenuButton
          }
          <Button onClick={onExploreMenu} className="mt-8 gap-2">
            Khám phá Menu
            <ChevronRight size={18} strokeWidth={2.5} />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HomeBanner;
