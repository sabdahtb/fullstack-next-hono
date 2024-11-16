import { auth } from '@/auth'
import AuthHandler from '@/components/auth-handler'
import { ProtectedProvider } from '@/components/providers/layout-provider'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth() // calling session
  return (
    <ProtectedProvider>
      <AuthHandler session={session} />
      {children}
    </ProtectedProvider>
  )
}
