import { TeamProps } from "@router/team";
import { Session } from "next-auth";

export type Props = { id: string; session: Session };

type Team = TeamProps[0];
export type ChannelProps = Team["channels"];
export type UserProps = Team["users"];
