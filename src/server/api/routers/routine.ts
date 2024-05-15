import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { routines } from "~/server/db/schema";

import "server-only";
import { auth } from "@clerk/nextjs/server";

export const routineRouter = createTRPCRouter({
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

      await ctx.db.insert(routines).values({
        name: input.name,
        user_id: user.userId,
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.routines.findFirst({
      orderBy: (routines, { desc }) => [desc(routines.createdAt)],
    });
  }),
});
