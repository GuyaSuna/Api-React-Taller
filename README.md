# API REST - Rutas del Sabor

API REST hecha con Next.js (App Router) + Prisma + MySQL.

## Configuracion rapida

1. Crea el archivo `.env` basado en `.env.example`.
2. Configura tu base MySQL y actualiza `DATABASE_URL`.
3. Ejecuta migraciones y seed:

```bash
npm run db:migrate
npm run db:seed
```

4. Levanta el servidor:

```bash
npm run dev
```

## Autenticacion

JWT simple con header `Authorization: Bearer <token>`.

## Endpoints principales

Auth:
- `POST /api/auth/register` { username, name, password }
- `POST /api/auth/login` { username, password }

Locales:
- `GET /api/locals` filtros: `q`, `type`, `priceRange`, `rating`, `city`, `zone`
- `POST /api/locals` (auth)
- `GET /api/locals/:id`
- `GET /api/locals/:id/reviews`
- `POST /api/locals/:id/reviews` (auth)

Platos:
- `GET /api/dishes` filtros: `q`, `category`, `dateFrom`, `dateTo`, `city`, `zone`, `localId`
- `POST /api/dishes` (auth)
- `GET /api/dishes/:id`
- `GET /api/dishes/:id/reviews`
- `POST /api/dishes/:id/reviews` (auth)

Usuarios:
- `GET /api/users/:id` (muestra locales y platos creados)

Salud:
- `GET /api/health`

## Notas

- Los enums aceptan valores en minusculas o mayusculas (ej: `bar`, `BAR`).
- `rating` filtra por promedio del local.
