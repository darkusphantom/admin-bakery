import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { Product } from '../types'

export function useGetProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        throw new Error(error.message)
      }

      return data as Product[]
    },
  })
}

export function useCreateProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newProduct: Omit<Product, 'id' | 'created_at'>) => {
      const { data, error } = await supabase.from('products').insert(newProduct).select().single()

      if (error) {
        throw new Error(error.message)
      }

      return data
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
