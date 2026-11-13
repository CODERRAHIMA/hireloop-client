"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

function Switch({
  className,
  checked,
  onCheckedChange,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-input px-0.5 py-0.5 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring transition-colors duration-200 data-[state=checked]:bg-brand-accent data-[state=unchecked]:bg-input",
        className
      )}
      data-state={checked ? "checked" : "unchecked"}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none block w-5 h-5 rounded-full bg-white shadow-md ring-0 transition-transform duration-200 transform",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  );
}

export { Switch };
