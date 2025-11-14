'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Copy, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface QuotationDetailsProps {
  id: string
}

export default function QuotationDetails({ id }: QuotationDetailsProps) {
  // Sample data
  const quotation = {
    title: 'Website Redesign Project',
    status: 'In Progress',
    totalAmount: '5.0 ETH',
    stakePercentage: 10,
    stakeAmount: '0.5 ETH',
    contractAddress: '0x1234...5678',
    network: 'Sepolia'
  }

  const milestones = [
    {
      id: 1,
      title: 'Design & Wireframes',
      percentage: 30,
      dueDate: '2024-01-15',
      status: 'Approved',
      statusColor: 'success'
    },
    {
      id: 2,
      title: 'Frontend Development',
      percentage: 40,
      dueDate: '2024-02-15',
      status: 'Submitted',
      statusColor: 'pending'
    },
    {
      id: 3,
      title: 'Testing & Deployment',
      percentage: 30,
      dueDate: '2024-03-01',
      status: 'Pending',
      statusColor: 'warning'
    }
  ]

  const activity = [
    {
      id: 1,
      event: 'Quotation Created',
      time: '2024-01-05 10:30 AM',
      address: '0x5678...1234'
    },
    {
      id: 2,
      event: 'Client Paid',
      time: '2024-01-06 2:45 PM',
      address: '0xabcd...ef01'
    },
    {
      id: 3,
      event: 'Milestone Submitted',
      time: '2024-01-15 11:20 AM',
      address: '0x5678...1234'
    },
    {
      id: 4,
      event: 'Milestone Approved',
      time: '2024-01-16 9:10 AM',
      address: '0xabcd...ef01'
    }
  ]

  const getStatusIcon = (status: string) => {
    if (status === 'success') return <CheckCircle className="w-4 h-4 text-primary" />
    if (status === 'pending') return <Clock className="w-4 h-4 text-yellow-500" />
    return <AlertCircle className="w-4 h-4 text-orange-500" />
  }

  const getStatusBadge = (status: string) => {
    if (status === 'Approved') return 'bg-green-100 text-green-700'
    if (status === 'Submitted') return 'bg-blue-100 text-blue-700'
    return 'bg-yellow-100 text-yellow-700'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/" className="text-primary hover:underline text-sm mb-4 inline-block">
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-foreground mb-2">Quotation Details</h1>
      <p className="text-muted-foreground mb-8">View your escrow quotation and milestones</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Quotation Card */}
          <Card className="bg-white border-border p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{quotation.title}</h2>
                <p className="text-muted-foreground mt-1">Project quotation and deliverables</p>
              </div>
              <span className="px-3 py-1 bg-secondary text-primary rounded-full text-sm font-medium">
                {quotation.status}
              </span>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Amount Locked</p>
                <p className="text-2xl font-bold text-foreground">{quotation.totalAmount}</p>
              </div>
            </div>
          </Card>

          {/* Milestones */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Milestones</h3>
            <div className="space-y-3">
              {milestones.map((milestone) => (
                <Card key={milestone.id} className="bg-white border-border p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusIcon(milestone.statusColor)}
                        <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>Allocation: {milestone.percentage}%</span>
                        <span>Due: {milestone.dueDate}</span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusBadge(milestone.status)}`}>
                      {milestone.status}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Actions</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                Approve Milestone
              </Button>
              <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-secondary">
                Request Revision
              </Button>
            </div>
          </div>

          {/* Stake Information */}
          <Card className="bg-secondary/50 border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Stake Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Freelancer Stake Percentage</p>
                <p className="font-semibold text-foreground">{quotation.stakePercentage}%</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Stake Amount Locked</p>
                <p className="font-bold text-primary">{quotation.stakeAmount}</p>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                The stake is locked by the smart contract until project completion.
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Escrow Information */}
          <Card className="bg-white border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Escrow Information</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Contract Address</p>
                <div className="flex items-center gap-2 bg-secondary/30 p-2 rounded text-sm font-mono text-foreground">
                  <span className="truncate">{quotation.contractAddress}</span>
                  <button className="ml-auto hover:text-primary transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Locked</p>
                <p className="font-bold text-foreground">{quotation.totalAmount}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Network</p>
                <p className="font-semibold text-foreground">{quotation.network}</p>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Stake Amount</p>
                <p className="font-semibold text-primary">{quotation.stakeAmount}</p>
              </div>
            </div>
          </Card>

          {/* Activity Log */}
          <Card className="bg-white border-border p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Activity Log</h3>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activity.map((item) => (
                <div key={item.id} className="pb-3 border-b border-border last:border-b-0">
                  <p className="font-medium text-sm text-foreground">{item.event}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                    <p className="text-xs text-muted-foreground font-mono">{item.address}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-primary hover:underline text-xs font-medium mt-3 w-full text-center">
              See More
            </button>
          </Card>
        </div>
      </div>
    </div>
  )
}
