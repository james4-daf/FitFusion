import { mutation,query } from "./_generated/server";
import { v } from "convex/values";


export const createWorkout = mutation({
  args: { workoutTitle: v.string(), userId: v.string(), likeCounter:v.number()},
  handler: async (ctx, args) => {
    const { workoutTitle, userId } = args;
    await ctx.db.insert('workouts', {
      userId,
      workoutTitle,
      likeCounter: 0
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

export const retrieveALLWorkoutsInDescOrder = query({
  handler: async (ctx) => {
    // Get all messages, newest to oldest.
    const workouts = await ctx.db.query('workouts').order('desc').collect();
    return workouts;
  },
});

export const updateWorkoutLikeCounter = mutation({
  args: { id: v.id('workouts'), updateMethod: v.string() },
  handler: async (ctx, args) => {
    const { id, updateMethod } = args;

    const existingWorkout = await ctx.db.get(id);
    let newLikeCounterValue;

    if (updateMethod === 'increase') {
      // Increase by 1
      newLikeCounterValue = (existingWorkout.likeCounter || 0) + 1;
    } else if (updateMethod === 'decrease') {
      // Decrease by 1, but not below 0
      newLikeCounterValue = Math.max((existingWorkout.likeCounter || 0) - 1, 0);
    } else {
      // Invalid updateMethod, do nothing
      return;
    }

    await ctx.db.patch(id, { likeCounter: newLikeCounterValue });
  },
});