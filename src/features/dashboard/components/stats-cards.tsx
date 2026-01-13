'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, ShoppingBag, BarChart, TrendingUp, TrendingDown } from 'lucide-react'
import { useDailyStats } from '../hooks/use-daily-stats'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function StatsCards() {
  const { data: stats, isLoading } = useDailyStats()

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 rounded-xl" />
        ))}
      </div>
    )
  }

  // Fallback
  const safeStats = stats || {
    totalSalesUSD: 0,
    totalSalesVES: 0,
    transactionCount: 0,
    averageTicket: 0,
    totalExpensesUSD: 0,
    netProfit: 0,
  }

  const isProfitPositive = safeStats.netProfit >= 0

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {/* Ventas Hoy */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-sm font-medium">Ventas</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-xl font-bold text-green-600">
            ${safeStats.totalSalesUSD.toFixed(1)}
          </div>
          <p className="text-xs text-muted-foreground">
            {safeStats.transactionCount} Transacciones
          </p>
        </CardContent>
      </Card>

      {/* Gastos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-sm font-medium">Gastos</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-xl font-bold text-red-600">
            ${safeStats.totalExpensesUSD.toFixed(1)}
          </div>
          <p className="text-xs text-muted-foreground">Salidas</p>
        </CardContent>
      </Card>

      {/* Ganancia Neta */}
      <Card
        className={cn(
          isProfitPositive ? 'bg-green-50 dark:bg-green-950/20' : 'bg-red-50 dark:bg-red-950/20'
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-sm font-medium">Ganancia Neta</CardTitle>
          <TrendingUp
            className={cn('h-4 w-4', isProfitPositive ? 'text-green-600' : 'text-red-600')}
          />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div
            className={cn(
              'text-xl font-bold',
              isProfitPositive ? 'text-green-700' : 'text-red-700'
            )}
          >
            ${safeStats.netProfit.toFixed(1)}
          </div>
          <p className="text-xs text-muted-foreground opacity-80">Real</p>
        </CardContent>
      </Card>

      {/* Ticket Promedio */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
          <CardTitle className="text-sm font-medium">Ticket Promedio</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="text-xl font-bold">${safeStats.averageTicket.toFixed(1)}</div>
          <p className="text-xs text-muted-foreground">Promedio</p>
        </CardContent>
      </Card>
    </div>
  )
}
