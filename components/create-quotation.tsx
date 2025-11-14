'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Milestone {
  id: string
  title: string
  description: string
  dueDate: string
  percentage: number
}

export default function CreateQuotation() {
  const [projectTitle, setProjectTitle] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [clientWallet, setClientWallet] = useState('')
  const [totalValue, setTotalValue] = useState('')
  const [freelancerStake, setFreelancerStake] = useState('')
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [showMilestoneForm, setShowMilestoneForm] = useState(false)
  const [currentMilestone, setCurrentMilestone] = useState({
    title: '',
    description: '',
    dueDate: '',
    percentage: ''
  })

  const handleAddMilestone = () => {
    if (currentMilestone.title && currentMilestone.percentage) {
      setMilestones([
        ...milestones,
        {
          id: Date.now().toString(),
          ...currentMilestone,
          percentage: Number(currentMilestone.percentage)
        }
      ])
      setCurrentMilestone({ title: '', description: '', dueDate: '', percentage: '' })
      setShowMilestoneForm(false)
    }
  }

  const handleRemoveMilestone = (id: string) => {
    setMilestones(milestones.filter(m => m.id !== id))
  }

  const stakeAmount = totalValue && freelancerStake 
    ? (Number(totalValue) * Number(freelancerStake)) / 100 
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Create Quotation</h1>
      <p className="text-muted-foreground mb-8">Set up a new escrow quotation with milestones</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-border p-6 space-y-6">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Title
              </label>
              <Input
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Enter project title"
                className="w-full"
              />
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Description
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Describe the project"
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white text-foreground"
              />
            </div>

            {/* Client Wallet Address */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Client Wallet Address
              </label>
              <Input
                value={clientWallet}
                onChange={(e) => setClientWallet(e.target.value)}
                placeholder="0x..."
                className="w-full"
              />
            </div>

            {/* Total Project Value */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Total Project Value (ETH)
              </label>
              <Input
                type="number"
                step="0.01"
                value={totalValue}
                onChange={(e) => setTotalValue(e.target.value)}
                placeholder="5.0"
                className="w-full"
              />
            </div>

            {/* Freelancer Stake Percentage */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Freelancer Stake (%)
              </label>
              <Input
                type="number"
                step="0.1"
                value={freelancerStake}
                onChange={(e) => setFreelancerStake(e.target.value)}
                placeholder="10"
                className="w-full"
              />
            </div>

            {/* Milestones Section */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Milestones</h3>
              
              {milestones.length === 0 ? (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4">
                  <p className="text-muted-foreground">No milestones yet</p>
                </div>
              ) : (
                <div className="space-y-3 mb-4">
                  {milestones.map((milestone) => (
                    <Card key={milestone.id} className="bg-secondary/30 border-border p-4 flex justify-between items-start">
                      <div>
                        <p className="font-medium text-foreground">{milestone.title}</p>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>Due: {milestone.dueDate}</span>
                          <span>Allocation: {milestone.percentage}%</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveMilestone(milestone.id)}
                        className="text-destructive hover:text-destructive/80 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </Card>
                  ))}
                </div>
              )}

              {showMilestoneForm ? (
                <Card className="border-border p-4 space-y-3 mb-4 bg-secondary/20">
                  <Input
                    placeholder="Milestone title"
                    value={currentMilestone.title}
                    onChange={(e) => setCurrentMilestone({ ...currentMilestone, title: e.target.value })}
                  />
                  <textarea
                    placeholder="Description"
                    rows={2}
                    value={currentMilestone.description}
                    onChange={(e) => setCurrentMilestone({ ...currentMilestone, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white text-foreground text-sm"
                  />
                  <Input
                    type="date"
                    value={currentMilestone.dueDate}
                    onChange={(e) => setCurrentMilestone({ ...currentMilestone, dueDate: e.target.value })}
                  />
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Percentage allocation"
                    value={currentMilestone.percentage}
                    onChange={(e) => setCurrentMilestone({ ...currentMilestone, percentage: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleAddMilestone}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Add Milestone
                    </Button>
                    <Button
                      onClick={() => setShowMilestoneForm(false)}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </Card>
              ) : (
                <Button
                  onClick={() => setShowMilestoneForm(true)}
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-secondary"
                >
                  + Add Milestone
                </Button>
              )}
            </div>

            {/* Create Button */}
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-base font-medium">
              Create Quotation
            </Button>
          </Card>
        </div>

        {/* Right Column - Summary */}
        <div>
          <Card className="bg-secondary/50 border-border p-6 sticky top-20 space-y-6">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Summary
              </p>
              <h3 className="text-xl font-bold text-foreground break-words">
                {projectTitle || 'Project Name'}
              </h3>
            </div>

            <div className="space-y-4 border-t border-border pt-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Value</p>
                <p className="text-2xl font-bold text-foreground">
                  {totalValue ? `${totalValue} ETH` : '- ETH'}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Freelancer Stake</p>
                <p className="text-lg font-semibold text-foreground">
                  {freelancerStake ? `${freelancerStake}%` : '-%'}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Stake Amount</p>
                <p className="text-lg font-bold text-primary">
                  {stakeAmount > 0 ? `${stakeAmount.toFixed(4)} ETH` : '- ETH'}
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Milestone Allocation
              </p>
              <div className="space-y-2">
                {milestones.length > 0 ? (
                  milestones.map((m) => (
                    <div key={m.id} className="flex justify-between items-center text-sm">
                      <span className="text-foreground truncate">{m.title}</span>
                      <span className="text-muted-foreground font-medium">{m.percentage}%</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground">No milestones added yet</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
