import { ProtectedProvider } from '@/components/providers/layout-provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ProtectedProvider>{children}</ProtectedProvider>
}
