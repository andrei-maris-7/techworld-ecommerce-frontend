export const containerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    x: "-100vw",
    transition: { ease: "easeInOut", duration: 1 },
  },
};
