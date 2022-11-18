import React from "react";

type ContainerProps = React.ComponentPropsWithoutRef<"div"> & {
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
