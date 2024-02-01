import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createGoal = mutation({
  args: { goal: v.string(), userId: v.string(), endDate: v.string() },
  handler: async (ctx, args) => {
    const { goal, userId, endDate } = args;
    await ctx.db.insert('goals', {
      userId,
      goal,
      endDate,
    });
    // do something with `taskId`
  },
});

export const retrievePersonalGoals = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const { userId } = args;
    const goals = await ctx.db
      .query('goals')
      .filter((goals) => goals.eq(goals.field('userId'), userId))
      .collect();
    return goals;
  },
});
