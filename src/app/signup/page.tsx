"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { auth } from '@/firebase/config';

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

export default function SignupPage() {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
    console.log(data)
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        updateProfile(user, {
          displayName: data.username
        })
        console.log(user)
        router.push("/login")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
      });
  }

  const router = useRouter();

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