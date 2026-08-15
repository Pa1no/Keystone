"use client";

import { type ComponentProps, type ReactNode } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        "inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl px-5 text-sm font-medium",
        "transition-[background-color,box-shadow,transform,filter] duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        "disabled:cursor-not-allowed disabled:opacity-70",
        variant === "primary" &&
          "bg-ink text-bg shadow-sm hover:-translate-y-px hover:shadow-md hover:brightness-125 active:translate-y-0 active:scale-[0.99]",
        variant === "ghost" && "border border-line bg-transparent text-ink hover:bg-raised hover:shadow-sm",
        className,
      )}
      {...props}
    >
      {loading && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
