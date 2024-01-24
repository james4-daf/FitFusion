"use client";
import React, { useState } from 'react';
import { useAuth,useUser } from '@clerk/nextjs'
import moment from 'moment';
import GoalSection from './components/GoalSection';

interface Task {
  _id: string;
  text: string;
}

interface GoalEntry {
  endDate: string;
  goal: string;
  userId: string;
}
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";

function formatDateString(date: string): string {
  // Parse the input date string
  const parsedDate = moment(date, 'YYYY-MM-DD');

  // Format the date as "DD-MM-YY"
  return parsedDate.format('DD-MM-YY');
}


export default function Home() {

  const [goal, setGoal] = useState({
    endDate: '',
    goal: '',
  })
  const createGoal = useMutation(api.goals.createGoal)
  const allGoals = useQuery(api.goals.retrieveAllGoals)
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  //const tasks  = useQuery(api.tasks.get);



  function addGoal(e: React.FormEvent) {
    e.preventDefault()
    const formattedDate = formatDateString(goal.endDate);
    const goalEntry: GoalEntry = {
      endDate: formattedDate,
      goal: goal.goal,
      userId: userId
    };

    // Call the mutation with the formatted data
    createGoal(goalEntry);
    // setDaily({ date: '', weight: 0 });
    // setShowWeightInput((prev) => !prev)

  }
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      {/* {tasks?.map(({ _id, text }: Task) => (
        <div key={_id}>{text}</div>
      ))} */}
      {userId ? <Link href='/account'>View {user?.firstName} account</Link> : <Link href='/account'>Sign up</Link> 
      }
      <form onSubmit={addGoal}>
        
        <label>Your goal</label>
        <input required type='text' name='goal' className='border border-cyan-500' onChange={(e) => setGoal({...goal, goal:e.target.value})} value={goal.goal}/>
        {/* <input required placeholder='enter weight e.g. 170lbs' type='number' name='weight' className='border border-cyan-500' onChange={(e) => setWeight(e.target.value)} value={weight} /> */}
        <label>By when</label>
        <input type='date' required name='endDate' className='border border-cyan-500' onChange={(e) => setGoal({ ...goal, endDate: e.target.value })} value={goal.endDate} />
        <button type='submit' className='border-4 border-amber-400 rounded-md hover:bg-blue-500'>Enter</button>
      </form>
     {allGoals?.map((goal) => {
       return <p>{`${goal.goal} by ${goal.endDate} `}</p>
     })}`

    <GoalSection/>

    </main>
  );
}
