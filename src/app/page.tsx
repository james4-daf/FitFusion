"use client";
import React, { useState, useEffect } from 'react';
import { useAuth,useUser } from '@clerk/nextjs'
import {publicStaticData} from '../../publicStaticData'
import SocialPost from './components/SocialPost';
import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const allWorkouts= useQuery(api.workouts.retrieveALLWorkoutsInDescOrder)

  const {  userId} = useAuth();
  const { user } = useUser();
  const [dataLoaded, setDataLoaded] = useState(false);

console.log("data", allWorkouts)
  useEffect(() => {
    // Simulate a delay before setting the data as loaded
    const delay = setTimeout(() => {
      setDataLoaded(true)
    }, 1100); // Adjust the delay duration as needed

    // Clear the timeout on component unmount to avoid memory leaks
    return () => clearTimeout(delay);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center  p-8">
      {dataLoaded ? (
        allWorkouts?.map((post) => (
          <SocialPost key={post._id} id={post._id} WorkoutTitle={post.workoutTitle} TimeCreated={post._creationTime} likeCounter={post.likeCounter }/>
        ))
      ) : (
        // You can render a loading indicator while data is loading
        <div className=" items-center p-8">
            {allWorkouts?.map((post, index) => (
            <Skeleton className="h-14 w-[250px]" key={index} />
          ))
          }

        </div>
      )}
    </main>
  );
}
