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


interface SocialPost {
    Username: string,
    WorkoutTitle: string,
    Focuses: string[]
}

function SocialPost(props: SocialPost) {

    const { Username, WorkoutTitle, Focuses } = props
  return (
      <Card className='my-2  w-full max-w-screen-md'>
          <CardHeader>
            <div className='flex '>
                  <CardTitle className='pr-4'>{WorkoutTitle}</CardTitle>
              {Focuses.map((focus,i) => {
                  return <FocusGoalBadge key={i} className='mr-2'>{focus}</FocusGoalBadge>
                })}
            </div>
              <CardDescription>{Username}</CardDescription>
          </CardHeader>
          <CardContent className='flex'>
          </CardContent>
          <CardFooter>
              <p>Like</p>
          </CardFooter>
      </Card>
  )
}

export default SocialPost