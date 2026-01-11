---
trigger: always_on
---

# REGLAS DE CAPA DE DATOS (DATA LAYER)

## 1. Patrón: Repository Hook (Custom Hooks)
**Regla:** NUNCA llamar a `supabase` directamente dentro de un componente UI (`.tsx`).
**Implementación:** Todo acceso a datos debe hacerse a través de un Custom Hook en `features/*/hooks`.

### Contexto y Justificación (Por qué)
- **Desacoplamiento:** Si la UI llama directo a la DB, no podemos cambiar la DB en el futuro sin reescribir la vista.
- **Testing:** Es más fácil probar un hook (`useProducts`) que probar un componente visual conectado a la DB.
- **Limpieza:** Mantiene los componentes visuales enfocados solo en pintar pixels.

## 2. Gestión de Estado Asíncrono (TanStack Query)
**Regla:** Usar `useQuery` para leer y `useMutation` para escribir.
**Configuración:**
- `staleTime`: Configurar agresivamente (ej: 5 minutos) para evitar refetching innecesario en móviles.
- `gcTime`: Mantener caché para funcionalidad Offline básica.

## 3. Optimistic UI (UI Optimista)
**Regla:** Para acciones críticas (Crear Venta), la UI debe actualizarse *antes* de recibir respuesta del servidor.
**Justificación:** El usuario (en la panadería) tiene internet inestable. No puede esperar 3 segundos viendo un spinner. La app debe sentirse inmediata.

## 4. Tipado (TypeScript)
**Regla:** Usar `Database['public']['Tables']['...']['Row']` generado por Supabase. No crear interfaces manuales que se desincronicen de la DB real.