import { useState } from "react";
import { Check } from "lucide-react";

const formatPrice = (value) => `${value.toLocaleString("vi-VN")} đ`;

function AddToCart({ totalPrice = 0, accentColor = "#5C7644", onAdd }) {
  const [addedFeedback, setAddedFeedback] = useState(false);

  const handleClick = () => {
    onAdd?.();
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 1200);
  };

  return (
    <div className="mt-5 pt-2">
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:opacity-95 active:scale-[0.99] sm:text-base"
        style={{ backgroundColor: accentColor }}
      >
        {addedFeedback ? (
          <>
            <Check size={18} />
            <span>Đã thêm vào giỏ hàng!</span>
          </>
        ) : (
          <span>Thêm vào giỏ hàng • {formatPrice(totalPrice)}</span>
        )}
      </button>
    </div>
  );
}

export default AddToCart;
