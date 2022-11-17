import React from "react";
import { TeamProps } from "@router/team";

const Teams: React.FC<{ data: TeamProps }> = ({ data }) => {
  return (
    <div className="col-span-1 border-r border-primary border-opacity-20 bg-secondary py-5 text-white">
      <ul className="flex flex-col items-center gap-4">
        {data.map((team) => (
          <li
            key={team.id}
            className="flex h-10 w-10 items-center justify-center rounded-md border uppercase"
          >
            {team.name.charAt(0)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
