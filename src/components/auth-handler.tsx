'use client'

import React, { useCallback, useEffect } from 'react'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { defaultUser, useUser } from '@/store/user'
import { isEqual } from 'lodash'
import { timestampExp, timestampNow } from '@/lib/utils'
import { getPinataurl } from '@/lib/pinata'
import { client } from '@/lib/hono'

interface Props {
  session: Session | null
}

export default function AuthHandler({ session }: Props) {
  const router = useRouter()
  const { update } = useSession()
  const { user, setUser } = useUser()

  const updateUerInfo = useCallback(async () => {
    if (isEqual(user, session?.user)) return
    if (isEqual(user, defaultUser)) return

    setUser({
      ...user,
      name: session?.user?.name ?? '',
    })

    if (user.email !== session?.user?.email) {
      const imageUrl = await getPinataurl(session?.user.image ?? '')

      setUser({
        ...defaultUser,
        imageUrl,
        name: session?.user?.name ?? '',
        email: session?.user?.email ?? '',
      })

      return
    }

    const now = timestampNow()
    const hasExpiredImg = user.expired > 0
    const hasImageUrl = session?.user?.image != null

    if (!hasImageUrl) return
    if (hasExpiredImg) {
      if (now >= user.expired) {
        const imageUrl = await getPinataurl(session?.user.image ?? '')

        setUser({
          ...user,
          imageUrl,
          expired: timestampExp(7),
          name: session?.user?.name ?? '',
        })
      } else {
        const res = await client.user.$get({ query: { id: session.user.id } })
        const userDb: any = await res.json()

        setUser({
          ...user,
          imageUrl: userDb?.imageUrl ?? '',
          name: session?.user?.name ?? '',
        })
      }
    } else {
      const imageUrl = await getPinataurl(session?.user.image ?? '')

      setUser({
        ...user,
        imageUrl,
        expired: timestampExp(7),
        name: session?.user?.name ?? '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user, setUser])

  if (!session) {
    update(null)
    router.push('/auth/sign-in')
  }

  useEffect(() => {
    updateUerInfo()
  }, [session, updateUerInfo])
  return <></>
}
