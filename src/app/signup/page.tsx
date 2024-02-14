"use client";
import React from 'react'
import InputForm from '@/components/inputform'
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function SignupPage() {
  const router = useRouter();
  return (
    <div className='text-sm h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl mb-3'>Sign Up now!</h1>
      <InputForm />
      <h1 className='mt-6'>Already have an account?</h1>
      <Button variant="link" onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button className="absolute bottom-3" variant="link" onClick={() => console.log('google')}>
        Sign Up with Google
      </Button>
    </div>
  )
}