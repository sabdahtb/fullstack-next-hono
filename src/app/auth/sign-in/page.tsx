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
import { signin } from './action'

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
})

const SignInForm = () => {
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')

    // Start the form submission process
    startTransition(() => {
      signin(values).then((data) => {
        setSuccess(data?.success)
        setError(data?.error)
      })
    })
  }

  return (
    <div className="flex w-full flex-col items-center space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <h3 className="text-muted-foreground">
          Enter your credentials to log in
        </h3>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-4/5 max-w-md space-y-4"
        >
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
                    placeholder="Enter your password"
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
            Log In
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SignInForm
