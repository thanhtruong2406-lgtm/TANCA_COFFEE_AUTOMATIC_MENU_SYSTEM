
import MenuBackground from "../components/MenuBackground/MenuBackground.jsx";
import BestSellerBanner from "../components/BestSellerBanner/BestSellerBanner.jsx";
import CategoryList from "../components/CategoryList/CategoryList.jsx";

// Trang tổng quan của Menu TANCA COFFEE
function MenuOverview({
  onOpenBestSeller,
  onSelectCategory,
}) {
  return (
    <section
      className="
        st2-menu relative isolate
        h-[100svh] w-full
        overflow-x-hidden overflow-y-auto
        bg-beige
      "
    >
      {/* Layer 1: Background độc lập */}
      <MenuBackground />

      {/* Layer 2: Nội dung Menu */}
      <div
        className="
          st2-page-enter relative z-10 mx-auto
          max-w-[1440px]
          px-5 pb-6 pt-24
          sm:px-10
          lg:px-16
        "
      >
        {/* Banner đồ uống yêu thích */}
        <section className="mb-6">
          <h1
            className="
              font-handwritten text-center
              text-4xl font-bold text-brown
              lg:text-5xl
            "
          >
            Signature Favorites
          </h1>

          <div className="mt-4">
            <BestSellerBanner
              onClick={onOpenBestSeller}
            />
          </div>
        </section>

        {/* Khu vực lựa chọn danh mục */}
        <section>
          <h2
            className="
              font-handwritten text-center
              text-3xl font-bold text-brown
              lg:text-4xl
            "
          >
            Hôm nay bạn muốn dùng gì?
          </h2>

          {/* Truyền sự kiện chọn danh mục */}
          <CategoryList
            onSelectCategory={onSelectCategory}
          />
        </section>
      </div>
    </section>
  );
}

export default MenuOverview;
