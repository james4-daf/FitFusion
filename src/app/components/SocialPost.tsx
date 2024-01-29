import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import FocusGoalBadge from './FocusGoalBadge'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'


interface SocialPost {
    id:string,
    Username?: string,
    WorkoutTitle: string,
    Focuses?: string[],
    TimeCreated:string,
    likeCounter:number
}

function SocialPost(props: SocialPost) {

    const { Username, WorkoutTitle, Focuses, TimeCreated, likeCounter,id } = props
    const date = new Date(TimeCreated);

    const hour = date.getHours();
    const minute = date.getMinutes();
    const dayOfMonth = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });

    const formattedDate = `${hour}:${minute} ${dayOfMonth},${month}`;
    const updateLikeCounter = useMutation(api.workouts.updateWorkoutLikeCounter)
    function increaseLikeCounter(updateMethod:string) {
        updateLikeCounter({id, updateMethod})
     }
  return (
      <Card className='my-2  w-full max-w-screen-md'>
          <CardHeader>
            <div className='flex '>
                  <CardTitle className='pr-4'>{WorkoutTitle}</CardTitle>
              {Focuses?.map((focus,i) => {
                  return <FocusGoalBadge key={i} className='mr-2'>{focus}</FocusGoalBadge>
                })}
            </div>
              <CardDescription>{Username}</CardDescription>
          </CardHeader>
          <CardContent className='flex'>
          </CardContent>
          <CardFooter>
              {likeCounter > 0 ?
                  < Button onClick={() => increaseLikeCounter('decrease')}>{likeCounter > 0 ? likeCounter : null} Like</Button> :
              <Button onClick={()=> increaseLikeCounter('increase')}>{likeCounter >0 ? likeCounter:null} Like</Button>
              }
              <p>{formattedDate}</p>
          </CardFooter>
      </Card>
  )
}

export default SocialPost