---
trigger: always_on
---

# GOBERNANZA DE GIT Y CONTROL DE CALIDAD

## 1. Estrategia de Ramas

- **Main:** Código estable de producción.
- **Feat Branches:** `feat/nombre-feature` (Desde Main -> PR -> Main).
- **Fix Branches:** `fix/descripcion-bug`.

## 2. Estándar de Commits (Strict)

Usamos **Conventional Commits**. Husky rechazará cualquier commit que no siga el formato.
Estructura: `<type>(<scope>): <short description>`

### Tipos Permitidos:

- `feat`: Nueva funcionalidad para el usuario.
- `fix`: Arreglo de bug.
- `docs`: Cambios solo en documentación.
- `style`: Cambios de formato (espacios, puntos y coma).
- `refactor`: Cambio de código que no arregla bugs ni añade features.
- `chore`: Actualización de tareas de build, configs, paquetes.

### Ejemplos:

✅ `feat(inventory): add product list component`
✅ `fix(auth): resolve login timeout issue`
❌ `add product list` (Falta tipo)
❌ `feat: add stuff` (Falta scope o muy vago)

## 3. Hooks Automatizados

- **Pre-commit:** Ejecuta ESLint solo en archivos modificados. Si hay errores de linter, el commit falla.
- **Commit-msg:** Verifica el formato del mensaje.
