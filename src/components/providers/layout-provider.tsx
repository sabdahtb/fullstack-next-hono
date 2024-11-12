import React from 'react'

import { cn } from '@/lib/utils'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('grid min-h-screen grid-rows-[auto,1fr,auto]')}>
      <Navbar />
      <main className="web-container h-full pb-12 pt-4">{children}</main>
      <Footer />
    </div>
  )
}
