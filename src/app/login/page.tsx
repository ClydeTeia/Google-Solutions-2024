"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase/config';

import { signInWithEmailAndPassword } from "firebase/auth";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginFormSchema } from '@/components/schema';
import { UserAuth } from '../context/firebaseContext';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const { user, googleSignIn, logOut, emailSignIn } = UserAuth();
  const router = useRouter();

  if (user) router.push("/")

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/")
    } catch (error) {
      console.error(error);
    }
  };

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    try {
      console.log(data);
      await emailSignIn(data.email, data.password);
      router.push("/");
    } catch (error) {
      form.reset({
        email: "", // Reset the email field
        password: "", // Reset the password field
      });
      setError("Wrong credentials, try again")
      console.error(error)
    }
  }

  return (
    <div className='text-sm h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl mb-3'>Log in now!</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 h-auto space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input className="min-w-3" placeholder="Enter email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex text-center flex-col">
            <Button type="submit" className='w-24 m-auto'>Submit</Button>
            {error &&
            <div className='text-red-600 text-base mt-1'>
              {error}
            </div>
            }
          </div>
        </form>
      </Form>
      <h1 className='mt-6 -mb-2'>Already have an account?</h1>
      <Button variant="link" onClick={() => router.push("/signup")}>
        Signup
      </Button>
      <Button className="mt-2" variant="outline" onClick={handleSignIn}>
        Log in with Google
      </Button>
    </div>
  )
}