"use client";

import { useProducts } from "@/features/inventory/hooks/use-products";

export default function InventarioPage() {
  const { products } = useProducts();

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Gestión de Inventario</h1>
      <p className="text-muted-foreground">Datos simulados (Backend no conectado)</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 bg-card shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">Stock</p>
                <p className={`font-bold ${product.stock < 20 ? 'text-red-500' : 'text-zinc-900'}`}>
                  {product.stock} un.
                </p>
              </div>
              <button className="text-sm bg-zinc-900 text-white px-3 py-1 rounded-md hover:bg-zinc-800 transition-colors">
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
