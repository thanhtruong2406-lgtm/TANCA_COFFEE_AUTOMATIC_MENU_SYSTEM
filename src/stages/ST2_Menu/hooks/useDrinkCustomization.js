import { useMemo, useState } from "react";
import { DRINK_OPTIONS } from "../data/drinks.js";

function useDrinkCustomization(drink) {
  const isBakery = drink?.categoryId === "bakery";

  const [size, setSize] = useState(DRINK_OPTIONS.sizes[0].id);
  const [sweetness, setSweetness] = useState("70%");
  const [ice, setIce] = useState("Bình thường");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedFilling, setSelectedFilling] = useState(null);
  const [utensil, setUtensil] = useState(DRINK_OPTIONS.utensils[0].id);
  const [servingType, setServingType] = useState("dine-in");
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const toggleTopping = (toppingId) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId)
        ? prev.filter((id) => id !== toppingId)
        : [...prev, toppingId]
    );
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const resetCustomization = () => {
    setSize(DRINK_OPTIONS.sizes[0].id);
    setSweetness("70%");
    setIce("Bình thường");
    setSelectedToppings([]);
    setSelectedFilling(null);
    setUtensil(DRINK_OPTIONS.utensils[0].id);
    setServingType("dine-in");
    setQuantity(1);
    setNote("");
  };

  const activeImage = useMemo(() => {
    if (!drink) return null;
    if (drink.fillings?.length && selectedFilling) {
      const matched = drink.fillings.find((f) => f.id === selectedFilling);
      return matched ? matched.image : null;
    }
    return null;
  }, [drink, selectedFilling]);

  const unitPrice = useMemo(() => {
    if (!drink) return 0;
    if (isBakery) return drink.price;

    const sizeObj = DRINK_OPTIONS.sizes.find((s) => s.id === size);
    const sizeExtra = sizeObj ? sizeObj.extraPrice : 0;

    const toppingsExtra = selectedToppings.reduce((sum, toppingId) => {
      const toppingObj = DRINK_OPTIONS.toppings.find((t) => t.id === toppingId);
      return sum + (toppingObj ? toppingObj.price : 0);
    }, 0);

    return drink.price + sizeExtra + toppingsExtra;
  }, [drink, isBakery, size, selectedToppings]);

  const totalPrice = useMemo(() => {
    return unitPrice * quantity;
  }, [unitPrice, quantity]);

  const buildCartItem = () => {
    if (!drink) return null;

    const servingLabel =
      DRINK_OPTIONS.servingTypes.find((s) => s.id === servingType)?.label ||
      "Tại chỗ";
    const trimmedNote = note.trim();

    if (isBakery) {
      const fillingObj = drink.fillings?.length
        ? drink.fillings.find((f) => f.id === selectedFilling) ||
          drink.fillings[0]
        : null;

      const utensilLabel =
        DRINK_OPTIONS.utensils.find((u) => u.id === utensil)?.label ||
        "Kèm dụng cụ ăn";

      const tempLabel = drink.servingTemp || "Dùng ngay";

      return {
        id: `${drink.id}-${fillingObj?.id || "default"}-${utensil}-${servingType}-${trimmedNote}`,
        drinkId: drink.id,
        customization: {
          filling: fillingObj?.id || null,
          servingTemp: tempLabel,
          utensil,
          servingType,
          note: trimmedNote,
        },
        name: fillingObj ? `${drink.name} (${fillingObj.label})` : drink.name,
        details: `${tempLabel} • ${utensilLabel} • ${servingLabel}${
          trimmedNote ? ` • "${trimmedNote}"` : ""
        }`,
        price: unitPrice,
        quantity,
        image: fillingObj?.image || drink.image,
      };
    }

    const toppingNames = selectedToppings
      .map((id) => DRINK_OPTIONS.toppings.find((t) => t.id === id)?.name)
      .filter(Boolean);

    return {
      id: `${drink.id}-${size}-${sweetness}-${ice}-${[...selectedToppings].sort().join(",")}-${servingType}-${trimmedNote}`,
      drinkId: drink.id,
      customization: {
        size,
        sweetness,
        ice,
        toppingIds: [...selectedToppings].sort(),
        servingType,
        note: trimmedNote,
      },
      name: `${drink.name} (${size})`,
      details: `${sweetness} ngọt • ${ice} • ${servingLabel}${
        toppingNames.length > 0 ? ` • +${toppingNames.join(", ")}` : ""
      }${trimmedNote ? ` • "${trimmedNote}"` : ""}`,
      price: unitPrice,
      quantity,
      image: drink.image,
    };
  };

  return {
    isBakery,
    size,
    setSize,
    sweetness,
    setSweetness,
    ice,
    setIce,
    selectedToppings,
    toggleTopping,
    selectedFilling,
    setSelectedFilling,
    utensil,
    setUtensil,
    servingType,
    setServingType,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    note,
    setNote,
    activeImage,
    unitPrice,
    totalPrice,
    resetCustomization,
    buildCartItem,
  };
}

export default useDrinkCustomization;
