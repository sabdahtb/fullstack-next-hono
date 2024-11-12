import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/server/db'

// Initialize Prisma Client
const db = prisma()

// Schema for validating user input
const LoginSchema = z.object({
  email: z.string().min(1, {
    message: 'Email must be required.',
  }),
  password: z.string().min(1, {
    message: 'Password must be required.',
  }),
})

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validate input using Zod
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          // Query the user from the database using Prisma
          const existingUser = await db.user.findUnique({
            where: {
              email: email, // Assuming your user model has an 'email' field
            },
          })

          // Check if the user exists and has a password
          if (!existingUser || !existingUser.password) return null

          // Compare the provided password with the stored hash
          const passwordsMatch = await bcrypt.compare(
            password,
            existingUser.password
          )

          if (passwordsMatch) {
            return existingUser
          }
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
