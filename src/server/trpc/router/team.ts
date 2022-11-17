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
  /*=== CREATE TEAM MUTATION ===*/
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(20),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // return true;
      return await ctx.prisma.team.create({
        data: { ...input, userId: ctx.session.user.id },
        select: defaultTeamSelect,
      });
    }),
  /*=== GET ALL TEAMS ===*/
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.team.findMany();
  }),
});
