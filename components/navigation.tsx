'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Navigation() {
  return (
    <nav className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-trust-dark-purple">
            TrustCrow
          </Link>
          <Button 
            variant="outline"
            className="border-primary text-primary hover:bg-secondary"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    </nav>
  )
}
