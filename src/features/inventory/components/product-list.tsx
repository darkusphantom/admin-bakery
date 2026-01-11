'use client'

import { useGetProducts } from '../hooks/use-products'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProductList() {
  const { data: products, isLoading, isError } = useGetProducts()

  if (isLoading) {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[100px] w-full rounded-xl" />
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-4 rounded-md bg-red-50 text-red-500">
        Error al cargar productos. Por favor, intenta de nuevo.
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No hay productos registrados. ¡Agrega uno!
      </div>
    )
  }

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardContent className="p-4 flex justify-between items-center">
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">{product.name}</span>
              <span className="text-sm text-muted-foreground mt-1">
                Stock:{' '}
                <span className={product.stock <= 5 ? 'text-red-500 font-bold' : ''}>
                  {product.stock}
                </span>
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
              <span className="text-xs text-muted-foreground">Unitario</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
