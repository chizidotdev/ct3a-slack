// src/pages/_app.tsx
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import { TeamProvider } from "@store/team-store";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}) => {
  return (
    <SessionProvider>
      <TeamProvider>
        <Component {...pageProps} />
      </TeamProvider>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
