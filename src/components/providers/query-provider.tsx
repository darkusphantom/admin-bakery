'use client' // Importante: Esto corre en el navegador

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export default function QueryProvider({ children }: { children: React.ReactNode }) {
    // useState asegura que el cliente solo se cree una vez por sesión de navegador
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // TIEMPO DE VIDA DE LOS DATOS (Configuración "Venezuela")
                // Los datos se consideran "frescos" por 5 minutos.
                // Si se va el internet, la app mostrará estos datos sin intentar recargar.
                staleTime: 1000 * 60 * 5,

                // Reintentos automáticos si falla la conexión
                retry: 1,
            },
        },
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}