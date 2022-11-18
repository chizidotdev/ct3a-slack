import React from "react";
import { ChannelProps, UserProps } from "../types";

type Props = {
  data: ChannelProps | UserProps;
  children: (i: Props["data"][0]) => React.ReactNode;
};

const List = ({ data, children }: Props) => {
  return (
    <ul className="flex flex-col gap-1">
      {data.map((item) => (
        <li
          key={item.id}
          className="flex items-center gap-2 px-5 transition-all hover:bg-accent hover:bg-opacity-20"
        >
          {children(item)}
        </li>
      ))}
    </ul>
  );
};

export default List;
