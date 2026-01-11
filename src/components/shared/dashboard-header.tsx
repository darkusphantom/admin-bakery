'use client'

import { useState, useEffect, useRef } from 'react'
import { RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useExchangeRate, useUpdateExchangeRate } from '@/features/settings/hooks/use-exchange-rate'
import { getDolarBcv } from '@/features/settings/services/dolar-api'

export function DashboardHeader() {
  const { data: exchangeData, isLoading } = useExchangeRate()
  const { mutate: updateRate, isPending: isUpdating } = useUpdateExchangeRate()

  const [isOpen, setIsOpen] = useState(false)
  const [manualRate, setManualRate] = useState<string>('')
  const [isLoadingBcv, setIsLoadingBcv] = useState(false)

  // Ref to ensure auto-check only runs once per session/mount
  const hasAutoChecked = useRef(false)

  // Sync state when data loads or dialog opens
  useEffect(() => {
    if (exchangeData?.rate) {
      setManualRate(exchangeData.rate.toString())
    }
  }, [exchangeData, isOpen])

  // Auto-check logic
  useEffect(() => {
    // If loading, no data, or already checked, skip
    if (isLoading || !exchangeData || hasAutoChecked.current) return

    const checkAndSync = async () => {
      hasAutoChecked.current = true // Mark as checked

      try {
        const lastUpdate = new Date(exchangeData.updated_at)
        const now = new Date()

        // Calculate difference in hours
        const diffMs = now.getTime() - lastUpdate.getTime()
        const diffHours = diffMs / (1000 * 60 * 60)

        // Check if day changed
        const isDifferentDay = now.getDate() !== lastUpdate.getDate()

        // Logic: Sync if > 12 hours OR different day
        if (diffHours > 12 || isDifferentDay) {
          // Toast loading discreetly? Maybe not needed to avoid noise.

          const newRate = await getDolarBcv()

          // Only update if different? (Not strictly required by prompt, but good practice).
          // Prompt says: "Si tiene éxito, ejecuta la mutación updateExchangeRate automáticamente."

          updateRate(newRate, {
            onSuccess: () => {
              toast.success(`📅 Tasa sincronizada automáticamente: Bs ${newRate}`)
            },
            onError: () => {
              // Fail silently or discreet toast
              toast.error('No se pudo actualizar la tasa automáticamente')
            },
          })
        }
      } catch (error) {
        console.error('Auto-sync failed:', error)
        // Silent fail as per requirements ("falla en silencio o muestra un toast discreto")
        toast.info('Usando tasa guardada (Offline)')
      }
    }

    checkAndSync()
  }, [exchangeData, isLoading, updateRate])

  const handleFetchBcv = async () => {
    setIsLoadingBcv(true)
    try {
      const bcvRate = await getDolarBcv()
      setManualRate(bcvRate.toString())
      toast.success('Tasa BCV obtenida')
    } catch (error) {
      console.error(error)
      toast.error('Error al obtener BCV')
    } finally {
      setIsLoadingBcv(false)
    }
  }

  const handleSave = () => {
    const newRate = parseFloat(manualRate)
    if (isNaN(newRate) || newRate <= 0) return

    updateRate(newRate, {
      onSuccess: () => {
        setIsOpen(false)
        toast.success('Tasa actualizada correctamente')
      },
    })
  }

  return (
    <div className="flex items-center justify-between p-4 bg-background border-b sticky top-0 z-10">
      <h1 className="text-xl font-bold">Panadería</h1>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">
          Tasa: Bs. {isLoading ? '...' : exchangeData?.rate?.toFixed(2)}
        </span>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <RefreshCw className="h-4 w-4" />
              <span className="sr-only">Actualizar Tasa</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Actualizar Tasa de Cambio</DialogTitle>
              <DialogDescription>
                Ajusta la tasa del dólar para los precios del sistema.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="secondary"
                  onClick={handleFetchBcv}
                  disabled={isLoadingBcv}
                  className="w-full"
                >
                  {isLoadingBcv ? 'Buscando...' : 'Obtener BCV'}
                </Button>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rate" className="text-right">
                  Tasa
                </Label>
                <Input
                  id="rate"
                  value={manualRate}
                  onChange={(e) => setManualRate(e.target.value)}
                  className="col-span-3"
                  type="number"
                  step="0.01"
                />
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleSave} disabled={isUpdating}>
                {isUpdating ? 'Guardando...' : 'Guardar Tasa'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
