'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { SignOutButton,useUser ,useAuth} from "@clerk/nextjs";

import React, { useState } from 'react';
import GoalSection from '../components/GoalSection';
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import moment from 'moment'
interface GoalEntry {
    endDate: string;
    goal: string;
    userId: string;
}

interface focusGoals {
    focusGoals: string[];
}

export default function Page() {
    const { userId } = useAuth();
    const { user } = useUser();
    const [goal, setGoal] = useState({
        endDate: '',
        goal: '',
    })

    const [showGoalForm, setShowGoalForm] =useState(false)
    const createGoal = useMutation(api.goals.createGoal)
    const allGoals = useQuery(api.goals.retrieveAllGoals)

    function formatDateString(date: string): string {
        // Parse the input date string
        const parsedDate = moment(date, 'YYYY-MM-DD');

        // Format the date as "DD-MM-YY"
        return parsedDate.format('DD-MM-YY');
    }

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
        setGoal({
            endDate: '',
            goal: '',
        })
        setShowGoalForm(false)
    }
    return (

        <div className="flex justify-center mt-4">
        <Card className="max-w-xl w-full ">
                <CardContent className=" justify-center">
                    <p>{user?.firstName}</p>
                    <p>Your goals</p>
                    {showGoalForm ?
                    <form onSubmit={addGoal}>

                        <label>Your goal</label>
                        <input required type='text' name='goal' className='border border-cyan-500' onChange={(e) => setGoal({ ...goal, goal: e.target.value })} value={goal.goal} />
                        {/* <input required placeholder='enter weight e.g. 170lbs' type='number' name='weight' className='border border-cyan-500' onChange={(e) => setWeight(e.target.value)} value={weight} /> */}
                        <label>By when</label>
                        <input type='date' required name='endDate' className='border border-cyan-500' onChange={(e) => setGoal({ ...goal, endDate: e.target.value })} value={goal.endDate} />
                        <button type='submit' className='border-4 border-amber-400 rounded-md hover:bg-blue-500'>Enter</button>
                    </form>
                        :
                        <Button onClick={() => setShowGoalForm(true)}>Add goal</Button>
                    }
                    {userId && allGoals?.map((goal, i) => {
                        return <p key={i}>{`${goal.goal} by ${goal.endDate} `}</p>
                    })}
                    <GoalSection />


                    <Button className="my-4"><SignOutButton /></Button>
        </CardContent>
        </Card>
        </div>
    )

}