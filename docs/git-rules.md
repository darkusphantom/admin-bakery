Usaremos Trunk-Based Development (Simplificado) y Conventional Commits.

1. Estrategia de Ramas:

main: Es la verdad absoluta. Lo que está aquí SIEMPRE debe compilar y funcionar.

Ramas de Feature: Salen de main y vuelven a main.

Nomenclatura: feat/nombre-feature (para cosas nuevas).

Nomenclatura: fix/nombre-bug (para arreglos).

Nomenclatura: chore/configuracion (para configs, husky, docs).

2. Formato de Commits (Conventional Commits): Tus commits deben verse así: tipo(ámbito): descripción corta

feat(inventario): agregar tabla de productos (Nueva funcionalidad)

fix(auth): corregir error en login (Arreglo de bug)

docs(readme): actualizar instrucciones (Documentación)

chore(deps): actualizar next.js (Mantenimiento)

refactor(ventas): limpiar hook de useSales (Cambio de código que no altera funcionalidad)