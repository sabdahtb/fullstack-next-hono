import React from 'react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404',
}

export default function NotFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center text-center">
      <h1 className="text-8xl font-bold">404</h1>
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p className="mt-4 italic">
        The page you are looking for does not exist.
      </p>
      <Link
        href={'/'}
        className={buttonVariants({
          size: 'lg',
          className: 'mt-2',
          variant: 'secondary',
        })}
      >
        Go Back Home
      </Link>
    </div>
  )
}
