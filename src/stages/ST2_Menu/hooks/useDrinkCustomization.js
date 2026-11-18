import { useMemo, useState } from "react";
import { DRINK_OPTIONS } from "../data/drinks.js";

function useDrinkCustomization(drink) {
  const [size, setSize] = useState(DRINK_OPTIONS.sizes[0].id);
  const [sweetness, setSweetness] = useState("70%");
  const [ice, setIce] = useState("Bình thường");
  const [selectedToppings, setSelectedToppings] = useState([]);
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
    setServingType("dine-in");
    setQuantity(1);
    setNote("");
  };

  const unitPrice = useMemo(() => {
    if (!drink) return 0;

    const sizeObj = DRINK_OPTIONS.sizes.find((s) => s.id === size);
    const sizeExtra = sizeObj ? sizeObj.extraPrice : 0;

    const toppingsExtra = selectedToppings.reduce((sum, toppingId) => {
      const toppingObj = DRINK_OPTIONS.toppings.find((t) => t.id === toppingId);
      return sum + (toppingObj ? toppingObj.price : 0);
    }, 0);

    return drink.price + sizeExtra + toppingsExtra;
  }, [drink, size, selectedToppings]);

  const totalPrice = useMemo(() => {
    return unitPrice * quantity;
  }, [unitPrice, quantity]);

  const buildCartItem = () => {
    if (!drink) return null;

    const toppingNames = selectedToppings
      .map((id) => DRINK_OPTIONS.toppings.find((t) => t.id === id)?.name)
      .filter(Boolean);

    const servingLabel =
      DRINK_OPTIONS.servingTypes.find((s) => s.id === servingType)?.label ||
      "Tại chỗ";

    return {
      id: `${drink.id}-${size}-${sweetness}-${ice}-${[...selectedToppings].sort().join(",")}-${servingType}-${note.trim()}`,
      drinkId: drink.id,
      customization: { size, sweetness, ice, toppingIds: [...selectedToppings].sort(), servingType, note: note.trim() },
      name: `${drink.name} (${size})`,
      details: `${sweetness} ngọt • ${ice} • ${servingLabel}${
        toppingNames.length > 0 ? ` • +${toppingNames.join(", ")}` : ""
      }${note.trim() ? ` • "${note.trim()}"` : ""}`,
      price: unitPrice,
      quantity,
      image: drink.image,
    };
  };

  return {
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
    unitPrice,
    totalPrice,
    resetCustomization,
    buildCartItem,
  };
}

export default useDrinkCustomization;
