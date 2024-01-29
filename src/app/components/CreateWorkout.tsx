'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { useMutation, useQuery } from "convex/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from '../../../convex/_generated/api'
import { toast } from "sonner"


interface workoutEntry {
    workoutTitle: string;
    userId: string;
}

type Props = {}

function CreateWorkout({}: Props) {

    const { userId } = useAuth();
    const [workoutData, setWorkoutData] = useState({
        workoutTitle: ''
    })

    const createWorkout = useMutation(api.workouts.createWorkout);

    function submitAddWorkout(e: React.FormEvent) {
        e.preventDefault()
        const workoutEntry: workoutEntry = {
            workoutTitle: workoutData.workoutTitle,
            userId: userId
        };
        createWorkout(workoutEntry)
        setWorkoutData({
            workoutTitle:''
        })
        toast("Workout has been created", {
            description: `Workout Title: ${workoutData.workoutTitle}`,
            action: {
                label: "Undo",
                onClick: () => console.log("Undo"),
            },
        })
    }
  return (
      <div>
        <Dialog>
          <DialogTrigger asChild>
              <Button variant="outline">Add Workout +</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={submitAddWorkout}>
              <DialogHeader>
                  <DialogTitle>Add Workout</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                          Workout Title
                      </Label>
                          <Input id="workoutTitle" name='workoutTitle' value={workoutData.workoutTitle} onChange={(e) => setWorkoutData({ ...workoutData, workoutTitle: e.target.value })} className="col-span-3" />
                  </div>
              </div>
              <DialogFooter>
                          <DialogTrigger asChild>
                            
                  <Button type="submit">Save changes</Button>
                          </DialogTrigger>
              </DialogFooter>
          </form>
          </DialogContent>
      </Dialog>
      </div>
  )
}

export default CreateWorkout