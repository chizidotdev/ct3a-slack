import { cva, VariantProps } from "class-variance-authority";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof headingStyles> & {
    children: React.ReactNode;
    className?: never;
  };

const headingStyles = cva("px-5 py-1.5 rounded-md font-medium transition-all", {
  variants: {
    size: {
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
    },
    intent: {
      primary: "bg-secondary text-primary hover:bg-opacity-90",
      secondary: "bg-primary text-accent border hover:bg-opacity-50",
    },
  },
  defaultVariants: {
    size: "sm",
    intent: "primary",
  },
});

const Button = ({ children, size, intent, className, ...props }: Props) => {
  return (
    <button className={headingStyles({ size, intent, className })} {...props}>
      {children}
    </button>
  );
};

export default Button;
