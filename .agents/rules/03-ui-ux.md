---
trigger: always_on
---

# REGLAS DE UI/UX (MOBILE FIRST)

## 1. Filosofía: "Dedo Gordo" (Thumb-Friendly)
**Regla:** Todo elemento interactivo debe medir al menos **44px x 44px**.
**Justificación:** Los usuarios usan la app en movimiento y en teléfonos modestos. Botones pequeños causan errores y frustración.

## 2. Navegación
**Regla:** NO usar Sidebars (Menús laterales).
**Implementación:** Usar `BottomNavigationBar` fija en la parte inferior de la pantalla.
**Justificación:** En pantallas altas modernas, el pulgar no llega a la esquina superior izquierda (menú hamburguesa). La navegación inferior es ergonómica.

## 3. Feedback Visual
**Regla:** Cada acción (Guardar, Borrar) debe tener feedback inmediato.
- Éxito: Toast/Sonner discreto.
- Carga: Skeleton loaders (esqueletos grises) en lugar de spinners blancos gigantes.
- Error: Mensajes claros en español, no códigos de error técnicos.