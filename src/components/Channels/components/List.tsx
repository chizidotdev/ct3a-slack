import React from "react";
import { ChannelProps, UserProps } from "../types";

type Props = {
  data: ChannelProps | UserProps;
  children: (i: Props["data"][0]) => React.ReactNode;
};

const List = ({ data, children }: Props) => {
  return (
    <ul className="flex flex-col gap-2">
      {data.map((item) => (
        <li
          key={item.id}
          className="flex cursor-pointer items-center gap-2 px-5 py-1 transition-all hover:bg-accent hover:bg-opacity-20"
        >
          {children(item)}
        </li>
      ))}
    </ul>
  );
};

export default List;
