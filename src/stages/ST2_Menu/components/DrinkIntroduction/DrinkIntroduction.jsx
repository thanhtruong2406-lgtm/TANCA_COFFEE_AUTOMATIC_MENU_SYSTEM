function DrinkIntroduction({ story }) {
  return (
    <div className="border-b border-brown/15 pb-4">
      <h3 className="font-handwritten text-xl font-bold italic text-brown sm:text-2xl">
        Câu chuyện hương vị
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-brown/75 sm:text-base">
        {story}
      </p>
    </div>
  );
}

export default DrinkIntroduction;
