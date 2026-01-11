import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { CartItem } from './use-cart'

interface CreateSaleParams {
  items: CartItem[]
  total: number
  paymentMethod: string // 'cash', 'pago_movil', 'debit', etc.
}

export function useCreateSale() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ items, total, paymentMethod }: CreateSaleParams) => {
      // 1. Create Sale
      const { data: sale, error: saleError } = await supabase
        .from('sales')
        .insert({
          total_amount: total,
          payment_method: paymentMethod,
        })
        .select()
        .single()

      if (saleError) throw new Error(saleError.message)

      // 2. Create Sale Items
      const saleItems = items.map((item) => ({
        sale_id: sale.id,
        product_id: item.product.id,
        product_name: item.product.name,
        quantity: item.quantity,
        unit_price: item.product.price,
      }))

      const { error: itemsError } = await supabase.from('sale_details').insert(saleItems)

      if (itemsError) throw new Error(itemsError.message)

      // 3. Update Stock (Optional: Trigger usually handles this, but if not, logic here)
      // For now we assume DB Trigger or manual update.
      // Manual update for safety:
      for (const item of items) {
        await supabase.rpc('decrement_stock', {
          row_id: item.product.id,
          amount: item.quantity,
        })
      }

      return sale
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] })
      queryClient.invalidateQueries({ queryKey: ['products'] }) // To update stock in UI
    },
  })
}
