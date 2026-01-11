'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import ProductList from '@/features/inventory/components/product-list'
import ProductForm from '@/features/inventory/components/product-form'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

export default function InventarioPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="p-4 space-y-6 pb-24">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventario</h1>
      </div>

      <ProductList />

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-20 right-4 z-40">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              size="icon"
              className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm pb-safe">
              <DrawerHeader>
                <DrawerTitle>Nuevo Producto</DrawerTitle>
                <DrawerDescription>
                  Ingresa los detalles del producto para el inventario.
                </DrawerDescription>
              </DrawerHeader>
              <ProductForm onSuccess={() => setOpen(false)} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  )
}
