import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { ThemeController } from '@/components/theme-controller'

export default function Navbar() {
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
        <div className="flex justify-center gap-4">
          <ThemeController />

          <Link
            href={'/test'}
            className={cn(
              buttonVariants({
                size: 'icon',
                variant: 'outline',
                className: 'focus-visible:ring-transparent',
              })
            )}
          >
            🚀
          </Link>
        </div>
      </div>
    </div>
  )
}
