'use client'

import { useExchangeRate } from '@/features/settings/hooks/use-exchange-rate'
import { cn } from '@/lib/utils'

interface PriceTagProps {
  priceUsd: number
  className?: string
  showBs?: boolean
}

export function PriceTag({ priceUsd, className, showBs = true }: PriceTagProps) {
  const { data: requestData } = useExchangeRate()
  // Handle both possible structures (updated hook returns object, old might return number)
  // But we updated the hook in previous turn to return object { rate, source, updated_at }
  const rate = requestData?.rate || 0
  const priceBs = priceUsd * rate

  return (
    <div className={cn('flex flex-col items-end leading-none', className)}>
      <span className="font-bold">${priceUsd.toFixed(2)}</span>
      {showBs && rate > 0 && (
        <span className="text-[10px] text-muted-foreground self-end">Bs. {priceBs.toFixed(2)}</span>
      )}
    </div>
  )
}
