import Dashboard from '@/components/dashboard'
import Navbar from '@/components/navigation'

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Dashboard />
        </div>
    )
}
