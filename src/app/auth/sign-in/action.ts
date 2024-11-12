'use server'

import * as z from 'zod'
import { prisma } from '@/server/db'
import { signIn } from '@/auth'
import { AuthError } from 'next-auth'

const SigninSchema = z.object({
  email: z.string().email().min(1, {
    message: 'Email is required.',
  }),
  password: z.string().min(8, { message: 'Password is required.' }),
})

export const signin = async (values: z.infer<typeof SigninSchema>) => {
  const db = prisma()
  const validatedFields = SigninSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
      message: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password } = validatedFields.data
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (!existingUser) {
    return {
      error: 'Email not found.',
    }
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }

  return { success: 'Login successful!' }
}
