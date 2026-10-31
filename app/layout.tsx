import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { AuthProvider } from '@/components/auth/AuthProvider'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'OneSearch — The Nigerian Sector Intelligence Index',
  description:
    'The authoritative database of Nigerian business sectors. Curated intelligence on 50+ sectors — what’s succeeding, what collapsed, failure autopsies, and unexploited white spaces.',
  keywords: [
    'Nigeria startup',
    'African market intelligence',
    'sector analysis',
    'Nigerian business revenue',
    'Nigeria founder research',
  ],
  openGraph: {
    title: 'OneSearch — The Nigerian Sector Intelligence Index',
    description: 'The authoritative market intelligence directory for Nigerian founders & investors.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F8F8F5] text-[#111816] font-sans antialiased selection:bg-[#7AE368]/30 selection:text-[#0F2D17]">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
