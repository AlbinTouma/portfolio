import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import GoogleAnalytics from '@/src/components/Shared/GoogleAnalytics'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Albin Touma',
  description: 'Researcher and data analyst',
  keywords: ['Albin Touma', 'Python', 'Data analysis', 'analytics', 'sanctions', 'Know Your Customer', 'KYS', 'KYB', 'Know Your Business', 'anti-money laundering', 'data', 'international relations', 'international development'],

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
        <GoogleAnalytics ga_id=
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
      ) : null}
      <body className={inter.className}>{children}</body>
    </html>
  )
}
