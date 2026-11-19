import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Plus, Minus, Trash2, CheckCircle2 } from "lucide-react";

const formatPrice = (value) => `${value.toLocaleString("vi-VN")} đ`;

const PAYMENT_METHODS = [
  { id: "counter", label: "Thanh toán tại quầy" },
  { id: "qr", label: "Chuyển khoản QR" },
];

function ShoppingBasket({
  isOpen,
  onClose,
  items = [],
  total = 0,
  onUpdateQuantity,
  onRemoveItem,
  onClearBasket,
  onCheckout,
}) {
  const [orderNote, setOrderNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("counter");
  const [completedOrder, setCompletedOrder] = useState(null);

  const handleClose = () => {
    setCompletedOrder(null);
    onClose?.();
  };

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCompletedOrder(null);
        onClose?.();
      }
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
  const totalCups = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleConfirmCheckout = () => {
    if (isEmpty) return;

    const paymentLabel =
      PAYMENT_METHODS.find((m) => m.id === paymentMethod)?.label ||
      "Thanh toán tại quầy";

    const newOrder = onCheckout?.({
      note: orderNote.trim(),
      paymentMethod,
      paymentLabel,
    });

    if (newOrder) {
      setCompletedOrder(newOrder);
      setOrderNote("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="basketOverlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
        >
          {completedOrder ? (
            // POPUP XANH DƯƠNG BÁO ĐẶT HÀNG THÀNH CÔNG
            <motion.div
              key="orderSuccess"
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.9, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-sky-200 bg-[#F0F7FF] p-6 text-center shadow-2xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sky-600 text-white shadow-md">
                <CheckCircle2 size={30} />
              </div>

              <h2 className="mt-4 text-2xl font-bold text-sky-900">
                Đặt hàng thành công!
              </h2>

              <p className="mt-1 text-sm text-sky-700">
                Đơn hàng của bạn đã được gửi tới quầy pha chế
              </p>

              <div className="my-5 rounded-xl border border-sky-200 bg-white p-4 text-left shadow-sm">
                <div className="flex items-center justify-between border-b border-sky-100 pb-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                    Mã đơn hàng
                  </span>
                  <span className="text-lg font-extrabold text-sky-900">
                    {completedOrder.code}
                  </span>
                </div>

                <div className="mt-2.5 space-y-1.5 text-xs text-sky-800">
                  {completedOrder.note && (
                    <div className="flex justify-between gap-2">
                      <span className="shrink-0 text-sky-600">Ghi chú:</span>
                      <span className="text-right font-semibold">
                        {completedOrder.note}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sky-600">Thanh toán:</span>
                    <span className="font-semibold">
                      {completedOrder.paymentLabel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sky-600">Tổng cộng:</span>
                    <span className="font-bold text-sky-900">
                      {formatPrice(completedOrder.total)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full cursor-pointer rounded-full bg-sky-600 py-3 font-bold text-white shadow-md transition-colors hover:bg-sky-700"
              >
                Hoàn tất
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="basketModal"
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
              <div className="flex items-center justify-between border-b border-brown/20 pb-3.5">
                <div>
                  <h2
                    id="shoppingBasketTitle"
                    className="text-xl font-bold text-brown"
                  >
                    Giỏ hàng của bạn
                  </h2>
                  {!isEmpty && (
                    <p className="mt-0.5 text-xs font-medium text-brown/65">
                      Đã chọn {totalCups} ly ({items.length} loại)
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {!isEmpty && (
                    <button
                      type="button"
                      onClick={onClearBasket}
                      className="cursor-pointer rounded-full px-2.5 py-1 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
                    >
                      Xóa tất cả
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Đóng giỏ hàng"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-brown transition-colors hover:bg-brown/10"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {
                // basketItems
              }
              <div className="flex min-h-[160px] flex-col justify-center py-4">
                {isEmpty ? (
                  <p className="text-center text-brown/60">
                    Giỏ hàng chưa có sản phẩm nào
                  </p>
                ) : (
                  <ul className="max-h-64 space-y-3 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex flex-col gap-2.5 rounded-xl bg-white/75 p-3 text-brown shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              draggable={false}
                              className="h-14 w-14 shrink-0 rounded-lg object-cover shadow-xs"
                            />
                          )}

                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold leading-snug">
                              {item.name}
                            </p>
                            {item.details && (
                              <p className="mt-0.5 text-xs leading-relaxed text-brown/65">
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
                // checkoutOptions
              }
              {!isEmpty && (
                <div className="mb-3 space-y-2.5 border-t border-brown/15 pt-3">
                  <input
                    type="text"
                    value={orderNote}
                    onChange={(event) => setOrderNote(event.target.value)}
                    placeholder="Ghi chú thêm (nếu có)"
                    className="w-full rounded-xl border border-brown/20 bg-white/80 px-3.5 py-2 text-xs text-brown outline-none focus:border-brown sm:text-sm"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    {PAYMENT_METHODS.map((method) => {
                      const active = paymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setPaymentMethod(method.id)}
                          className={`cursor-pointer rounded-xl border py-2 text-xs font-semibold transition-all ${
                            active
                              ? "border-brown bg-brown text-beige shadow-xs"
                              : "border-brown/20 bg-white/70 text-brown hover:bg-white"
                          }`}
                        >
                          {method.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {
                // basketFooter
              }
              <div className="flex flex-col gap-3 border-t border-brown/20 pt-3.5">
                <div className="flex justify-between font-semibold text-brown">
                  <span>Tổng tiền:</span>
                  <span className="text-lg font-extrabold">
                    {formatPrice(total)}
                  </span>
                </div>
                <button
                  type="button"
                  disabled={isEmpty}
                  onClick={handleConfirmCheckout}
                  className="w-full cursor-pointer rounded-full bg-brown py-3 font-bold text-beige transition-colors hover:bg-[#543D2C] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-brown"
                >
                  Thanh toán
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ShoppingBasket;
