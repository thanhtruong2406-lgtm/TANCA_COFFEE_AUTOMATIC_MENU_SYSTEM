
import DrinkCarousel from "../components/DrinkCarousel/DrinkCarousel.jsx";
import CategoryList from "../components/CategoryList/CategoryList.jsx";

function CategoryPage({
  activeCategory,
  onSelectCategory,
  drinks = [],
  selectedDrinkId,
  onSelectDrink,
}) {
  return (
    <div className="mx-auto w-full max-w-6xl space-y-10">

      {/* Khu vực lựa chọn danh mục đồ uống */}
      <div>

        {/* Tiêu đề */}
        <div className="mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brown/60">
            TANCA MENU
          </p>

          <h1 className="mt-1 font-handwritten text-3xl font-bold text-brown sm:text-4xl">
            Khám Phá Hương Vị Yêu Thích
          </h1>
        </div>

        {/* Tái sử dụng 5 nút danh mục từ Menu Overview */}
        <CategoryList
          onSelectCategory={onSelectCategory}
        />

      </div>

      {/* Danh sách món thuộc danh mục đang chọn */}
      <div>
        <div className="mb-5 flex items-end justify-between border-b border-brown/15 pb-3">

          <div>
            <h2
              className="font-handwritten text-2xl font-bold sm:text-3xl"
              style={{
                color:
                  activeCategory?.accentColor ||
                  "#6B4F3A",
              }}
            >
              {activeCategory?.name}
            </h2>

            <p className="mt-1 text-sm text-brown/70">
              {activeCategory?.subtitle}
            </p>
          </div>

          <span className="text-xs font-semibold text-brown/60 sm:text-sm">
            {drinks.length} món
          </span>

        </div>

        {/* Giữ nguyên danh sách sản phẩm của thành viên 2 */}
        <DrinkCarousel
          drinks={drinks}
          accentColor={activeCategory?.accentColor}
          selectedDrinkId={selectedDrinkId}
          onSelectDrink={onSelectDrink}
        />

      </div>

    </div>
  );
}

export default CategoryPage;
