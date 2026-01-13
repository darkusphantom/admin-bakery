'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { SaleRow } from '../types'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function RecentSales() {
  const { data: sales, isLoading } = useQuery({
    queryKey: ['recent-sales'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sales')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      if (error) throw error
      return data as SaleRow[]
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    )
  }

  if (!sales || sales.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground text-sm">
        No hay ventas registradas.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sales.map((sale) => (
        <div
          key={sale.id}
          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {format(new Date(sale.created_at), 'h:mm a', { locale: es })}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {sale.payment_method?.replace('_', ' ')}
            </p>
          </div>
          <div className="text-right">
            <div className="font-bold text-green-600">${sale.total_amount.toFixed(2)}</div>
            {sale.total_amount_ves !== undefined && (
              <div className="text-xs text-muted-foreground">
                Bs. {sale.total_amount_ves.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
