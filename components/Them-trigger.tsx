"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const [transitionTheme, setTransitionTheme] = useState<"light" | "dark">(
    "dark"
  );
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleThemeToggle = useCallback(() => {
    if (isAnimating) return;

    const nextTheme = theme === "light" ? "dark" : "light";
    setTransitionTheme(nextTheme);
    setIsAnimating(true);

    // Change theme at the midpoint of animation for seamless transition
    setTimeout(() => {
      setTheme(nextTheme);
    }, 500);

    // End animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  }, [theme, isAnimating, setTheme]);

  //   only render the button when not in the top of the web page
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    !isTop && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Button
          ref={buttonRef}
          variant="ghost"
          size="icon"
          onClick={handleThemeToggle}
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full z-50"
          aria-label="Toggle dark mode"
        >
          {theme === "dark" ? (
            <Sun className="w-8 h-8" />
          ) : (
            <Moon className="w-8 h-8" />
          )}
        </Button>
        <ThemSwitchTransition
          isAnimating={isAnimating}
          targetTheme={transitionTheme}
          buttonRef={buttonRef}
        />
      </motion.div>
    )
  );
}

/**
 * Add a smooth transition when switching themes
 * A white or black like fluid starting from the center of the button and expanding to cover the screen
 */
function ThemSwitchTransition({
  isAnimating,
  targetTheme,
  buttonRef,
}: {
  isAnimating: boolean;
  targetTheme: "light" | "dark";
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}) {
  if (!isAnimating) return null;

  // Calculate the maximum radius needed to cover the entire screen
  const getExpandRadius = () => {
    if (typeof window === "undefined") return 2000;
    return Math.max(window.innerWidth, window.innerHeight) * 1.5;
  };

  // Get button position for the animation origin
  const getButtonPosition = () => {
    if (!buttonRef.current) {
      return {
        x: 48,
        y: typeof window !== "undefined" ? window.innerHeight - 48 : 48,
      };
    }
    const rect = buttonRef.current.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const pos = getButtonPosition();
  const maxRadius = getExpandRadius();

  return (
    <div
      className="fixed inset-0 pointer-events-none z-100"
      style={{
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: maxRadius * 2,
          height: maxRadius * 2,
          marginLeft: -maxRadius,
          marginTop: -maxRadius,
          borderRadius: "50%",
          backgroundColor: targetTheme === "dark" ? "#0a0a0a" : "#fafafa",
          transform: "scale(0)",
          animation: "theme-expand 800ms cubic-bezier(0.4, 0, 0.2, 1) forwards",
        }}
      />
      <style jsx>{`
        @keyframes theme-expand {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
