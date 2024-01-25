'use client'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '@clerk/nextjs'



type Props = {}

function Navbar({}: Props) {

    const { userId } = useAuth();
  return (
    <div className='py-4'>
        <Link href="/" className='mx-10'>Home</Link>
          {userId ? <Link href="./profile">Profile</Link> : <Link href="./profile">Sign Up</Link>}
          

    </div>
  )
}

export default Navbar