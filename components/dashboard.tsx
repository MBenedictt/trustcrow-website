'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto mt-[70px] px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your escrow quotations.</p>
        </div>
        <Link href="/create-quotation" className="mt-4 md:mt-0">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Create Quotation
          </Button>
        </Link>
      </div>

      {/* My Quotations Section */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">My Quotations</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Quotation Card */}
          <Link href="/quotation/1">
            <Card className="bg-white border-border hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Website Redesign Project
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Modern responsive website redesign
                </p>

                {/* Amount */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-xl font-bold text-foreground">5.0 ETH</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="text-xs font-semibold text-primary">60%</p>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: '60%' }}
                    ></div>
                  </div>
                </div>

                {/* Status Tag */}
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-xs font-medium">
                    In Progress
                  </span>
                </div>
              </div>
            </Card>
          </Link>

          {/* Additional Sample Cards */}
          <Link href="/quotation/2">
            <Card className="bg-white border-border hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Mobile App Development
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  iOS and Android native apps
                </p>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-xl font-bold text-foreground">12.5 ETH</p>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs text-muted-foreground">Progress</p>
                    <p className="text-xs font-semibold text-primary">30%</p>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: '30%' }}
                    ></div>
                  </div>
                </div>

                <span className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
