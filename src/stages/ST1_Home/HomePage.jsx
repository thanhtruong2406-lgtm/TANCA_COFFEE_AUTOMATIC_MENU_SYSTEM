
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Import custom hook quản lý trạng thái Intro
import useIntro from "./hooks/useIntro.js";

// Các component thuộc ST1
import IntroScene from "./components/IntroScene/IntroScene.jsx";
import HomeBanner from "./components/HomeBanner/HomeBanner.jsx";

// Các component dùng chung
import PageFlipTransition from "../../components/PageTransition/PageFlipTransition.jsx";
import Header from "../../components/Header/Header.jsx";
import ShoppingBasket from "../../components/ShoppingBasket/ShoppingBasket.jsx";

// Trang ST2 - Menu
import MenuPage from "../ST2_Menu/MenuPage.jsx";

// Cấu hình animation khi chuyển giữa Home và Menu
const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: {
    duration: 0.35,
    ease: "easeOut",
  },
};

function HomePage() {
  // Quản lý trạng thái hoàn thành Intro
  const { started, startExperience } = useIntro();

  // Quản lý trang đang được hiển thị
  const [activePage, setActivePage] = useState("home");

  // Quản lý trạng thái đóng/mở giỏ hàng
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  // Quản lý danh sách món trong giỏ hàng (đồng bộ với localStorage)
  const [basketItems, setBasketItems] = useState(() => {
    try {
      const saved = localStorage.getItem("tanca-basket-items");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("tanca-basket-items", JSON.stringify(basketItems));
    } catch {
      // Bỏ qua lỗi lưu trữ nếu trình duyệt chặn
    }
  }, [basketItems]);

  // Kiểm soát trạng thái lật trang sách
  const [flipping, setFlipping] = useState(false);

  // =========================
  // XỬ LÝ SỰ KIỆN
  // =========================

  // Chuyển đổi giữa trang Home và Menu
  const goToPage = (page) => {
    setActivePage(page);

    // Đưa màn hình về đầu trang khi chuyển nội dung
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Bắt đầu hiệu ứng lật sách khi nhấn START
  const handleStart = () => {
    // Ngăn người dùng kích hoạt hiệu ứng nhiều lần
    if (flipping) return;

    setFlipping(true);
  };

  // Chỉ hoàn thành Intro khi hiệu ứng lật sách kết thúc
  const handleFlipComplete = () => {
    startExperience();
    setFlipping(false);
  };

  // Mở giỏ hàng
  const handleOpenBasket = () => {
    setIsBasketOpen(true);
  };

  // Đóng giỏ hàng
  const handleCloseBasket = () => {
    setIsBasketOpen(false);
  };

  // Thêm đồ uống đã tùy chỉnh vào giỏ hàng
  const handleAddToCart = (newItem) => {
    setBasketItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === newItem.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }
      return [...prev, newItem];
    });
  };

  // Tăng/giảm số lượng món trong giỏ hàng
  const handleUpdateQuantity = (itemId, delta) => {
    setBasketItems((prev) =>
      prev.flatMap((item) => {
        if (item.id !== itemId) return item;
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : [];
      })
    );
  };

  // Xóa món khỏi giỏ hàng
  const handleRemoveItem = (itemId) => {
    setBasketItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Xóa toàn bộ giỏ hàng
  const handleClearBasket = () => {
    setBasketItems([]);
  };

  // Xử lý đặt hàng / thanh toán
  const handleCheckout = ({ note, paymentMethod, paymentLabel }) => {
    if (basketItems.length === 0) return null;

    const orderCode = `#CF${Math.floor(1000 + Math.random() * 9000)}`;
    const total = basketItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: `${Date.now()}-${orderCode}`,
      code: orderCode,
      createdAt: new Date().toISOString(),
      note,
      paymentMethod,
      paymentLabel,
      items: basketItems,
      total,
    };

    setBasketItems([]);
    return newOrder;
  };

  const totalCount = basketItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = basketItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // =========================
  // GIAO DIỆN CHÍNH
  // =========================

  // Dùng chung giao diện cho trang phía sau khi lật sách
  // và giao diện chính sau khi hoàn thành Intro
  const mainContent = (
    <div className="relative min-h-screen w-full bg-beige">
      {/* Header điều hướng giữa các trang */}
      <Header
        activePage={activePage}
        onNavigate={goToPage}
        onOpenBasket={handleOpenBasket}
        basketCount={totalCount}
      />

      {/* Hiển thị nội dung theo trang đang được chọn */}
      <AnimatePresence mode="wait">
        {activePage === "home" ? (
          <motion.div
            key="home"
            {...pageTransition}
          >
            {/* Banner giới thiệu TANCA COFFEE */}
            <HomeBanner
              onExploreMenu={() => goToPage("menu")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            {...pageTransition}
          >
            {/* ST2 - Danh sách đồ uống */}
            <MenuPage onAddToCart={handleAddToCart} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup giỏ hàng */}
      <ShoppingBasket
        isOpen={isBasketOpen}
        onClose={handleCloseBasket}
        items={basketItems}
        total={totalAmount}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearBasket={handleClearBasket}
        onCheckout={handleCheckout}
      />
    </div>
  );

  // =========================
  // ĐIỀU PHỐI INTRO VÀ HOME
  // =========================

  // Nếu Intro đã hoàn thành, hiển thị giao diện chính
  if (started) {
    return mainContent;
  }

  // Nếu chưa hoàn thành Intro, sử dụng hiệu ứng lật sách
  return (
    <PageFlipTransition
      flipping={flipping}
      onComplete={handleFlipComplete}
      currentPage={
        <IntroScene onStart={handleStart} />
      }
      nextPage={mainContent}
    />
  );
}

export default HomePage;
