'use client'

import { StatsCards } from '@/features/dashboard/components/stats-cards'
import { RecentSales } from '@/features/dashboard/components/recent-sales'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { DashboardHeader } from '@/components/shared/dashboard-header'

export default function DashboardPage() {
  const today = format(new Date(), "eeee, d 'de' MMMM", { locale: es })

  return (
    <div className="p-4 space-y-6">
      {/* NOTE: DashboardHeader is already in layout, so we don't need it here unless we removed it from layout or want specific header behavior. 
         Based on Step 53, it was added to layout. So I shouldn't duplicate it here.
         Wait, step 53 failed to run command but step 53 created/updated layout file. 
         Wait, step 47 updated layout, step 53 updated layout again.
         The layout HAS DashboardHeader. So I will just put the page content.
      */}

      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Resumen del Día</h2>
        <p className="text-muted-foreground capitalize">{today}</p>
      </div>

      <StatsCards />

      <Card>
        <CardHeader>
          <CardTitle>Últimas Ventas</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentSales />
        </CardContent>
      </Card>

      {/* Spacer for bottom nav */}
      <div className="h-10"></div>
    </div>
  )
}
