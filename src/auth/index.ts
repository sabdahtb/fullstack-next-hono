import NextAuth, { DefaultSession } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import authConfig from './config'

const prisma = new PrismaClient()

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    // Session callback
    async session({ session, token }) {
      // Assign the token's user ID to the session
      if (token.sub && session.user) session.user.id = token.sub

      // Copy the email from the token to the session
      if (token.email && session.user) session.user.email = token.email

      // Set the user's name and image from the token
      if (session) {
        session.user.name = token.name
        session.user.image = token.picture
      }

      return session
    },

    // JWT callback to manage user session and store extra data like name, picture, etc.
    async jwt({ token }) {
      // Look up the user from the database by email using Prisma
      const existingUser = await prisma.user.findUnique({
        where: { email: token.email as string },
      })

      if (!existingUser) return token
      token.name = existingUser.name

      return token
    },
  },

  // Use the Prisma Adapter to store and manage sessions and users
  adapter: PrismaAdapter(prisma),

  // Custom sign-in page URL
  pages: {
    signIn: '/auth/sign-in', // Customize your login page path
  },

  // Session strategy (use JWT)
  session: { strategy: 'jwt' },

  // Spread any other configuration settings from your authConfig
  ...authConfig,
})
