import { LayoutProvider } from '@/components/providers/layout-provider'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <LayoutProvider>{children}</LayoutProvider>
}
