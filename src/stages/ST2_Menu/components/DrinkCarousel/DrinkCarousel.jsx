import DrinkCard from "../DrinkCard/DrinkCard.jsx";

function DrinkCarousel({
  drinks = [],
  accentColor = "#6B4F3A",
  selectedDrinkId,
  onSelectDrink,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {drinks.map((drink) => (
        <DrinkCard
          key={drink.id}
          drink={drink}
          accentColor={accentColor}
          isSelected={selectedDrinkId === drink.id}
          onSelect={onSelectDrink}
        />
      ))}
    </div>
  );
}

export default DrinkCarousel;
