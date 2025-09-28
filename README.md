# 🌱Caring – Frontend (React + TypeScript + Vite)

Esta app es el cliente web del proyecto, construido con React, TypeScript y Vite. Se comunica con el [backend](https://github.com/saragarrofe/caring-back) de Caring vía API REST (_en construcción_) y forma parte de un setup multi‐repo con submódulos.

## 🧱 Stack y requisitos

- Runtime: Node.js ≥ 18.x
- Build: Vite 7 + @vitejs/plugin-react-swc
- UI: React 18 + TypeScript 5
- Routing: react-router-dom v6
- Estilos: Bootstrap 5 + React Bootstrap + Bootstrap Icons y styled-components para estilos en componentes cuando sea necesario
- Lint/Formato: ESLint 9 + typescript-eslint 8 (Flat config) + Prettier 3

## 🚀 Features

- **Gestión de plantas**: listado de plantas con imagen, especie, frecuencia y fecha de último riego
- **Detalle de planta**: ruta paramétrica /my-plants/:id con información detallada
- **Persistencia local**: último riego guardado en localStorage
- **Cálculo automático de próximo riego**: con mensajes dinámicos (“hoy”, “mañana”, “en 3 días”) - _en construcción_
- **Mobile-first UI**: bottom navigation + grid adaptable (2 columnas en móvil, 3 en desktop)
- **Perfil de usuario**: saludo personalizado, acciones (editar, logout, notificaciones, tema)
- **Login & Register**: formularios con validación simple en frontend

## 🏗️ Arquitectura y estructura
```
caring-vite/
├── public/               # estáticos (ej: logo)
├── src/
│   ├── components/       # componentes reutilizables (Navbar, PlantCard, Profile...)
│   ├── mocks/            # datos de prueba (mockPlants.ts)
│   ├── pages/            # páginas principales (Home, Login, MyPlants, Profile, ...)
│   ├── types/            # tipos TS (Plant, User, ...)
│   ├── utils/            # helpers (ej. fechas, cálculos)
│   ├── App.tsx           # shell principal con Router
│   └── main.tsx          # entrypoint
├── package.json
└── README.md
```

## 📦 Scripts disponibles

```
npm run dev → levanta el servidor en modo desarrollo 
npm run build → build de producción optimizado
npm run preview → previsualiza el build localmente
npm run lint → ejecuta ESLint sobre todo el código
npm run format → formatea con Prettier
npm run format:check → verifica formato sin modificar archivos
```

## 🏃 Próximos pasos

- Conectar con [backend](https://github.com/saragarrofe/caring-back) (Node.js + Express + MySQL)
- Notificaciones de riego reales
- Modo oscuro/light configurable desde el perfil
- Validación de formularios con Zod
- Rutas protegidas (según login)
