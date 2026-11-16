import { useState } from "react";
import { PlusCircle, Minus, Plus } from "lucide-react";
import { DRINK_OPTIONS } from "../../data/drinks.js";

function ServingSelector({
  servingType,
  onSelectServingType,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
  note,
  onChangeNote,
  accentColor = "#5C7644",
}) {
  const [openKey, setOpenKey] = useState(null);

  const toggleSection = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  const servingLabel =
    DRINK_OPTIONS.servingTypes.find((s) => s.id === servingType)?.label ||
    "Tại chỗ";

  return (
    <div>
      {/* 1. TẠI CHỖ / MANG VỀ */}
      <div className="border-b border-brown/10 py-2.5">
        <button
          type="button"
          onClick={() => toggleSection("serving")}
          className="flex w-full cursor-pointer items-center justify-between text-left text-sm text-brown transition-colors hover:text-brown/80 sm:text-base"
        >
          <span className="flex items-center gap-2.5 font-medium">
            <PlusCircle size={16} className="shrink-0 text-brown/60" />
            <span>Tại chỗ / Mang về</span>
          </span>
          <span className="text-xs font-semibold text-brown/70 sm:text-sm">
            {servingLabel}
          </span>
        </button>

        {openKey === "serving" && (
          <div className="mt-3 flex gap-2 pl-6">
            {DRINK_OPTIONS.servingTypes.map((item) => {
              const active = servingType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectServingType(item.id)}
                  className={`cursor-pointer rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "text-white shadow-sm"
                      : "border-brown/20 bg-white/70 text-brown hover:border-brown/40"
                  }`}
                  style={{
                    backgroundColor: active ? accentColor : undefined,
                    borderColor: active ? accentColor : undefined,
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. SỐ LƯỢNG */}
      <div className="flex items-center justify-between border-b border-brown/10 py-2.5 text-sm text-brown sm:text-base">
        <span className="flex items-center gap-2.5 font-medium">
          <PlusCircle size={16} className="shrink-0 text-brown/60" />
          <span>Số lượng</span>
        </span>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onDecreaseQuantity}
            aria-label="Giảm số lượng"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-brown/25 bg-white text-brown transition-colors hover:bg-brown/10"
          >
            <Minus size={14} />
          </button>
          <span className="min-w-5 text-center text-sm font-bold">
            {quantity}
          </span>
          <button
            type="button"
            onClick={onIncreaseQuantity}
            aria-label="Tăng số lượng"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-brown/25 bg-white text-brown transition-colors hover:bg-brown/10"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* 3. GHI CHÚ */}
      <div className="py-2.5">
        <button
          type="button"
          onClick={() => toggleSection("note")}
          className="flex w-full cursor-pointer items-center justify-between text-left text-sm text-brown transition-colors hover:text-brown/80 sm:text-base"
        >
          <span className="flex items-center gap-2.5 font-medium">
            <PlusCircle size={16} className="shrink-0 text-brown/60" />
            <span>Ghi chú</span>
          </span>
          <span className="max-w-[160px] truncate text-xs text-brown/60 sm:text-sm">
            {note.trim() ? note : "Thêm lời nhắn..."}
          </span>
        </button>

        {openKey === "note" && (
          <div className="mt-2.5 pl-6">
            <input
              type="text"
              value={note}
              onChange={(event) => onChangeNote(event.target.value)}
              placeholder="Ví dụ: ít sữa, để riêng đá..."
              className="w-full rounded-xl border border-brown/20 bg-white/80 px-3.5 py-2 text-sm text-brown outline-none focus:border-brown"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ServingSelector;
