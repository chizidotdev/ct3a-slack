import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "./_app";

const defaultChannelSelect = Prisma.validator<Prisma.ChannelSelect>()({
  id: true,
  name: true,
  public: true,
  messages: true,
});

export type ChannelProps = inferProcedureOutput<
  AppRouter["channel"]["findById"]
>;

export const channelRouter = router({
  /*=== CREATE CHANNEL ===*/
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(20),
        teamId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const channel = await ctx.prisma.channel.create({
        data: input,
        select: defaultChannelSelect,
      });
      return channel;
    }),
  /*=== FIND BY ID ===*/
  findById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.channel.findUnique({
        where: { id: input.id },
        select: defaultChannelSelect,
      });
    }),
});
