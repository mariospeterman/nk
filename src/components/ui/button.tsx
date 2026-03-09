"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[13px] text-sm font-semibold transition-colors duration-150 outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-action text-white hover:bg-action-strong focus-visible:ring-2 focus-visible:ring-action/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        brand:
          "bg-brand text-white hover:bg-brand-strong focus-visible:ring-2 focus-visible:ring-brand/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-2 focus-visible:ring-destructive/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        outline:
          "border border-border bg-card text-foreground hover:border-action/30 hover:bg-action-tint/45 focus-visible:ring-2 focus-visible:ring-action/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        ghost:
          "text-foreground hover:bg-muted focus-visible:ring-2 focus-visible:ring-action/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        link: "text-action underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 rounded-[12px] px-3 text-[13px]",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
