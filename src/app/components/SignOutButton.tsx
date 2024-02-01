import { useClerk } from '@clerk/clerk-react';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const { signOut } = useClerk();
  const router = useRouter();

  function signOutAction() {
    router.push('/');
    signOut();
  }
  return <button onClick={signOutAction}>Sign out</button>;
}
