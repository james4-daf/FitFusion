import React from 'react'
import { Button } from "@/components/ui/button"
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

function GoalSection() {
  return (
      <div> <Dialog>
          <DialogTrigger asChild>
              <Button variant="outline">Add a goal</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                  <DialogTitle>Add a goal</DialogTitle>
                  <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                  </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                          Goal
                      </Label>
                      <Input id="name" className="col-span-3" placeholder='E.g...bench 3 plates for 10 reps'/>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                          Achieve by
                      </Label>
                      <Input id="username" type='date' className="col-span-3" />
                  </div>
              </div>
              <DialogFooter>
                  <Button type="submit">Save goal</Button>
              </DialogFooter>
          </DialogContent>
      </Dialog>
          </div>
  )
  }

export default GoalSection