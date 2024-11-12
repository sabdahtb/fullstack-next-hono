import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from '@/components/ui/sonner'
import MainProvider from '@/components/providers'
import { Suspense } from 'react'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Nextjs Hono',
    default: 'Nextjs Hono',
  },
  description: 'Nextjs Hono',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <Suspense>
          <MainProvider>{children}</MainProvider>
        </Suspense>
        <Toaster />
      </body>
    </html>
  )
}
