import { classNames } from "@/ui.stylex";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(classNames.button149, {
  variants: {
    variant: {
      default: classNames.button150,
      outline: classNames.button151,
      secondary: classNames.button152,
      ghost: classNames.button153,
      destructive: classNames.button154,
      link: classNames.badge148,
    },
    size: {
      default: classNames.button155,
      xs: classNames.button156,
      sm: classNames.button157,
      lg: classNames.button158,
      icon: classNames.button159,
      "icon-xs": classNames.button160,
      "icon-sm": classNames.button161,
      "icon-lg": classNames.button162,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
