import { motion } from "framer-motion";
import { containerVariants } from "../animations";

export default function Footer() {
  return (
    <motion.div
      className="mt-auto lg:w-[70vw] max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="mt-12 border-t border-gray-200 pt-8">
        <p className="text-base text-gray-400 xl:text-center">
          &copy; 2021 AM7 Digital. All rights reserved.
        </p>
      </div>
    </motion.div>
  );
}
