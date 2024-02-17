import { z } from "zod"

export const RegisterFormSchema = z.object({
  username: z.string().min(6, {
    message: "Username must be at least 6 characters.",
  }),
  email: z.string().min(5, {
    message: "Email must be at least 5 characters.",
  }).email({
    message: "Invalid email address"
  }),
  password: z.string().min(8, {
    message: "Password less than 8 characters"
  })
})

export const LoginFormSchema = z.object({
  email: z.string().min(5, {
    message: "Email must be at least 5 characters.",
  }).email({
    message: "Invalid email address"
  }),
  password: z.string().min(8, {
    message: "Password less than 8 characters"
  })
})
