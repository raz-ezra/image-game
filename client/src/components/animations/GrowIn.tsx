import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

const variants = {
  hidden: { scale: 0, opacity: 0, maxHeight: 0, maxWidth: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    maxHeight: 1000,
    maxWidth: 1000,
  },
};

export const GrowIn: FC<{
  children: ReactNode;
  id: string;
  isActive: boolean;
  duration?: number;
}> = ({ children, isActive, id, duration = 0.5 }) => {
  return (
    <motion.div
      layout
      key={id}
      variants={variants}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      transition={{ duration: isActive ? duration : duration / 2 }}
    >
      {children}
    </motion.div>
  );
};
