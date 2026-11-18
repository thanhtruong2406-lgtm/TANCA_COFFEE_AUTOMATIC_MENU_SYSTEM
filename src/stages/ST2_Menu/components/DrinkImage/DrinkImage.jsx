function DrinkImage({ drink, panelBg = "#E6ECD8" }) {
  if (!drink) return null;

  return (
    <div
      className="flex flex-col items-center justify-between rounded-2xl p-5 sm:p-7"
      style={{ backgroundColor: panelBg }}
    >
      <div className="w-full overflow-hidden rounded-xl shadow-md">
        <img
          src={drink.image}
          alt={drink.name}
          draggable={false}
          className="aspect-[4/4.3] h-full w-full select-none object-cover"
        />
      </div>

      <p className="mt-4 text-center text-lg font-semibold italic tracking-wide text-brown sm:text-xl">
        {drink.name}
      </p>
    </div>
  );
}

export default DrinkImage;
