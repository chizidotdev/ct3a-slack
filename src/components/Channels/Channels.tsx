import React from "react";
import { trpc } from "src/utils/trpc";
import Container from "./components/Container";
import Heading from "./components/Heading";
import List from "./components/List";
import { Props } from "./types";

const Channels: React.FC<Props> = ({ id, session }) => {
  const { data: team } = trpc.team.findById.useQuery({ id });

  if (!team)
    return <div className="bg-secondary p-5 text-white">No teams found...</div>;

  return (
    <section className="col-span-1 flex flex-col gap-7 bg-secondary py-5 text-white">
      <div className="px-5">
        <h1 className="text-lg capitalize">{team.name}</h1>
        <p className="text-sm opacity-50">{session.user?.email}</p>
      </div>

      <Container>
        <Heading>Channel</Heading>

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

        <List data={team.users}>
          {(user) => (
            <>
              <span className="text-sm opacity-50">-</span>
              <p>{user.name}</p>
            </>
          )}
        </List>
      </Container>
    </section>
  );
};

export default Channels;
