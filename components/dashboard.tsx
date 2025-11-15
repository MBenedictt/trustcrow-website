'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { getUserQuotations, HydratedQuotation } from '@/lib/quotation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const { address } = useAccount();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [quotations, setQuotations] = useState<HydratedQuotation[]>([]);

  // Prevent SSR rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !address) return;
    const user = address;

    async function load() {
      setLoading(true);
      try {
        const data = await getUserQuotations(user);
        setQuotations(data);
      } catch (err) {
        console.error('Failed fetching quotations:', err);
      }
      setLoading(false);
    }

    load();
  }, [mounted, address]);

  // 🚫 Avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto mt-[70px] px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Manage your escrow quotations.</p>
        </div>

        <Link href="/create-quotation" className="mt-4 md:mt-0">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
            Create Quotation
          </Button>
        </Link>
      </div>

      {!address && (
        <p className="text-muted-foreground">Please connect your wallet.</p>
      )}

      {address && loading && (
        <p className="text-muted-foreground mt-4">Loading quotations...</p>
      )}

      {address && !loading && quotations.length === 0 && (
        <p className="text-muted-foreground mt-4">No quotations created yet.</p>
      )}

      {quotations.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">My Quotations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotations.map((q) => (
              <Link key={q.address} href={`/quotation/${q.address}`}>
                <Card className="bg-white border-border hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="px-6 pt-2">
                    <h1 className='text-xl font-bold mb-2'>{q.projectTitle}</h1>
                    <p className="w-fit text-gray-600 text-[10px] bg-gray-100 rounded-md px-2 py-1 mb-2">
                      {q.address.slice(0, 6)}...{q.address.slice(-4)}
                    </p>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-xl font-bold text-foreground">
                        {Number(q.totalAmount) / 1e18} ETH
                      </p>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-xs text-muted-foreground">Progress</p>

                        <p className="text-xs font-semibold text-primary">
                          {Math.floor(
                            (Number(q.currentMilestone) / q.milestones.length) *
                            100
                          )}%
                        </p>
                      </div>

                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${Math.floor(
                              (Number(q.currentMilestone) /
                                q.milestones.length) *
                              100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <span className="inline-block px-3 py-1 bg-secondary text-primary rounded-full text-xs font-medium">
                      {statusLabel(q.status)}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function statusLabel(status: number) {
  switch (status) {
    case 0: return 'Created';
    case 1: return 'Paid';
    case 2: return 'In Progress';
    case 3: return 'Completed';
    case 4: return 'Refunded';
    case 5: return 'Disputed';
    case 6: return 'Cancelled';
    default: return 'Unknown';
  }
}
