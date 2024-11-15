'use client'

import React, { useCallback, useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { isEqual } from 'lodash'

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
import { timestampExp, timestampNow } from '@/lib/utils'
import { getPinataurl } from '@/lib/pinata'

export default function Navbar() {
  const router = useRouter()
  const { data: session } = useSession()
  const { user, setUser } = useUser()

  const [isPending, startTransition] = useTransition()
  const [initial, setInitial] = useState<string>('')

  function getInitials(fullName: string): string {
    const nameParts = fullName.split(' ')

    const firstInitial = nameParts[0].charAt(0).toUpperCase()
    const lastInitial =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
        : ''

    return String(firstInitial + lastInitial).toUpperCase()
  }

  const handleProfileImage = useCallback(async () => {
    if (isEqual(user, defaultUser)) return

    const now = timestampNow()
    const condition1 = now >= user.expired
    const condition2 = user.expired === 0 && session?.user.image != null

    if (condition1 || condition2) {
      const imageUrl = await getPinataurl(session?.user.image ?? '')
      setUser({ ...user, imageUrl, expired: timestampExp(7) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function logout() {
    startTransition(() => {
      signout().then((data) => {
        if (data.redirect) {
          router.push(data.redirect)
        }
      })
    })
  }

  useEffect(() => {
    const initial = getInitials(session?.user?.name ?? '')
    setInitial(initial)
  }, [session])

  useEffect(() => {
    handleProfileImage()
  }, [handleProfileImage, session])

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
                {user.imageUrl === '' ? (
                  <AvatarFallback>{initial ?? '--'}</AvatarFallback>
                ) : (
                  <>
                    <AvatarImage src={user.imageUrl} alt="profile" />
                    <AvatarFallback>{initial ?? '--'}</AvatarFallback>
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
