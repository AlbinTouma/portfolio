import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Albin Touma',
  description: 'Researcher and data analyst',
  keywords: ['Albin Touma', 'Python', 'Data analysis', 'Sanctions', 'Know Your Customer', 'KYS', 'KYB', 'Know Your Business', 'anti-money laundering', 'data'],

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
