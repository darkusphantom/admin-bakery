import MobileNav from '@/components/shared/mobile-nav'
import { DashboardHeader } from '@/components/shared/dashboard-header'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-background">
      <main className="pb-20">
        <DashboardHeader />
        {children}
      </main>
      <MobileNav />
    </div>
  )
}
