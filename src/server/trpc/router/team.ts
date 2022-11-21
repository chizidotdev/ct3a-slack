import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { inferProcedureOutput, TRPCError } from "@trpc/server";
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

export const teamRouter = router({
  /**
   * CREATE TEAM MUTATION
   * */
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1).max(20) }))
    .mutation(async ({ input, ctx }) => {
      const team = await ctx.prisma.team.create({
        data: { ...input, userId: ctx.session.user.id },
        select: defaultTeamSelect,
      });
      await ctx.prisma.channel.createMany({
        data: [
          { name: "general", teamId: team.id },
          { name: "welcome", teamId: team.id },
        ],
      });
      return team;
    }),

  /**
   * GET ALL TEAMS
   * */
  getAll: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.prisma.team.findMany({
      where: {
        OR: [
          { userId },
          {
            users: {
              some: {
                id: userId,
              },
            },
          },
        ],
      },
      select: defaultTeamSelect,
    });
  }),

  /**
   * FIND BY ID
   * */
  findById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.team.findUnique({
        where: { id: input.id },
        select: defaultTeamSelect,
      });
    }),

  /**
   * ADD NEW USER
   * */
  addUser: protectedProcedure
    .input(z.object({ teamId: z.string(), email: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, teamId: id } = input;

      const user = await ctx.prisma.user.findUnique({
        where: { email },
      });

      if (!user)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `User with email "${email}" not found`,
        });

      return ctx.prisma.team.update({
        where: { id },
        data: {
          users: { connect: { email } },
        },
        select: defaultTeamSelect,
      });
    }),
});
