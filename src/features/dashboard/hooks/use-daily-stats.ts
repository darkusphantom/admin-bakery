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

      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .gte('created_at', start)
        .lte('created_at', end)

      if (error) throw error

      const sales = data as SaleRow[]

      const stats = sales.reduce(
        (acc, sale) => {
          acc.totalSalesUSD += sale.total_amount || 0
          // Use total_amount_ves if available, otherwise calculate or default to 0.
          // Assuming the column exists as per user request.
          acc.totalSalesVES += sale.total_amount_ves || 0
          acc.transactionCount += 1
          return acc
        },
        {
          totalSalesUSD: 0,
          totalSalesVES: 0,
          transactionCount: 0,
          averageTicket: 0,
        }
      )

      if (stats.transactionCount > 0) {
        stats.averageTicket = stats.totalSalesUSD / stats.transactionCount
      }

      return stats
    },
    refetchInterval: 1000 * 60, // Refresh every minute
  })
}
