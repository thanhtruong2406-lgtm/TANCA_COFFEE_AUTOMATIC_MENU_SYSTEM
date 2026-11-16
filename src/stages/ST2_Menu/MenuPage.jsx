import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { CATEGORIES, DRINKS } from "./data/drinks.js";
import CategoryBackground from "./components/CategoryBackground/CategoryBackground.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import DrinkDetailPage from "./pages/DrinkDetailPage.jsx";

function MenuPage({ onAddToCart }) {
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORIES[0].id);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const activeCategory = useMemo(
    () =>
      CATEGORIES.find((cat) => cat.id === activeCategoryId) || CATEGORIES[0],
    [activeCategoryId]
  );

  const categoryDrinks = useMemo(
    () => DRINKS.filter((drink) => drink.categoryId === activeCategory.id),
    [activeCategory]
  );

  const handleSelectCategory = (categoryId) => {
    setActiveCategoryId(categoryId);
    setSelectedDrink(null);
  };

  const handleSelectDrink = (drink) => {
    setSelectedDrink(drink);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] w-full px-4 pb-20 pt-28 sm:px-8 sm:pt-32">
      {/* BACKGROUND ĐỘNG THEO 5 DANH MỤC */}
      <CategoryBackground category={activeCategory} />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {!selectedDrink ? (
            <motion.div
              key={`category-${activeCategory.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <CategoryPage
                categories={CATEGORIES}
                activeCategory={activeCategory}
                onSelectCategory={handleSelectCategory}
                drinks={categoryDrinks}
                selectedDrinkId={selectedDrink?.id}
                onSelectDrink={handleSelectDrink}
              />
            </motion.div>
          ) : (
            <DrinkDetailPage
              key={`detail-${selectedDrink.id}`}
              drink={selectedDrink}
              category={activeCategory}
              categoryDrinks={categoryDrinks}
              onSelectDrink={handleSelectDrink}
              onBack={() => setSelectedDrink(null)}
              onAddToCart={onAddToCart}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default MenuPage;
