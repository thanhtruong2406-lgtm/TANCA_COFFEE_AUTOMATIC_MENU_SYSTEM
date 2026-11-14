import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

const formatPrice = (value) => `${value.toLocaleString("vi-VN")} đ`;

function ShoppingBasket({ isOpen, onClose, items = [], total = 0 }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  const isEmpty = items.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="basketOverlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="shoppingBasketTitle"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-brown/15 bg-beige p-6 shadow-2xl"
          >
            {
              // basketHeader
            }
            <div className="flex items-center justify-between border-b border-brown/20 pb-4">
              <h2 id="shoppingBasketTitle" className="text-xl font-bold text-brown">
                Giỏ hàng của bạn
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Đóng giỏ hàng"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-brown transition-colors hover:bg-brown/10"
              >
                <X size={20} />
              </button>
            </div>

            {
              // basketItems
            }
            <div className="flex min-h-[160px] flex-col justify-center py-6">
              {isEmpty ? (
                <p className="text-center text-brown/60">
                  Giỏ hàng chưa có sản phẩm nào
                </p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between text-brown"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {
              // basketFooter
            }
            <div className="flex flex-col gap-3 border-t border-brown/20 pt-4">
              <div className="flex justify-between font-semibold text-brown">
                <span>Tổng tiền:</span>
                <span>{formatPrice(total)}</span>
              </div>
              <button
                type="button"
                disabled={isEmpty}
                className="w-full cursor-pointer rounded-full bg-brown py-3 font-bold text-beige transition-colors hover:bg-[#543D2C] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brown"
              >
                Thanh toán
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ShoppingBasket;
