"use client";
import React from 'react'
import InputForm from '@/components/inputform'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className='text-sm h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl mb-3'>Log in now!</h1>
      <InputForm />
      <h1 className='mt-6'>Don	&apos;t have an account yet?</h1>
      <Button variant="link" onClick={() => router.push("/signup")}>
        Signup
      </Button>
      <Button className="absolute bottom-3" variant="link" onClick={() => console.log('google')}>
        Log In with Google
      </Button>
    </div>
  )
}