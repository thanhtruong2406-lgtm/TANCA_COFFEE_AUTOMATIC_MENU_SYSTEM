import { AnimatePresence, motion } from "motion/react";

function CategoryBackground({ category }) {
  if (!category) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: category.theme?.background || category.panelBg }}
    >
      <AnimatePresence>
        <motion.div
          key={category.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 50% 28%, ${category.accentColor}45 0%, ${category.panelBg}E6 48%, ${category.panelBg}F2 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, rgba(245, 235, 221, 0.45) 0%, ${category.panelBg}99 45%, rgba(245, 235, 221, 0.65) 100%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CategoryBackground;
