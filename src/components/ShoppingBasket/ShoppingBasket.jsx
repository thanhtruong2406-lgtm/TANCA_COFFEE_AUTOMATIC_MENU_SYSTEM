import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Plus, Minus, Trash2 } from "lucide-react";

const formatPrice = (value) => `${value.toLocaleString("vi-VN")} đ`;

function ShoppingBasket({
  isOpen,
  onClose,
  items = [],
  total = 0,
  onUpdateQuantity,
  onRemoveItem,
}) {
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
                <ul className="max-h-72 space-y-3 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col gap-2.5 rounded-xl bg-white/70 p-3.5 text-brown shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-bold">{item.name}</p>
                          {item.details && (
                            <p className="mt-0.5 text-xs text-brown/65">
                              {item.details}
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem?.(item.id)}
                          aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                          title="Xóa món"
                          className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-full text-brown/50 transition-colors hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between border-t border-brown/10 pt-2">
                        <div className="flex items-center gap-2.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity?.(item.id, -1)}
                            disabled={item.quantity <= 1}
                            aria-label={`Giảm số lượng ${item.name}`}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-brown/25 bg-white text-brown transition-colors hover:bg-brown/10 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="min-w-5 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity?.(item.id, 1)}
                            aria-label={`Tăng số lượng ${item.name}`}
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-brown/25 bg-white text-brown transition-colors hover:bg-brown/10"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <span className="text-sm font-bold">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
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
