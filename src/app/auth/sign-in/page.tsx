'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useEffect, useTransition } from 'react'
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
import Link from 'next/link'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useUser, defaultUser } from '@/store/user'
import { decryptString, encryptString } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'

const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters long' }),
  rememberMe: z.boolean().optional(),
})

const SignInForm = () => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { user, setUser } = useUser()

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      signin(values).then((data) => {
        if (data.success) {
          toast.success(data?.success)
          setUser({
            ...defaultUser,
            email: values.email,
            password: encryptString(values.password),
            remember: values.rememberMe === true,
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

  useEffect(() => {
    if (user.remember) {
      form.reset({
        email: user.email,
        password: decryptString(user.password),
        rememberMe: user.remember,
      })
    }
  }, [user, form])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
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
                    placeholder="Enter your password"
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
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center gap-x-2 space-y-1">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-muted-foreground">
                  Remember Me
                </FormLabel>
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="w-full">
            Log In
          </Button>
        </form>
      </Form>
      <p className="text-sm text-secondary-foreground">
        {`Don't have an account?`}{' '}
        <Link href={'/auth/sign-up'} className="font-semibold text-blue-500">
          Sign up for free
        </Link>
      </p>
    </div>
  )
}

export default SignInForm
