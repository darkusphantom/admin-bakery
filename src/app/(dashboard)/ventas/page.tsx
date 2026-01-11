'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { useGetProducts } from '@/features/inventory/hooks/use-products'
import { CartProvider, useCart } from '@/features/sales/hooks/use-cart'
import { PriceTag } from '@/components/shared/price-tag'
import { CartDrawer } from '@/features/sales/components/cart-drawer'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

function POSContent() {
  const { data: products, isLoading } = useGetProducts()
  const { addItem, totalItems, totalUsd } = useCart()
  const [searchTerm, setSearchTerm] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Safely handle products being undefined/null
  const safeProducts = products || []

  const filteredProducts = safeProducts.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* h-[calc(100vh-8rem)] accounts for header, mobile nav etc. adjusting as needed */}

      {/* 1. Top Zone: Search */}
      <div className="bg-background sticky top-0 z-10 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Buscar producto..."
            className="pl-10 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Middle Zone: Grid */}
      <div className="flex-1 overflow-y-auto pb-24">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredProducts.map((product) => {
              const isOutOfStock = product.stock <= 0
              return (
                <button
                  key={product.id}
                  onClick={() => !isOutOfStock && addItem(product)}
                  disabled={isOutOfStock}
                  className={`
                      flex flex-col justify-between items-start text-left
                      p-4 rounded-xl border bg-card text-card-foreground shadow-sm 
                      transition-all hover:border-primary active:scale-95
                      w-full h-full min-h-[120px]
                      ${isOutOfStock ? 'opacity-50 grayscale cursor-not-allowed' : ''}
                    `}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-start w-full gap-2">
                      <span className="font-bold line-clamp-2 leading-tight">{product.name}</span>
                      {isOutOfStock && (
                        <span className="text-[10px] bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded shrink-0">
                          AGOTADO
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1 block">
                      Stock: {product.stock}
                    </span>
                  </div>

                  <div className="mt-3 w-full flex justify-end">
                    <PriceTag priceUsd={product.price} />
                  </div>
                </button>
              )
            })}

            {filteredProducts.length === 0 && !isLoading && (
              <div className="col-span-2 text-center py-10 text-muted-foreground">
                No hay productos que coincidan.
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Bottom Zone: Sticky Bar */}
      {/* Using fixed positioning relative to viewport to ensure it stays above nav */}
      <div
        className="bg-primary text-primary-foreground p-3 fixed bottom-[4.5rem] left-4 right-4 z-40 shadow-xl rounded-lg cursor-pointer animate-in slide-in-from-bottom-5 fade-in duration-300"
        onClick={() => setIsCartOpen(true)}
        style={{ display: totalItems > 0 ? 'block' : 'none' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-background text-foreground h-10 w-10 rounded-full flex items-center justify-center font-bold shadow-sm">
              {totalItems}
            </div>
            <div className="flex flex-col">
              <span className="font-medium leading-none">Ver Carrito</span>
              <span className="text-xs text-primary-foreground/80">
                {totalItems} items seleccionados
              </span>
            </div>
          </div>

          <div className="text-right">
            <PriceTag
              priceUsd={totalUsd}
              className="items-end text-primary-foreground"
              showBs={true}
            />
          </div>
        </div>
      </div>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  )
}

export default function VentasPage() {
  return (
    <div className="p-4 h-full">
      <CartProvider>
        <POSContent />
      </CartProvider>
    </div>
  )
}
