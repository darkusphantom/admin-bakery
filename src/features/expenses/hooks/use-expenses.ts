import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { Expense, CreateExpenseParams } from '../types'
import { startOfDay, endOfDay } from 'date-fns'

export function useExpenses(date?: Date) {
  const queryDate = date || new Date()

  return useQuery({
    queryKey: ['expenses', queryDate.toDateString()],
    queryFn: async () => {
      const start = startOfDay(queryDate).toISOString()
      const end = endOfDay(queryDate).toISOString()

      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .gte('created_at', start)
        .lte('created_at', end)
        .order('created_at', { ascending: false })

      if (error) throw error
      return data as Expense[]
    },
  })
}

export function useCreateExpense() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newExpense: CreateExpenseParams) => {
      const { data, error } = await supabase.from('expenses').insert(newExpense).select().single()

      if (error) throw new Error(error.message)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      queryClient.invalidateQueries({ queryKey: ['daily-stats'] })
    },
  })
}
