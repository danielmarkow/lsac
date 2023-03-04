import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const linkCommentRoute = createTRPCRouter({
  createLinkComment: protectedProcedure
    .input(
      z.object({
        url: z.string().url(),
        comment: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { url, comment } = input;
      const userId = ctx.session?.user?.id;
      return ctx.prisma.linkComment.create({
        data: {
          user: { connect: { id: userId } },
          link: url,
          comment,
        },
      });
    }),
  getLinkComment: protectedProcedure
    .input(
      z.object({
        limit: z.number(),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor } = input;
      const userId = ctx.session?.user?.id;

      const linkComments = await ctx.prisma.linkComment.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: { userId },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (linkComments.length > limit) {
        const nextItem = linkComments.pop() as (typeof linkComments)[number];

        nextCursor = nextItem.id;
      }

      return {
        linkComments,
        nextCursor,
      };
    }),
});
