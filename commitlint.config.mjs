const config = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // Reglas personalizadas si quieres ser más estricto
        'type-enum': [
            2,
            'always',
            [
                'feat',     // Nueva funcionalidad
                'fix',      // Corrección de errores
                'docs',     // Documentación
                'style',    // Formato (espacios, comas)
                'refactor', // Refactorización de código
                'perf',     // Mejoras de rendimiento
                'test',     // Añadir tests
                'chore',    // Tareas de construcción, deps
                'revert',   // Revertir cambios
                'build'     // Cambios en build system o dependencias externas
            ],
        ],
    },
};

export default config;