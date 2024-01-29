import { mutation,query } from "./_generated/server";
import { v } from "convex/values";


export const createWorkout = mutation({
  args: { workoutTitle: v.string(), userId: v.string()},
  handler: async (ctx, args) => {
    const { workoutTitle, userId } = args;
    await ctx.db.insert('workouts', {
      userId,
      workoutTitle,
    });
    // do something with `taskId`
  },
});

export const retrievePersonalWorkouts = query({
  args: { userId: v.string() },
  handler: async (ctx,args) => {
    const { userId } = args; 
    const workouts = await ctx.db
      .query('workouts')
      .filter((workouts) => workouts.eq(workouts.field('userId'), userId))
      .collect();
    return workouts;
  },
});