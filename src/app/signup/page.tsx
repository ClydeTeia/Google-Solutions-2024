"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { auth, db } from '@/firebase/config';
import { doc, setDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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
import { RegisterFormSchema } from '@/components/schema';
import { UserAuth } from '../context/firebaseContext';

export default function SignupPage() {
  const { user, googleSignIn, logOut, emailSignUp } = UserAuth();
  const router = useRouter();

  if (user) router.push("/")

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/")
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
    try {
      console.log(data);
      await emailSignUp(data.email, data.password, data.username);
      router.push("/");
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='text-sm h-screen flex flex-col items-center justify-center'>
      <h1 className='text-2xl mb-3'>Sign Up now!</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/3 h-auto space-y-6">
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input className="min-w-3" placeholder="Enter username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <div className="flex justify-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
      <h1 className='mt-6 -mb-2'>Already have an account?</h1>
      <Button variant="link" onClick={() => router.push("/login")}>
        Login
      </Button>
      <Button className="mt-2" variant="outline" onClick={handleSignIn}>
        Sign Up with Google
      </Button>
    </div>
  )
}