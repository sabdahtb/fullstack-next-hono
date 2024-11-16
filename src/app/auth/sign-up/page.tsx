'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
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
import Link from 'next/link'
import { toast } from 'sonner'
import { useUser, defaultUser } from '@/store/user'

const SignupSchema = z
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
  const { user, setUser } = useUser()
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
    startTransition(() => {
      signup(values).then((data) => {
        if (data.success) {
          toast.success(data?.success)
          const expired = user.expired > 0 ? user.expired : 0

          setUser({
            ...defaultUser,
            expired,
            name: values.name,
          })
        }
        if (data.error) {
          toast.error(data?.error)
        }

        if (data.redirect) {
          setTimeout(() => {
            router.push(data.redirect)
          }, 100)
        }
      })
    })
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
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

          <Button disabled={isPending} className="w-full">
            Sign Up
          </Button>
        </form>
      </Form>
      <p className="text-sm text-secondary-foreground">
        {`Already have an account?`}{' '}
        <Link href={'/auth/sign-in'} className="font-semibold text-blue-500">
          Sign in
        </Link>
      </p>
    </div>
  )
}

export default SignupForm
