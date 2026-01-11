"use client";

import { useSales } from "@/features/sales/hooks/use-sales";

export default function VentasPage() {
  const { sales } = useSales();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Registro de Ventas</h1>
      <p className="text-muted-foreground">Datos simulados (Backend no conectado)</p>
      
      <div className="border rounded-lg p-4 bg-card">
        <h2 className="font-semibold mb-2">Últimas Ventas</h2>
        <div className="space-y-2">
          {sales.map((sale) => (
            <div key={sale.id} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
              <div>
                <p className="font-medium">Venta #{sale.id.split("-")[1]}</p>
                <p className="text-sm text-muted-foreground">{sale.createdAt.toLocaleTimeString()}</p>
              </div>
              <p className="font-bold text-green-600">${sale.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
