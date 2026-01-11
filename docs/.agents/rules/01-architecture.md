---
trigger: always_on
---

# REGLAS DE ARQUITECTURA Y ESTRUCTURA

## 1. Patrón: Feature-Based Architecture (Vertical Slice)
**Regla:** El código debe organizarse por **Funcionalidad (Feature)**, no por tipo técnico.
**Estructura:** `src/features/[nombre-funcionalidad]/`

### Contexto y Justificación (Por qué)
- **Escalabilidad:** En el futuro, si queremos borrar el módulo de "Inventario", solo eliminamos la carpeta `features/inventory`. No tenemos que buscar archivos dispersos en toda la app.
- **Mantenimiento:** Mantiene junta la lógica que cambia junta. La UI de ventas y la lógica de cálculo de ventas viven en la misma carpeta.

## 2. Mapa de Carpetas Estricto
- `src/app`: **SOLO Routing.** No escribir lógica de negocio aquí. Solo importar componentes de `features`.
- `src/features/*/components`: Componentes UI que conocen el negocio (ej: `ProductCard` con precio).
- `src/features/*/hooks`: Lógica de estado y llamadas a API (ej: `useCreateSale`).
- `src/components/ui`: Componentes "tontos" y reusables de Shadcn (Botones, Inputs).
- `src/lib`: Configuraciones de terceros (Supabase client, Utils).

## 3. Barreras de Abstracción
- Un `feature` no debe importar directamente detalles internos de otro `feature`. Usar el archivo `index.ts` (Barrel file) si es necesario exponer algo público.