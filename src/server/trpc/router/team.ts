import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const defaultTeamSelect = Prisma.validator<Prisma.TeamSelect>()({
  id: true,
  name: true,
  userId: true,
  owner: true,
  users: true,
  channels: true,
});

export const teamRouter = router({
  create: protectedProcedure
    .input(
      z
        .object({
          id: z.string().uuid().optional(),
          title: z.string().min(1).max(32),
          text: z.string().min(1),
        })
        .nullish()
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
