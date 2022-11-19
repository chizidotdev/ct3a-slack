import { TeamProps } from "@router/team";
import React from "react";

type Props = {
  teams: TeamProps;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

const Teams: React.FC<Props> = ({ teams, setId }) => {
  return (
    <div className="col-span-1 border-r border-primary border-opacity-20 bg-secondary py-5 text-white">
      <ul className="flex flex-col items-center gap-4">
        {teams?.map((team) => (
          <li
            onClick={() => setId(team.id)}
            key={team.id}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-3xl bg-white bg-opacity-20 font-bold uppercase transition-all duration-200 ease-linear hover:rounded-lg"
          >
            {team.name.charAt(0)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
