'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signup } from './action'
import { useRouter } from 'next/navigation'

export const SignupSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Invalid email format' })
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    name: z.string().min(1, { message: 'Name is required' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const SignupForm = () => {
  const router = useRouter()

  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof SignupSchema>) => {
    setError('')
    setSuccess('')

    // Start the form submission process
    startTransition(() => {
      signup(values).then((data) => {
        setSuccess(data?.success)
        setError(data?.error)

        if (data.redirect) {
          router.push(data.redirect)
        }
      })
    })
  }

  return (
    <div className="flex w-full flex-col items-center space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <h3 className="text-muted-foreground">Fill in the form to sign up</h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/5 max-w-md space-y-4"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-muted-foreground">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="John Doe"
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-muted-foreground">
                  Email address
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="youremail@example.com"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-muted-foreground">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-muted-foreground">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder="Confirm your password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Message */}
          {error && <div className="text-center text-red-500">{error}</div>}

          {/* Success Message */}
          {success && (
            <div className="text-center text-green-500">{success}</div>
          )}

          {/* Submit Button */}
          <Button disabled={isPending} className="w-full">
            Sign Up
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignupForm
