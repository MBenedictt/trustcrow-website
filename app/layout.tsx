import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Providers } from './providers';
import { Toaster } from "sonner";

const _manrope = Manrope({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'TrustCrow - Escrow Management',
  description: 'DeFi peer-to-peer escrow management for freelancers',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Toaster position="bottom-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
