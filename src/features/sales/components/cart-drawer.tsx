'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useCart } from '@/features/sales/hooks/use-cart'
import { useExchangeRate } from '@/features/settings/hooks/use-exchange-rate'
import { useCreateSale } from '@/features/sales/hooks/use-create-sale'
import { PriceTag } from '@/components/shared/price-tag'

export function CartDrawer({
  children,
  open,
  onOpenChange,
}: {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const { items, updateQuantity, removeItem, clearCart, totalUsd } = useCart()
  const { data: rateData } = useExchangeRate()
  const { mutate: createSale, isPending } = useCreateSale()

  const [paymentMethod, setPaymentMethod] = useState('efectivo')

  const rate = rateData?.rate || 0
  const totalBs = totalUsd * rate

  const handleCheckout = () => {
    if (items.length === 0) return

    createSale(
      {
        items,
        total: totalUsd,
        totalBs,
        paymentMethod,
        exchangeRateSnapshot: rate,
      },
      {
        onSuccess: () => {
          toast.success('Venta registrada con éxito')
          clearCart()
          if (onOpenChange) onOpenChange(false)
        },
        onError: (error) => {
          toast.error('Error al registrar venta: ' + error.message)
        },
      }
    )
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle className="text-center text-xl">Resumen de Venta</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 overflow-y-auto max-h-[50vh] space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-muted-foreground py-10">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-20" />
              <p>Carrito vacío</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between gap-4 border-b pb-4 last:border-0"
              >
                <div className="flex-1">
                  <p className="font-bold line-clamp-1">{item.product.name}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>
                      ${item.product.price} x {item.quantity}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-4 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary active:scale-95"
                    disabled={item.quantity >= item.product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
          <div className="flex justify-between items-end mb-4">
            <span className="text-muted-foreground">Total a Pagar:</span>
            <PriceTag priceUsd={totalUsd} className="items-end text-xl" />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {['efectivo', 'pago_movil', 'punto'].map((method) => (
              <Button
                key={method}
                variant={paymentMethod === method ? 'default' : 'outline'}
                onClick={() => setPaymentMethod(method)}
                className="capitalize"
              >
                {method.replace('_', ' ')}
              </Button>
            ))}
          </div>

          <DrawerFooter className="p-0">
            <Button
              size="lg"
              className="w-full text-lg h-14"
              onClick={handleCheckout}
              disabled={isPending || items.length === 0}
            >
              {isPending ? 'Procesando...' : `COBRAR $${totalUsd.toFixed(2)}`}
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost">Seguir Comprando</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
