function DrinkIngredients({ ingredients }) {
  return (
    <div className="border-b border-brown/15 py-4">
      <h4 className="font-handwritten text-base font-bold text-brown sm:text-lg">
        Nguyên liệu
      </h4>
      <p className="mt-1.5 text-sm leading-relaxed text-brown/75 sm:text-base">
        {ingredients}
      </p>
    </div>
  );
}

export default DrinkIngredients;
