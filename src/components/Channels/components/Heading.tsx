import React from "react";
import { cva, VariantProps } from "class-variance-authority";

type Props = VariantProps<typeof headingStyles> & {
  children: React.ReactNode;
};

const headingStyles = cva("opacity-50 font-bold capitalize px-5", {
  variants: {
    size: {
      sm: "text-sm",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

const Heading: React.FC<Props> = ({ children, size }) => {
  return <div className={headingStyles({ size })}>{children}</div>;
};

export default Heading;
