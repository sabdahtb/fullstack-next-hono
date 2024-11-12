import React from 'react'

import { LayoutProvider } from './layout-provider'
import { ThemeProvider } from './theme-provider'
import { TanstackProviders } from './tanstack-provider'

export default function MainProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TanstackProviders>
        <LayoutProvider>{children}</LayoutProvider>
      </TanstackProviders>
    </ThemeProvider>
  )
}
