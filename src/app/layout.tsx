import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// Initialize the Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'PropertyWeb - Sell Your Property Online',
  description: 'A platform for homeowners to guide them through the process of selling property online.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  )
}