import { useQuery } from 'convex/react'
import React, { useState } from 'react'
import { api } from '../../../convex/_generated/api'
import {  useAuth } from "@clerk/nextjs";
import SocialPost from './SocialPost';

type Props = {}
interface user {
  userId: string
}

function ProfileWorkouts({}: Props) {
  const { userId } = useAuth();

  const retrieveMyWorkouts = useQuery(api.workouts.retrievePersonalWorkouts, {userId})
  
  if(userId) console.log("data",retrieveMyWorkouts)
  return (
    <div>
      <h2>My workouts</h2>
      {userId && retrieveMyWorkouts?.map((workout, i) => {
        return <SocialPost key={i} WorkoutTitle={workout.workoutTitle}/>
      })
      }
    </div>
  )
}

export default ProfileWorkouts