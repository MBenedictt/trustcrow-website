import Dashboard from '@/components/dashboard'
import Navbar from '@/components/navigation'

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Dashboard />
        </div>
    )
}
