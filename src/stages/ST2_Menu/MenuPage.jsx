import { useCallback, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
import "./components/styles/menu-animation.css";
import MenuOverview from "./pages/MenuOverview.jsx";
import BestSellerPage from "./pages/BestSellerPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import DrinkDetailPage from "./pages/DrinkDetailPage.jsx";
import CategoryBackground from "./components/CategoryBackground/CategoryBackground.jsx";
import ZoomTransition from "./components/PageTransition/ZoomTransition.jsx";
import categories from "./data/categories.js";
import { CATEGORIES, DRINKS } from "./data/drinks.js";

// Ghép thông tin giao diện của ST2.1 với hình nền và dữ liệu của ST2.2.
const menuCategories = categories.map((category) => ({
  ...category,
  ...CATEGORIES.find((item) => item.id === category.id),
}));
const findCategory = (id) => menuCategories.find((item) => item.id === id);
const drinksOf = (id) => DRINKS.filter((drink) => drink.categoryId === id);

function MenuPage({ onAddToCart }) {
  const [page, setPage] = useState("overview");
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [detailOrigin, setDetailOrigin] = useState("category");
  const [transition, setTransition] = useState(null);
  const busyRef = useRef(false);

  // Giữ hiệu ứng Zoom đã có: lấy vị trí và ảnh thực tế của nút được bấm.
  const startZoom = (element, category, destination, drink = null) => {
    if (busyRef.current) return;
    if (!element) return;
    busyRef.current = true;
    const rect = element.getBoundingClientRect();
    const color = window.getComputedStyle(element).backgroundColor;
    const image = element.querySelector('[aria-hidden="false"] img') ||
      element.querySelector('img[aria-hidden="false"]') || element.querySelector("img");
    setTransition({
      rect, category, destination, drink,
      color: color === "rgba(0, 0, 0, 0)" ? category.theme.background : color,
      previewImage: image?.currentSrc || image?.src || null,
      previewTitle: drink?.name || category.name || "",
    });
  };

  const handleSelectCategory = (id, element) => {
    const category = findCategory(id);
    if (!category || (page === "category" && activeCategoryId === id)) return;
    startZoom(element, category, "category");
  };

  const handleOpenBestSeller = (event) => {
    startZoom(event.currentTarget, { theme: { background: "#F5EBDD" } }, "best-seller");
  };

  const handleSelectDrink = (drink, element) => {
    if (!drink) return;
    const category = findCategory(drink.categoryId);
    if (!category || busyRef.current) return;
    if (page === "drink") {
      // Chuyển nhanh món ngay trong trang chi tiết, giữ nguồn của nút quay lại.
      setSelectedDrink(drink);
      setActiveCategoryId(category.id);
      return;
    }
    setDetailOrigin(page);
    startZoom(element, category, "drink", drink);
  };

  // Chỉ thay nội dung khi lớp Zoom đã phủ kín, chưa xóa animation.
  const handleZoomComplete = useCallback(() => {
    if (!transition) return;
    if (transition.destination === "category" || transition.destination === "drink") {
      setActiveCategoryId(transition.category.id);
    }
    setSelectedDrink(transition.drink);
    setPage(transition.destination);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [transition]);

  const handleZoomFinish = useCallback(() => {
    busyRef.current = false;
    setTransition(null);
  }, []);

  const backToOverview = () => {
    if (busyRef.current) return;
    setSelectedDrink(null);
    setActiveCategoryId(null);
    setPage("overview");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const backFromDrink = () => {
    if (busyRef.current) return;
    setSelectedDrink(null);
    setPage(detailOrigin);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const activeCategory = findCategory(activeCategoryId);
  const categoryDrinks = drinksOf(activeCategoryId);

  return (
    <>
      {page === "overview" && (
        <MenuOverview onSelectCategory={handleSelectCategory} onOpenBestSeller={handleOpenBestSeller} />
      )}
      {page === "best-seller" && (
        <BestSellerPage onBack={backToOverview} onSelectDrink={handleSelectDrink} />
      )}
      {(page === "category" || page === "drink") && activeCategory && (
        <section className="relative isolate min-h-[100svh] w-full px-4 pb-20 pt-28 sm:px-8 sm:pt-32">
          <CategoryBackground category={activeCategory} />
          <div className="relative z-10">
            {page === "category" ? (
              <div key={activeCategory.id} className="st2-page-enter mx-auto max-w-6xl">
                <button type="button" onClick={backToOverview} className="mb-5 inline-flex items-center gap-2 rounded-xl bg-white/60 px-4 py-2 text-brown transition-colors hover:bg-white">
                  <ArrowLeft size={20} /> Quay lại Menu
                </button>
                <CategoryPage categories={menuCategories} activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory} drinks={categoryDrinks}
                  onSelectDrink={handleSelectDrink} />
              </div>
            ) : selectedDrink && (
              <DrinkDetailPage key={selectedDrink.id} drink={selectedDrink}
                category={activeCategory} categoryDrinks={categoryDrinks}
                onSelectDrink={handleSelectDrink} onBack={backFromDrink}
                backLabel={detailOrigin === "best-seller" ? "Quay lại Signature Favorites" : undefined}
                onAddToCart={onAddToCart} />
            )}
          </div>
        </section>
      )}
      {transition && <ZoomTransition transition={transition} onComplete={handleZoomComplete} onFinish={handleZoomFinish} />}
    </>
  );
}

export default MenuPage;
