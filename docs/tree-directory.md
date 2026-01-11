/
├── public/
│   ├── manifest.json       # CRÍTICO: Configuración para instalar como App (PWA)
│   ├── sw.js               # Service Worker (generado o manual para Offline)
│   └── icons/              # Iconos de la app
│
├── src/
│   ├── app/                # (Next.js App Router) Solo Rutas y Layouts
│   │   ├── (auth)/         # Grupo de rutas de Login (login, register)
│   │   ├── (dashboard)/    # Grupo de rutas protegidas
│   │   │   ├── page.tsx    # Dashboard principal (Resumen)
│   │   │   ├── ventas/     # Página de registro de ventas
│   │   │   └── inventario/ # Página de gestión
│   │   ├── layout.tsx      # Aquí va el Providers (QueryClient, Auth)
│   │   └── globals.css     # Tailwind base
│   │
│   ├── components/         # UI "Tonta" (Botones, Inputs, Cards de Shadcn)
│   │   ├── ui/             # Aquí vive shadcn/ui (no tocar lógica aquí)
│   │   └── shared/         # Componentes reusables propios (ej. BottomNav)
│   │
│   ├── features/           # EL CORAZÓN DE LA APP (Lógica de Negocio)
│   │   ├── sales/          # Todo lo relacionado con ventas
│   │   │   ├── components/ # Formularios de venta, Ticket visual
│   │   │   ├── hooks/      # useCreateSale, useDailySales
│   │   │   └── types.ts    # TypeScript interfaces para ventas
│   │   ├── inventory/      # Todo lo relacionado con productos
│   │   │   ├── components/ # Scanner, Lista de productos
│   │   │   ├── hooks/      # useProductList, useUpdateStock
│   │   │   └── types.ts
│   │   └── analytics/      # Gráficos y reportes
│   │
│   ├── lib/                # Configuración de infraestructura
│   │   ├── supabase/       # Cliente de Supabase (Client & Server)
│   │   ├── react-query/    # Configuración de caché y reintentos
│   │   └── utils.ts        # La utilidad 'cn' de shadcn
│   │
│   └── hooks/              # Hooks Globales (no de negocio)
│       └── use-network.ts  # Detectar si hay internet o no
│
├── .env.local              # Claves de Supabase (NO SUBIR A GITHUB)
└── next.config.mjs         # Configuración de PWA