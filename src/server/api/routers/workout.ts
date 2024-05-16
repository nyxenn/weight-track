import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { workouts } from "~/server/db/workout";

import "server-only";
import { auth } from "@clerk/nextjs/server";

export const workoutRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const user = auth();
      if (!user?.userId) throw new Error("Unauthorized");

      await ctx.db.insert(workouts).values({
        name: input.name,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.workouts.findFirst({
      orderBy: (workouts, { desc }) => [desc(workouts.createdAt)],
    });
  }),
});
