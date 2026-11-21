import { useState } from "react";
import { PlusCircle, Check, Flame, Snowflake } from "lucide-react";
import { DRINK_OPTIONS } from "../../data/drinks.js";

const formatExtra = (price) =>
  price > 0 ? `+${price.toLocaleString("vi-VN")}đ` : "Tiêu chuẩn";

function OptionRow({ label, summary, isOpen, onToggle, children }) {
  return (
    <div className="border-b border-brown/10 py-2.5">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between text-left text-sm text-brown transition-colors hover:text-brown/80 sm:text-base"
      >
        <span className="flex items-center gap-2.5 font-medium">
          <PlusCircle size={16} className="shrink-0 text-brown/60" />
          <span>{label}</span>
        </span>
        <span className="text-xs font-semibold text-brown/70 sm:text-sm">
          {summary}
        </span>
      </button>

      {isOpen && <div className="mt-3 pl-6">{children}</div>}
    </div>
  );
}

function DrinkOptions({
  isBakery = false,
  servingTemp,
  fillings = [],
  selectedFilling,
  onSelectFilling,
  utensil,
  onSelectUtensil,
  size,
  onSelectSize,
  sweetness,
  onSelectSweetness,
  ice,
  onSelectIce,
  selectedToppings = [],
  onToggleTopping,
  accentColor = "#5C7644",
}) {
  const [openKey, setOpenKey] = useState(() =>
    isBakery ? (fillings.length > 0 ? "filling" : "utensil") : "size"
  );

  const toggleSection = (key) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  if (isBakery) {
    const selectedFillingLabel =
      fillings.find((f) => f.id === selectedFilling)?.label ||
      "Chưa chọn nhân";

    const selectedUtensilLabel =
      DRINK_OPTIONS.utensils.find((u) => u.id === utensil)?.label ||
      "Kèm dụng cụ ăn";

    const isHot = servingTemp === "Dùng nóng";

    return (
      <div className="mt-2">
        {/* 1. CÁCH DÙNG CỐ ĐỊNH THEO ĐẶC THÙ BÁNH */}
        {servingTemp && (
          <div className="flex items-center justify-between border-b border-brown/10 py-2.5 text-sm text-brown sm:text-base">
            <span className="flex items-center gap-2.5 font-medium">
              {isHot ? (
                <Flame size={16} className="shrink-0 text-amber-600" />
              ) : (
                <Snowflake size={16} className="shrink-0 text-sky-600" />
              )}
              <span>Cách dùng</span>
            </span>
            <span
              className="rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: accentColor }}
            >
              {servingTemp}
            </span>
          </div>
        )}

        {/* 2. CHỌN NHÂN (RIÊNG CHO BÁNH MÌ QUE) */}
        {fillings.length > 0 && (
          <OptionRow
            label="Chọn nhân"
            summary={selectedFillingLabel}
            isOpen={openKey === "filling"}
            onToggle={() => toggleSection("filling")}
          >
            <div className="flex flex-wrap gap-2">
              {fillings.map((filling) => {
                const active = selectedFilling === filling.id;
                return (
                  <button
                    key={filling.id}
                    type="button"
                    onClick={() =>
                      onSelectFilling?.(active ? null : filling.id)
                    }
                    className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      active
                        ? "text-white shadow-sm"
                        : "border-brown/20 bg-white/70 text-brown hover:border-brown/40"
                    }`}
                    style={{
                      backgroundColor: active ? accentColor : undefined,
                      borderColor: active ? accentColor : undefined,
                    }}
                  >
                    {active && <Check size={12} />}
                    <span>{filling.label}</span>
                  </button>
                );
              })}
            </div>
          </OptionRow>
        )}

        {/* 3. DỤNG CỤ ĂN KÈM */}
        <OptionRow
          label="Dụng cụ ăn kèm"
          summary={selectedUtensilLabel}
          isOpen={openKey === "utensil"}
          onToggle={() => toggleSection("utensil")}
        >
          <div className="flex flex-wrap gap-2">
            {DRINK_OPTIONS.utensils.map((item) => {
              const active = utensil === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectUtensil?.(item.id)}
                  className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
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
        </OptionRow>
      </div>
    );
  }

  const toppingSummary =
    selectedToppings.length > 0
      ? `Đã chọn (${selectedToppings.length})`
      : "Chưa chọn";

  return (
    <div className="mt-2">
      {/* 1. KÍCH THƯỚC */}
      <OptionRow
        label="Kích thước"
        summary={`Size ${size}`}
        isOpen={openKey === "size"}
        onToggle={() => toggleSection("size")}
      >
        <div className="flex flex-wrap gap-2">
          {DRINK_OPTIONS.sizes.map((item) => {
            const active = size === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSize(item.id)}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "text-white shadow-sm"
                    : "border-brown/20 bg-white/70 text-brown hover:border-brown/40"
                }`}
                style={{
                  backgroundColor: active ? accentColor : undefined,
                  borderColor: active ? accentColor : undefined,
                }}
              >
                {item.label} ({formatExtra(item.extraPrice)})
              </button>
            );
          })}
        </div>
      </OptionRow>

      {/* 2. ĐỘ NGỌT */}
      <OptionRow
        label="Độ ngọt"
        summary={sweetness}
        isOpen={openKey === "sweetness"}
        onToggle={() => toggleSection("sweetness")}
      >
        <div className="flex flex-wrap gap-2">
          {DRINK_OPTIONS.sweetnessLevels.map((level) => {
            const active = sweetness === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => onSelectSweetness(level)}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "text-white shadow-sm"
                    : "border-brown/20 bg-white/70 text-brown hover:border-brown/40"
                }`}
                style={{
                  backgroundColor: active ? accentColor : undefined,
                  borderColor: active ? accentColor : undefined,
                }}
              >
                {level}
              </button>
            );
          })}
        </div>
      </OptionRow>

      {/* 3. LƯỢNG ĐÁ */}
      <OptionRow
        label="Lượng đá"
        summary={ice}
        isOpen={openKey === "ice"}
        onToggle={() => toggleSection("ice")}
      >
        <div className="flex flex-wrap gap-2">
          {DRINK_OPTIONS.iceLevels.map((level) => {
            const active = ice === level;
            return (
              <button
                key={level}
                type="button"
                onClick={() => onSelectIce(level)}
                className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "text-white shadow-sm"
                    : "border-brown/20 bg-white/70 text-brown hover:border-brown/40"
                }`}
                style={{
                  backgroundColor: active ? accentColor : undefined,
                  borderColor: active ? accentColor : undefined,
                }}
              >
                {level}
              </button>
            );
          })}
        </div>
      </OptionRow>

      {/* 4. TOPPING */}
      <OptionRow
        label="Topping"
        summary={toppingSummary}
        isOpen={openKey === "topping"}
        onToggle={() => toggleSection("topping")}
      >
        <div className="flex flex-wrap gap-2">
          {DRINK_OPTIONS.toppings.map((topping) => {
            const active = selectedToppings.includes(topping.id);
            return (
              <button
                key={topping.id}
                type="button"
                onClick={() => onToggleTopping(topping.id)}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "text-white shadow-sm"
                    : "border-brown/20 bg-white/70 text-brown hover:border-brown/40"
                }`}
                style={{
                  backgroundColor: active ? accentColor : undefined,
                  borderColor: active ? accentColor : undefined,
                }}
              >
                {active && <Check size={12} />}
                <span>
                  {topping.name} (+{topping.price.toLocaleString("vi-VN")}đ)
                </span>
              </button>
            );
          })}
        </div>
      </OptionRow>
    </div>
  );
}

export default DrinkOptions;
