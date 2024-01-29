'use client'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '@clerk/nextjs'
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
import CreateWorkout from './CreateWorkout'




type Props = {}

function Navbar({}: Props) {

    const { userId } = useAuth();
  return (
    <div className='py-4'>
        <Link href="/" className='mx-10'>Home</Link>
        {userId ? <Link href="./profile">Profile</Link> : <Link href="./profile">Sign Up</Link>}
      <div className='absolute right-20 inset-y-4'>
      <CreateWorkout/>
      </div>
    </div>
  )
}

export default Navbar