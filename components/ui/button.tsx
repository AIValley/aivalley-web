import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        {
          primary:
            "bg-primary text-primary-foreground shadow-[0_0_20px_-6px_var(--primary)] hover:opacity-90",
          outline:
            "border border-border bg-transparent text-foreground hover:bg-foreground/5",
          ghost: "text-foreground hover:bg-foreground/5",
        }[variant],
        {
          sm: "h-8 px-3 text-sm",
          md: "h-10 px-4 text-sm",
          lg: "h-11 px-6 text-base",
        }[size],
        className
      )}
      {...props}
    />
  );
}
