import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { ExchangeRateData } from '../types'

export const useExchangeRate = () => {
  return useQuery({
    queryKey: ['exchange-rate'],
    queryFn: async (): Promise<ExchangeRateData> => {
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'exchange_rate')
        .single()

      if (error) throw error

      // Parse data.value which is a JSON object
      const value = data.value as unknown as ExchangeRateData
      // Ensure we always have valid data structure even if DB is raw
      return {
        rate: value.rate || 0,
        source: value.source || 'UNKNOWN',
        updated_at: value.updated_at || new Date().toISOString(),
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export const useUpdateExchangeRate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newRate: number) => {
      const newValue: ExchangeRateData = {
        rate: newRate,
        source: 'MANUAL/API',
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase
        .from('settings')
        .update({ value: newValue })
        .eq('key', 'exchange_rate')

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exchange-rate'] })
    },
  })
}
