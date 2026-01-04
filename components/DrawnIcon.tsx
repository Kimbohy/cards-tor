"use client";
import { motion } from "motion/react";

interface DrawnIconProps {
  type: "sun" | "moon" | "menu";
  size?: number;
  className?: string;
}

export function DrawnIcon({ type, size = 24, className = "" }: DrawnIconProps) {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          type: "spring" as const,
          duration: 1.5,
          bounce: 0,
        },
        opacity: { duration: 0.5 },
      },
    },
    exit: {
      pathLength: 0,
      opacity: 0,
      transition: {
        pathLength: { duration: 0.8 },
        opacity: { duration: 0.3 },
      },
    },
  };

  if (type === "sun") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        {/* Center circle */}
        <motion.circle
          cx="12"
          cy="12"
          r="4"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        />
        {/* Sun rays */}
        <motion.path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ delay: 0.2 }}
        />
      </svg>
    );
  }

  if (type === "moon") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <motion.path
          d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        />
      </svg>
    );
  }

  if (type === "menu") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <motion.line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        />
        <motion.line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ delay: 0.3 }}
        />
        <motion.line
          x1="3"
          y1="18"
          x2="21"
          y2="18"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ delay: 0.6 }}
        />
      </svg>
    );
  }

  return null;
}
