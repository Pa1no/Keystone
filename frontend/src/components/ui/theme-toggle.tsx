"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Ativar modo claro" : "Ativar modo escuro";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full",
        "border border-line bg-surface/80 text-muted backdrop-blur transition-colors duration-200 hover:text-ink",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      <Sun
        aria-hidden="true"
        className={cn(
          "h-[18px] w-[18px] transition-all duration-300",
          isDark
            ? "translate-y-0 rotate-0 opacity-100"
            : "pointer-events-none absolute -translate-y-6 rotate-90 opacity-0",
        )}
      />
      <Moon
        aria-hidden="true"
        className={cn(
          "h-[18px] w-[18px] transition-all duration-300",
          !isDark
            ? "translate-y-0 rotate-0 opacity-100"
            : "pointer-events-none absolute translate-y-6 -rotate-90 opacity-0",
        )}
      />
    </button>
  );
}
