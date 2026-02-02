export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:px-10">
        <header className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            API REST - Rutas del Sabor
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Guia rapida para consumir los endpoints
          </h1>
          <p className="max-w-2xl text-lg text-zinc-700">
            Esta pagina documenta el uso de la API utilizada en el taller de
            React. Usa la URL base pasada por el docente y agrega el endpoint.
            Base:
            <span className="ml-2 inline-block rounded-md bg-zinc-200 px-2 py-1 text-sm">
              https://api-react-taller-production.up.railway.app
            </span>
          </p>
        </header>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Autenticacion (JWT)</h2>
          <p className="text-zinc-700">
            Para endpoints protegidos, enviar el header:
            <span className="ml-2 inline-block rounded bg-zinc-100 px-2 py-1 text-sm">
              Authorization: Bearer &lt;token&gt;
            </span>
          </p>
          <div className="grid gap-4">
            <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
              <pre className="whitespace-pre-wrap">
                {`POST /api/auth/register
{
  "username": "ana",
  "name": "Ana Pereira",
  "password": "password123"
}`}
              </pre>
            </div>
            <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
              <pre className="whitespace-pre-wrap">
                {`POST /api/auth/login
{
  "username": "ana",
  "password": "password123"
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Locales</h2>
          <p className="text-zinc-700">
            Filtros disponibles: q, type, priceRange, rating, city, zone.
          </p>
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
            <pre className="whitespace-pre-wrap">
              {`GET /api/locals?q=cafe&type=cafeteria&priceRange=economico&rating=4&city=Montevideo&zone=Centro`}
            </pre>
          </div>
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
            <pre className="whitespace-pre-wrap">
              {`POST /api/locals
Authorization: Bearer <token>
{
  "name": "Cafe Central",
  "type": "cafeteria",
  "priceRange": "economico",
  "city": "Montevideo",
  "zone": "Centro",
  "address": "Av. 18 de Julio 1234",
  "hours": "08:00 - 20:00",
  "photos": ["https://example.com/cafe.jpg"]
}`}
            </pre>
          </div>
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
            <pre className="whitespace-pre-wrap">{`GET /api/locals/1`}</pre>
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Platos</h2>
          <p className="text-zinc-700">
            Filtros disponibles: q, category, dateFrom, dateTo, city, zone,
            localId.
          </p>
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
            <pre className="whitespace-pre-wrap">
              {`GET /api/dishes?q=bife&category=principal&dateFrom=2026-01-01&dateTo=2026-12-31&city=Montevideo&localId=2`}
            </pre>
          </div>
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
            <pre className="whitespace-pre-wrap">
              {`POST /api/dishes
Authorization: Bearer <token>
{
  "name": "Bife ancho",
  "category": "principal",
  "localId": 2,
  "city": "Montevideo",
  "price": 890,
  "description": "Corte premium con guarnicion"
}`}
            </pre>
          </div>
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
            <pre className="whitespace-pre-wrap">{`GET /api/dishes/1`}</pre>
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          <p className="text-zinc-700">
            Se pueden crear reviews para locales o platos. rating es obligatorio
            (1 a 5).
          </p>
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
            <pre className="whitespace-pre-wrap">
              {`POST /api/locals/1/reviews
Authorization: Bearer <token>
{
  "rating": 5,
  "comment": "Excelente!"
}`}
            </pre>
          </div>
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
            <pre className="whitespace-pre-wrap">
              {`POST /api/dishes/1/reviews
Authorization: Bearer <token>
{
  "rating": 4,
  "comment": "Muy rico"
}`}
            </pre>
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Usuarios</h2>
          <p className="text-zinc-700">
            Permite ver los locales y platos creados por un usuario.
          </p>
          <div className="rounded-xl bg-zinc-900 p-4 text-sm text-zinc-100">
            <pre className="whitespace-pre-wrap">{`GET /api/users/1`}</pre>
          </div>
        </section>

        <section className="grid gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">Enums soportados</h2>
          <p className="text-zinc-700">
            Se aceptan en minusculas o mayusculas. Espacios se convierten en
            guiones bajos.
          </p>
          <div className="grid gap-2 text-sm text-zinc-700">
            <p>LocalType: RESTAURANTE, CAFETERIA, BAR, FOOD_TRUCK, OTROS</p>
            <p>PriceRange: ECONOMICO, MEDIO, ALTO</p>
            <p>DishCategory: ENTRADA, PRINCIPAL, POSTRE, BEBIDA, OTROS</p>
          </div>
        </section>

        <footer className="text-sm text-zinc-500">
          Ultima actualizacion: Febrero 2026
        </footer>
      </main>
    </div>
  );
}
