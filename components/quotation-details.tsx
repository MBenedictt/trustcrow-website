'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { useParams } from 'next/navigation';

import { fetchQuotationByAddress } from '@/lib/quotation';
import { submitDeliverable } from '@/lib/submit-deliverable';
import { payQuotation } from '@/lib/pay';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, AlertCircle, Copy } from 'lucide-react';

// ENUM FROM SMART CONTRACT
const MS_STATUS = [
  'Pending',
  'Submitted',
  'Approved',
  'Released',
  'Refunded'
];

export default function QuotationDetailPage() {
  const { id } = useParams();
  const quotationAddress = id as `0x${string}`;
  const { address: user } = useAccount();

  const [mounted, setMounted] = useState(false);
  const [quotation, setQuotation] = useState<any>(null);
  const [milestoneMeta, setMilestoneMeta] = useState<any[]>([]);
  const [projectMeta, setProjectMeta] = useState<any>({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !quotationAddress) return;

    async function load() {
      const q = await fetchQuotationByAddress(quotationAddress);
      setQuotation(q);

      setMilestoneMeta(
        JSON.parse(sessionStorage.getItem(`milestoneMeta_${quotationAddress}`) || '[]')
      );
      setProjectMeta(
        JSON.parse(sessionStorage.getItem(`projectMeta_${quotationAddress}`) || '{}')
      );
    }

    load();
  }, [mounted, quotationAddress]);

  if (!mounted) return null;
  if (!quotation) return <p className="text-center mt-20">Loading...</p>;

  const seller = quotation.seller.toLowerCase();
  const buyer = quotation.buyer.toLowerCase();
  const isSeller = user?.toLowerCase() === seller;
  const isBuyer = user?.toLowerCase() === buyer;

  if (!isSeller && !isBuyer)
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <h1 className="text-3xl font-bold text-red-500">
          ❌ You are not authorized to view this quotation
        </h1>
      </div>
    );

  const status = quotation.status;
  const totalAmountEth = Number(quotation.totalAmount) / 1e18;
  const stakeAmountEth = Number(quotation.sellerStakeAmount) / 1e18;

  const currentMsNum = Number(quotation.currentMilestone);
  const milestones = quotation.milestones;

  const nextMilestoneIndex = quotation.currentMilestone; // already bigint

  const hasSellerSubmitted =
    milestones[currentMsNum]?.status === 1; // Submitted

  // UI ICONS
  const getStatusIcon = (status: number) => {
    if (status === 2) return <CheckCircle className="w-4 h-4 text-green-600" />; // Approved
    if (status === 1) return <Clock className="w-4 h-4 text-blue-600" />; // Submitted
    return <AlertCircle className="w-4 h-4 text-yellow-600" />; // Pending
  };

  const getStatusBadge = (status: number) => {
    if (status === 2) return 'bg-green-100 text-green-700';
    if (status === 1) return 'bg-blue-100 text-blue-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  // ACTIONS
  const handlePay = async () => {
    try {
      await payQuotation(quotationAddress, quotation.totalAmount);
      alert("Payment sent!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Payment error.");
    }
  };

  const handleSubmitDeliverable = async () => {
    try {
      await submitDeliverable({
        quotationAddress,
        milestoneIndex: nextMilestoneIndex,
        note: "Project delivered"
      });

      alert("Deliverable submitted!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to submit deliverable.");
    }
  };

  const handleApprove = async () => {
    alert("Approve Milestone — belum ada function.");
  };

  return (
    <div className="max-w-7xl mx-auto mt-[70px] px-4 sm:px-6 lg:px-8 py-8">
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
                <h2 className="text-2xl font-bold text-foreground">{projectMeta.projectTitle}</h2>
                <p className="text-muted-foreground mt-1">{projectMeta.projectDescription}</p>
              </div>
              <span className="px-3 py-1 bg-secondary text-primary rounded-full text-sm font-medium">
                {statusLabel(status)}
              </span>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-foreground">{totalAmountEth} ETH</p>
                {status === 0 && isBuyer && (
                  <p className="text-red-500 font-medium mt-4">
                    Please pay this quotation to start the project.
                  </p>
                )}
              </div>
            </div>
          </Card>

          {/* Milestones */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Milestones</h3>
            <div className="space-y-3">
              {milestones.map((m: any, i: number) => {
                const meta = milestoneMeta[i] || {};

                const msStatus = Number(m.status);
                const dueDate = new Date(Number(m.deadlineAt) * 1000).toLocaleDateString();

                return (
                  <Card key={i} className="bg-white border-border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusIcon(msStatus)}
                          <h4 className="font-semibold text-foreground">{meta.title || `Milestone #${i + 1}`}</h4>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span>Allocation: {Number(m.percentBP) / 100}%</span>
                          <span>Due: {dueDate}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusBadge(msStatus)}`}>
                        {MS_STATUS[msStatus]}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Actions</h3>
            <div className="flex">
              {isSeller && status >= 1 && status < 3 && (
                <Button onClick={handleSubmitDeliverable} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Submit Deliverable
                </Button>
              )}

              {isBuyer && status === 0 && (
                <Button onClick={handlePay} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                  Pay Quotation
                </Button>
              )}

              {isBuyer && status >= 1 && status < 3 && (
                <Button
                  disabled={!hasSellerSubmitted}
                  onClick={handleApprove}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
                >
                  Approve Milestone
                </Button>
              )}
            </div>
          </div>

          {/* Stake Information */}
          <Card className="bg-secondary/50 border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Stake Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Freelancer Stake Percentage</p>
                <p className="font-semibold text-foreground">10%</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Stake Amount Locked</p>
                <p className="font-bold text-primary">{stakeAmountEth} ETH</p>
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
                  <span className="truncate">{quotationAddress}</span>
                  <button className="ml-auto hover:text-primary transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Total Locked</p>
                <p className="font-bold text-foreground">{totalAmountEth}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Network</p>
                <p className="font-semibold text-foreground">Sepolia</p>
              </div>

              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Stake Amount</p>
                <p className="font-semibold text-primary">{stakeAmountEth} ETH</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function statusLabel(s: number) {
  switch (s) {
    case 0: return "Created";
    case 1: return "Paid";
    case 2: return "In Progress";
    case 3: return "Completed";
    case 4: return "Refunded";
    default: return "Unknown";
  }
}
