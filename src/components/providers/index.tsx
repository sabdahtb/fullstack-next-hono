import React from 'react'

import { LayoutProvider } from './layout-provider'
import { ThemeProvider } from './theme-provider'
import { TanstackProviders } from './tanstack-provider'
import { SessionProvider } from 'next-auth/react'

export default function MainProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <TanstackProviders>
          <LayoutProvider>{children}</LayoutProvider>
        </TanstackProviders>
      </ThemeProvider>
    </SessionProvider>
  )
}
