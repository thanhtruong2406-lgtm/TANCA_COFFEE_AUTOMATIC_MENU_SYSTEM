
import { motion } from "motion/react";
import { Coffee } from "lucide-react";

function IntroBrand() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -25,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="flex flex-col items-center text-center text-[#6B4F3A]"
    >
      <Coffee
        size={44}
        strokeWidth={2}
        className="mb-3"
      />

      <h1 className="text-4xl font-bold tracking-[0.12em] sm:text-5xl lg:text-6xl">
        TANCA
      </h1>

      <h2 className="mt-1 text-xl font-bold tracking-[0.32em] sm:text-3xl">
        COFFEE
      </h2>

      <p className="mt-3 text-sm font-medium sm:text-lg">
        A warm cup, a calm moment.
      </p>
    </motion.div>
  );
}

export default IntroBrand;
