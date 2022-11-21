import { useTeam } from "@store/team-store";
import Image from "next/image";
import React from "react";
import AddUser from "./components/AddUser";
import Container from "./components/Container";
import CreateChannel from "./components/CreateChannel";
import Heading from "./components/Heading";
import List from "./components/List";
import { Props } from "./types";

const Channels: React.FC<Props> = ({ session }) => {
  const { activeTeam: team } = useTeam();

  if (!team)
    return <div className="bg-secondary p-5 text-white">No teams found...</div>;

  return (
    <section className="col-span-1 flex flex-col gap-7 bg-secondary py-5 text-white">
      <div className="px-5">
        <h1 className="text-lg capitalize">{team.name}</h1>
        <p className="text-sm opacity-50">{session.user?.email}</p>
      </div>

      <Container>
        <Heading>
          <div className="flex items-center justify-between">
            Channel <CreateChannel teamId={team.id} />
          </div>
        </Heading>

        <List data={team.channels}>
          {(channel) => (
            <>
              <span className="text-sm opacity-50">#</span>
              <p>{channel.name}</p>
            </>
          )}
        </List>
      </Container>

      <Container>
        <Heading>Direct messages</Heading>

        <List data={[...team.users, team.owner]}>
          {(user) => {
            if (user.id === session.user?.id) return null;
            return (
              <>
                <Image
                  src={user.image}
                  alt=""
                  width={20}
                  height={20}
                  className="rounded-md"
                />
                <p>{user.name}</p>
              </>
            );
          }}
        </List>
      </Container>

      <Container>
        <AddUser teamId={team.id} />
      </Container>
    </section>
  );
};

export default Channels;
