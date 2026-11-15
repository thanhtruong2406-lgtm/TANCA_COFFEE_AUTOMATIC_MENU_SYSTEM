import HomeBackground from "../HomeBackground/HomeBackground.jsx";
import HeroText from "../HeroText/HeroText.jsx";
import HeroDrinks from "../HeroDrinks/HeroDrinks.jsx";
import CatMascot from "../CatMascot/CatMascot.jsx";
import CatChatbot from "../CatChatbot/CatChatbot.jsx";
// Component tổng quản lý bố cục giao diện Home
function HomeBanner({ onExploreMenu }) {
  return (
    <section
      className="
        relative isolate flex
        min-h-[100svh] w-full
        items-center overflow-hidden
        bg-beige
      "
    >
      {/* Layer 1: Background */}
      <HomeBackground />

      {/* Layer 2: Bố cục phần chữ bên trái màn hình */}
      <div
        className="
    relative z-10 mx-auto w-full
    max-w-[1440px]
    px-6 pb-16 pt-24
    sm:px-12
    lg:px-20
    xl:px-24
  "
      >
        {/* Hiển thị tiêu đề, slogan và nút khám phá Menu */}
        <HeroText onExploreMenu={onExploreMenu} />
      </div>

      {/* Layer 3: Hai ly đồ uống cùng khay gỗ */}
      <HeroDrinks />

      {/* Layer 4: CatMascot - */}
      {/* Khu vực mèo TANCA và trợ lý tư vấn đồ uống */}
      <CatChatbot />
      {/* Layer 5: CatChatbot - phát triển tiếp */}
    </section>
  );
}

export default HomeBanner;
