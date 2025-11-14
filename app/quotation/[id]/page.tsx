import Navigation from '@/components/navigation'
import QuotationDetails from '@/components/quotation-details'

export default function QuotationDetailsPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <QuotationDetails id={params.id} />
    </main>
  )
}
