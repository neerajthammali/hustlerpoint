
'use client';

import { useEffect } from 'react';
import { useFirebase, useUser } from '@/firebase/provider';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';

export function useAuth() {
  const { auth } = useFirebase();
  const { user, isUserLoading, userError } = useUser();

  useEffect(() => {
    // If the user state has been checked and there is no user,
    // initiate a non-blocking anonymous sign-in.
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  return { user, isUserLoading, userError };
}
