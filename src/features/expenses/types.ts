export interface Expense {
  id: string
  description: string
  amount_usd: number
  category: string
  payment_method: string
  created_at: string
}

export type CreateExpenseParams = Omit<Expense, 'id' | 'created_at'>
