import { Button as ReactEmailButton } from "@react-email/components";
import { cva } from "class-variance-authority";

import { cn } from "@turbostarter/ui";

import type { ButtonProps as ReactEmailButtonProps } from "@react-email/components";
import type { VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "block whitespace-nowrap rounded-md text-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2.5",
        sm: "rounded-md px-3",
        lg: "rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type ButtonProps = ReactEmailButtonProps &
  VariantProps<typeof buttonVariants>;

export const Button = ({ variant, size, className, ...props }: ButtonProps) => {
  return (
    <ReactEmailButton
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
