"use client";

import { type ComponentProps, type ReactNode, useId } from "react";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends Omit<ComponentProps<"input">, "id"> {
  id?: string;
  label: string;
  icon?: ReactNode;
  trailing?: ReactNode;
  labelAction?: ReactNode;
  error?: string;
}

export function Input({
  id,
  label,
  icon,
  trailing,
  labelAction,
  error,
  className,
  ...props
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const errorId = `${inputId}-error`;

  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
        {labelAction}
      </div>

      <div className="relative">
        {icon && (
          <span
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-12 w-full rounded-xl border bg-raised px-4 text-sm text-ink transition-[border-color,box-shadow] duration-200",
            "placeholder:text-muted/70 focus:outline-none focus:border-accent focus:ring-4 focus:ring-accent-soft",
            icon && "pl-11",
            trailing && "pr-12",
            error && "border-danger focus:border-danger focus:ring-danger/10",
          )}
          {...props}
        />
        {trailing && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2">{trailing}</span>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-danger"
        >
          <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}
