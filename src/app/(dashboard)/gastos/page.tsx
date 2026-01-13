'use client'

import { useState } from 'react'
import { useCreateExpense, useExpenses } from '@/features/expenses/hooks/use-expenses'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { ArrowDownCircle, Trash2 } from 'lucide-react'

export default function GastosPage() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('INSUMOS')
  const [paymentMethod, setPaymentMethod] = useState('EFECTIVO')

  const { mutate: createExpense, isPending } = useCreateExpense()
  const { data: expenses, isLoading: loadingExpenses } = useExpenses()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!description || !amount) return

    createExpense(
      {
        description,
        amount_usd: parseFloat(amount),
        category,
        payment_method: paymentMethod,
      },
      {
        onSuccess: () => {
          toast.success('Gasto registrado')
          setDescription('')
          setAmount('')
          // Keep category and method as they might repeat
        },
        onError: () => {
          toast.error('Error al guardar gasto')
        },
      }
    )
  }

  return (
    <div className="p-4 space-y-6 max-w-md mx-auto w-full">
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Registro de Gastos</h2>
        <p className="text-muted-foreground">Registra salidas de dinero y pagos.</p>
      </div>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <ArrowDownCircle className="w-5 h-5" />
            Registrar Salida
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Monto (USD)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="text-lg font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="INSUMOS">Insumos</SelectItem>
                    <SelectItem value="SERVICIOS">Servicios</SelectItem>
                    <SelectItem value="NOMINA">Nómina</SelectItem>
                    <SelectItem value="MANTENIMIENTO">Mantenimiento</SelectItem>
                    <SelectItem value="OTROS">Otros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                placeholder="Ej: Harina, Pago luz..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              disabled={isPending}
            >
              {isPending ? 'Registrando...' : 'Registrar Gasto'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Gastos de Hoy</h3>
        <div className="space-y-2">
          {loadingExpenses ? (
            <p className="text-sm text-muted-foreground">Cargando...</p>
          ) : expenses?.length === 0 ? (
            <p className="text-sm text-muted-foreground">No hay gastos registrados hoy.</p>
          ) : (
            expenses?.map((expense) => (
              <div
                key={expense.id}
                className="flex justify-between items-center p-3 bg-card border rounded-lg shadow-sm"
              >
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{format(new Date(expense.created_at), 'h:mm a', { locale: es })}</span>
                    <span className="bg-secondary px-1.5 rounded">{expense.category}</span>
                  </div>
                </div>
                <div className="font-bold text-red-600">-${expense.amount_usd.toFixed(2)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
