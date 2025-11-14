import Navigation from '@/components/navigation'
import Dashboard from '@/components/dashboard'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Dashboard />
    </main>
  )
}
