'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { cn } from '@/lib/utils'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('grid min-h-screen grid-rows-[auto,1fr,auto]')}>
      <div />
      <main className="web-container h-full pb-12 pt-4">{children}</main>
      <Footer />
    </div>
  )
}

export function ProtectedProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { status } = useSession()
  const [unauthenticatedCount, setUnauthenticatedCount] = useState(0)

  const checkStatus = useCallback(() => {
    if (status === 'unauthenticated') {
      setUnauthenticatedCount((prevCount) => prevCount + 1)
    }
  }, [status])

  useEffect(() => {
    checkStatus()
  }, [checkStatus, status])

  useEffect(() => {
    if (unauthenticatedCount > 3) {
      router.push('/auth/sign-in')
    }
  }, [unauthenticatedCount, router])

  return (
    <div className={cn('grid min-h-screen grid-rows-[auto,1fr,auto]')}>
      <Navbar />
      <main className="web-container h-full pb-12 pt-4">{children}</main>
      <Footer />
    </div>
  )
}
