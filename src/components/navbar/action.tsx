'use server'

import { signOut } from '@/auth'

export const signout = async () => {
  await signOut({ redirect: false })
  return { success: 'Logout successful!', redirect: '/auth/sign-in' }
}
