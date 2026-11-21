import CategoryCard from "../CategoryCard/CategoryCard.jsx";
import categories from "../../data/categories.js";

function CategoryList({ onSelectCategory }) {
  return (
    <div
      className="
        mx-auto grid
        w-full max-w-[890px]

        grid-cols-2
        sm:grid-cols-3
        lg:grid-cols-6

        gap-3 lg:gap-4

        mt-4
        px-2
      "
    >
      {/* Hiển thị 5 danh mục đồ uống */}
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onClick={onSelectCategory}
        />
      ))}
    </div>
  );
}

export default CategoryList;