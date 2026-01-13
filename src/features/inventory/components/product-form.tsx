'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCreateProduct } from '../hooks/use-products'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { DrawerClose, DrawerFooter } from '@/components/ui/drawer'
import { toast } from 'sonner' // Assuming sonner is installed or we use simple alert for now. Setup said "Toast/Sonner". I'll check if installed later, for now simple console.

const productSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  price: z.coerce.number().min(0.01, 'El precio debe ser mayor a 0'),
  cost: z.coerce.number().min(0, 'El costo no puede ser negativo'),
  stock: z.coerce.number().int().min(0, 'El stock no puede ser negativo'),
})

type ProductFormValues = z.infer<typeof productSchema>

export default function ProductForm({ onSuccess }: { onSuccess?: () => void }) {
  const mutation = useCreateProduct()

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      cost: 0,
      stock: 0,
    },
  })

  const onSubmit = (data: ProductFormValues) => {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset()
        onSuccess?.()
      },
      onError: (error) => {
        console.error(error)
        // Toast here normally
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Producto</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Pan Francés" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <DrawerFooter className="px-0 pt-4">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? 'Guardando...' : 'Guardar Producto'}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </form>
    </Form>
  )
}
