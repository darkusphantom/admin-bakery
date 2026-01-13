'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { startOfDay, endOfDay } from 'date-fns'
import { SaleRow } from '../types'

export function useDailyStats() {
  return useQuery({
    queryKey: ['daily-stats', new Date().toDateString()], // Invalidate daily
    queryFn: async () => {
      const now = new Date()
      const start = startOfDay(now).toISOString()
      const end = endOfDay(now).toISOString()

      const { data: salesData, error: salesError } = await supabase
        .from('sales')
        .select('*')
        .gte('created_at', start)
        .lte('created_at', end)

      if (salesError) throw salesError

      const { data: expensesData, error: expensesError } = await supabase
        .from('expenses')
        .select('amount_usd')
        .gte('created_at', start)
        .lte('created_at', end)

      if (expensesError) throw expensesError

      const sales = salesData as SaleRow[]
      const expenses = expensesData || []

      const totalExpensesUSD = expenses.reduce((acc, curr) => acc + curr.amount_usd, 0)

      const stats = sales.reduce(
        (acc, sale) => {
          acc.totalSalesUSD += sale.total_amount || 0
          acc.totalSalesVES += sale.total_amount_ves || 0
          acc.transactionCount += 1
          return acc
        },
        {
          totalSalesUSD: 0,
          totalSalesVES: 0,
          transactionCount: 0,
          averageTicket: 0,
          totalExpensesUSD: 0,
          netProfit: 0,
        }
      )

      stats.totalExpensesUSD = totalExpensesUSD
      stats.netProfit = stats.totalSalesUSD - totalExpensesUSD

      if (stats.transactionCount > 0) {
        stats.averageTicket = stats.totalSalesUSD / stats.transactionCount
      }

      return stats
    },
    refetchInterval: 1000 * 60, // Refresh every minute
  })
}
