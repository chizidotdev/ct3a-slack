import { TeamProps } from "@router/team";
import React, { createContext, useContext, useState } from "react";
import { trpc } from "src/utils/trpc";

type TTeamProps = {
  children: React.ReactNode;
};

type TeamContextProps = {
  teams: TeamProps;
  activeTeam: TeamProps[0] | null;
  setActiveTeamId: React.Dispatch<React.SetStateAction<string>>;
};

const TeamContext = createContext<TeamContextProps>({
  activeTeam: null,
  teams: [],
  setActiveTeamId: () => null,
});

export const TeamProvider = ({ children }: TTeamProps) => {
  const [activeTeamId, setActiveTeamId] = useState("");
  const { data: teams } = trpc.team.getAll.useQuery(undefined, {
    onSuccess(data) {
      if (data[0] !== undefined) setActiveTeamId(data[0].id);
    },
  });
  const { data: team } = trpc.team.findById.useQuery({ id: activeTeamId });

  return (
    <TeamContext.Provider
      value={{
        setActiveTeamId,
        activeTeam: team || null,
        teams: teams || [],
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
