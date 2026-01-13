'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, ShoppingBag, BarChart } from 'lucide-react'
import { useDailyStats } from '../hooks/use-daily-stats'
import { Skeleton } from '@/components/ui/skeleton'

export function StatsCards() {
  const { data: stats, isLoading } = useDailyStats()

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    )
  }

  // Fallback if no stats (shouldn't happen with initialData but just in case)
  const safeStats = stats || {
    totalSalesUSD: 0,
    totalSalesVES: 0,
    transactionCount: 0,
    averageTicket: 0,
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Ventas Hoy */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ventas Hoy</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ${safeStats.totalSalesUSD.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Bs. {safeStats.totalSalesVES.toFixed(2)}</p>
        </CardContent>
      </Card>

      {/* Transacciones */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transacciones</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{safeStats.transactionCount}</div>
          <p className="text-xs text-muted-foreground">Ventas registradas hoy</p>
        </CardContent>
      </Card>

      {/* Ticket Promedio */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${safeStats.averageTicket.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Promedio por venta</p>
        </CardContent>
      </Card>
    </div>
  )
}
