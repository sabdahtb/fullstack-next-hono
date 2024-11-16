'use client'

import React, { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ThemeController } from '@/components/theme-controller'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useRouter } from 'next/navigation'
import { signout } from './action'
import { defaultUser, useUser } from '@/store/user'

export default function Navbar() {
  const router = useRouter()
  const { user, setUser } = useUser()
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()
  const [userData, setuserData] = useState<{
    initial: string
    imageUrl: string
  }>({ initial: '', imageUrl: '' })

  function getInitials(fullName: string): string {
    const nameParts = fullName.split(' ')

    const firstInitial = nameParts[0].charAt(0).toUpperCase()
    const lastInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
        : ''

    return String(firstInitial + lastInitial).toUpperCase()
  }

  async function logout() {
    startTransition(() => {
      signout().then((data) => {
        if (data.redirect) {
          const expired = user.expired > 0 ? user.expired : 0
          if (!user.remember) {
            setUser({ ...defaultUser, expired })
          }
          setUser({
            ...defaultUser,
            expired,
            email: user.email,
            password: user.password,
            remember: user.remember,
          })
          router.push(data.redirect)
          update(null)
        }
      })
    })
  }

  useEffect(() => {
    const initial = getInitials(user.name)
    setuserData({ initial, imageUrl: user.imageUrl })
  }, [user])

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <div className="web-container flex items-center justify-between gap-4 py-4">
        <Link href={'/'}>
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
        </Link>
        <div className="flex justify-center gap-2">
          <ThemeController />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer select-none">
                {userData.imageUrl === '' ? (
                  <AvatarFallback>{userData.initial ?? '--'}</AvatarFallback>
                ) : (
                  <>
                    <AvatarImage src={userData.imageUrl} alt="profile" />
                    <AvatarFallback>{userData.initial ?? '--'}</AvatarFallback>
                  </>
                )}
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
