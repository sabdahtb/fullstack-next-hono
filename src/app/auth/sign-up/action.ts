'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { signIn } from '@/auth'
import { prisma } from '@/server/db'

const SignupSchema = z.object({
  email: z.string().email().min(1, {
    message: 'Email is required.',
  }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.'),
  name: z.string().min(1, {
    message: 'Name must be required.',
  }),
})

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const db = prisma()

  const validatedFields = SignupSchema.safeParse(values)
  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
      message: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { email, password, name } = validatedFields.data
  const existingUser = await db.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    return {
      error: 'Email already exists.',
    }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  } catch (error) {
    console.error('Error during signup:', error)
    return { error: 'Something went wrong while creating your account.' }
  }

  return { success: 'Account created successfully!', redirect: '/' }
}
