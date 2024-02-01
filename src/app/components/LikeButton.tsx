'use client';
import React from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button } from '@/components/ui/button';
import { SignedIn, SignIn } from '@clerk/clerk-react';
import { useAuth, RedirectToSignIn } from '@clerk/nextjs';

import { useRouter } from 'next/navigation';
interface LikeButton {
  id: string;
  likeCounter: number;
}

function LikeButton(props: LikeButton) {
  const { userId } = useAuth();
  const { likeCounter, id } = props;
  const router = useRouter();
  const updateLikeCounter = useMutation(api.workouts.updateWorkoutLikeCounter);
  function increaseLikeCounter(updateMethod: string) {
    updateLikeCounter({ id, updateMethod });
  }

  const handleInteraction = (updateMethod: string) => {
    if (userId) {
      updateLikeCounter({ id, updateMethod });
    } else {
      router.push('/profile'); // Prompt user to sign in
    }
  };
  return (
    <div>
      {likeCounter > 0 ? (
        <Button variant="outline" onClick={() => handleInteraction('decrease')}>
          {likeCounter}
        </Button>
      ) : (
        <Button onClick={() => handleInteraction('increase')}>Like</Button>
      )}
    </div>
  );
}
export default LikeButton;
