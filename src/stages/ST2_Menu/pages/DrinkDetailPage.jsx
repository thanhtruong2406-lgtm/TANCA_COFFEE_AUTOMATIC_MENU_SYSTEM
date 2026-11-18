import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

import DrinkImage from "../components/DrinkImage/DrinkImage.jsx";
import DrinkIntroduction from "../components/DrinkIntroduction/DrinkIntroduction.jsx";
import DrinkIngredients from "../components/DrinkIngredients/DrinkIngredients.jsx";
import DrinkOptions from "../components/DrinkOptions/DrinkOptions.jsx";
import ServingSelector from "../components/ServingSelector/ServingSelector.jsx";
import AddToCart from "../components/AddToCart/AddToCart.jsx";
import useDrinkCustomization from "../hooks/useDrinkCustomization.js";

function DrinkDetailPage({
  drink,
  category,
  categoryDrinks = [],
  onSelectDrink,
  onBack,
  backLabel,
  onAddToCart,
}) {
  const {
    size,
    setSize,
    sweetness,
    setSweetness,
    ice,
    setIce,
    selectedToppings,
    toggleTopping,
    servingType,
    setServingType,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    note,
    setNote,
    totalPrice,
    buildCartItem,
  } = useDrinkCustomization(drink);


  if (!drink) return null;

  const accentColor = category?.accentColor || "#5C7644";
  const panelBg = category?.panelBg || "#E6ECD8";

  const handleAdd = () => {
    const cartItem = buildCartItem();
    if (cartItem) {
      onAddToCart?.(cartItem);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto w-full max-w-5xl"
    >
      {/* THANH QUAY LẠI & CHUYỂN NHANH MÓN TRONG CÙNG DANH MỤC */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-brown/20 bg-[#FFFBF4]/90 px-4 py-2 text-sm font-semibold text-brown shadow-sm transition-colors hover:bg-white"
        >
          <ArrowLeft size={16} />
          <span>{backLabel || `Quay lại danh mục ${category?.name}`}</span>
        </button>

        {categoryDrinks.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {categoryDrinks.map((item) => {
              const active = item.id === drink.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectDrink?.(item)}
                  className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "text-white shadow-sm"
                      : "border border-brown/15 bg-[#FFFBF4]/80 text-brown hover:bg-white"
                  }`}
                  style={{
                    backgroundColor: active ? accentColor : undefined,
                  }}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* KHUNG CHI TIẾT ĐỒ UỐNG: TRÁI ẢNH - PHẢI THÔNG TIN */}
      <div
        className="grid grid-cols-1 overflow-hidden rounded-3xl border-2 bg-[#FBF7EE] shadow-xl lg:grid-cols-12"
        style={{ borderColor: `${accentColor}4D` }}
      >
        {/* CỘT TRÁI: HÌNH ẢNH MÓN */}
        <div className="flex lg:col-span-5">
          <DrinkImage drink={drink} panelBg={panelBg} />
        </div>

        {/* CỘT PHẢI: CÂU CHUYỆN, NGUYÊN LIỆU & TÙY CHỌN */}
        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7">
          <div>
            <DrinkIntroduction story={drink.story} />
            <DrinkIngredients ingredients={drink.ingredients} />

            <DrinkOptions
              size={size}
              onSelectSize={setSize}
              sweetness={sweetness}
              onSelectSweetness={setSweetness}
              ice={ice}
              onSelectIce={setIce}
              selectedToppings={selectedToppings}
              onToggleTopping={toggleTopping}
              accentColor={accentColor}
            />

            <ServingSelector
              servingType={servingType}
              onSelectServingType={setServingType}
              quantity={quantity}
              onIncreaseQuantity={increaseQuantity}
              onDecreaseQuantity={decreaseQuantity}
              note={note}
              onChangeNote={setNote}
              accentColor={accentColor}
            />
          </div>

          <AddToCart
            totalPrice={totalPrice}
            accentColor={accentColor}
            onAdd={handleAdd}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default DrinkDetailPage;
