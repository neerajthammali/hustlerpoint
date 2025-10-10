
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@/firebase';
import { useEffect } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleLogin = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (e: any) {
      if (e.code === 'auth/user-not-found') {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          router.push('/admin');
        } catch (e: any) {
          setError(e.message);
        }
      } else {
        setError(e.message);
      }
    }
  };
  
  if (isUserLoading || user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account. For this demo, use the test credentials provided or create a new account if it doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
