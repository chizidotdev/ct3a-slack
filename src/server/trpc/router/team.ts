import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "./_app";

const defaultTeamSelect = Prisma.validator<Prisma.TeamSelect>()({
  id: true,
  name: true,
  userId: true,
  owner: true,
  users: true,
  channels: true,
});

export type TeamProps = inferProcedureOutput<AppRouter["team"]["getAll"]>;
export type ActiveTeamProps = inferProcedureOutput<
  AppRouter["team"]["findById"]
>;

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
  getAll: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.team.findMany({
      where: { userId },
      select: defaultTeamSelect,
    });
  }),
  /*=== FIND BY ID ===*/
  findById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.team.findUnique({
        where: { id: input.id },
        select: defaultTeamSelect,
      });
    }),
});
