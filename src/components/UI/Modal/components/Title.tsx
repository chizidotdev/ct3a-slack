import { Dialog } from "@headlessui/react";
import React from "react";

type TitleProps = {
  children: React.ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return (
    <Dialog.Title as="h3" className="font-medium leading-6 text-gray-900">
      {children}
    </Dialog.Title>
  );
};

export default Title;
