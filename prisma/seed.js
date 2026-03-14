const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de la base de datos...");

  // Limpiar datos existentes
  console.log("🧹 Limpiando datos existentes...");
  await prisma.review.deleteMany({});
  await prisma.dish.deleteMany({});
  await prisma.local.deleteMany({});
  await prisma.user.deleteMany({});

  const passwordHash = await bcrypt.hash("password123", 10);

  // Crear usuarios
  console.log("👥 Creando usuarios...");
  const [ana, bruno, carlos, maria, diego, lucia, pablo, sofia, andres, valentina] = await Promise.all([
    prisma.user.create({
      data: { username: "ana", name: "Ana Pereira", passwordHash },
    }),
    prisma.user.create({
      data: { username: "bruno", name: "Bruno Silva", passwordHash },
    }),
    prisma.user.create({
      data: { username: "carlos_chef", name: "Carlos Rodriguez", passwordHash },
    }),
    prisma.user.create({
      data: { username: "maria_garcia", name: "María García", passwordHash },
    }),
    prisma.user.create({
      data: { username: "diego_martinez", name: "Diego Martínez", passwordHash },
    }),
    prisma.user.create({
      data: { username: "lucia_fernandez", name: "Lucía Fernández", passwordHash },
    }),
    prisma.user.create({
      data: { username: "pablo_lopez", name: "Pablo López", passwordHash },
    }),
    prisma.user.create({
      data: { username: "sofia_morales", name: "Sofía Morales", passwordHash },
    }),
    prisma.user.create({
      data: { username: "andres_gomez", name: "Andrés Gómez", passwordHash },
    }),
    prisma.user.create({
      data: { username: "valentina_ruiz", name: "Valentina Ruiz", passwordHash },
    }),
  ]);

  // Crear locales
  console.log("🏪 Creando locales...");
  const locales = await Promise.all([
    // Cafeterías
    prisma.local.create({
      data: {
        name: "Café Central",
        type: "CAFETERIA",
        priceRange: "ECONOMICO",
        description: "Cafetería de barrio con opciones dulces y saladas.",
        address: "Av. 18 de Julio 1234",
        city: "Montevideo",
        zone: "Centro",
        hours: "08:00 - 20:00",
        photos: ["https://example.com/cafe1.jpg"],
        creatorId: ana.id,
      },
    }),
    prisma.local.create({
      data: {
        name: "Café Literario",
        type: "CAFETERIA",
        priceRange: "MEDIO",
        description: "Café de especialidad con ambiente acogedor para leer.",
        address: "Sarandí 675",
        city: "Montevideo",
        zone: "Ciudad Vieja",
        hours: "07:00 - 22:00",
        photos: ["https://example.com/cafe2.jpg", "https://example.com/cafe2b.jpg"],
        creatorId: lucia.id,
      },
    }),
    prisma.local.create({
      data: {
        name: "Coffee & Co",
        type: "CAFETERIA",
        priceRange: "ALTO",
        description: "Café premium con granos importados y métodos especiales.",
        address: "Av. Pocitos 890",
        city: "Montevideo",
        zone: "Pocitos",
        hours: "06:30 - 21:00",
        photos: ["https://example.com/coffee.jpg"],
        creatorId: sofia.id,
      },
    }),

    // Restaurantes
    prisma.local.create({
      data: {
        name: "La Parrilla del Puerto",
        type: "RESTAURANTE",
        priceRange: "ALTO",
        description: "Especialidad en carnes premium y maridajes.",
        address: "Rambla 456",
        city: "Montevideo",
        zone: "Ciudad Vieja",
        hours: "12:00 - 23:00",
        photos: ["https://example.com/parrilla1.jpg", "https://example.com/parrilla2.jpg"],
        creatorId: bruno.id,
      },
    }),
    prisma.local.create({
      data: {
        name: "Trattoria Milano",
        type: "RESTAURANTE",
        priceRange: "MEDIO",
        description: "Auténtica cocina italiana con pastas caseras.",
        address: "21 de Setiembre 1567",
        city: "Montevideo",
        zone: "Cordón",
        hours: "19:00 - 24:00",
        photos: ["https://example.com/trattoria.jpg"],
        creatorId: carlos.id,
      },
    }),
    prisma.local.create({
      data: {
        name: "Sushi Zen",
        type: "RESTAURANTE",
        priceRange: "ALTO",
        description: "Sushi fresco y fusión nikkei de alta calidad.",
        address: "Av. Rivera 3421",
        city: "Montevideo",
        zone: "Punta Carretas",
        hours: "19:30 - 23:30",
        photos: ["https://example.com/sushi.jpg"],
        creatorId: maria.id,
      },
    }),

    // Bares
    prisma.local.create({
      data: {
        name: "Bar Nocturno",
        type: "BAR",
        priceRange: "ALTO",
        description: "Cocktail bar con vista panorámica de la ciudad.",
        address: "Rambla Rep. de Francia 1200",
        city: "Montevideo",
        zone: "Pocitos",
        hours: "18:00 - 02:00",
        photos: ["https://example.com/bar1.jpg", "https://example.com/bar2.jpg"],
        creatorId: diego.id,
      },
    }),
    prisma.local.create({
      data: {
        name: "La Cervecería Artesanal",
        type: "BAR",
        priceRange: "MEDIO",
        description: "Cervezas artesanales locales y comida de bar.",
        address: "Av. Brasil 2890",
        city: "Montevideo",
        zone: "Palermo",
        hours: "17:00 - 01:00",
        photos: ["https://example.com/cerveceria.jpg"],
        creatorId: pablo.id,
      },
    }),

    // Food Trucks
    prisma.local.create({
      data: {
        name: "Hamburguesas del Puerto",
        type: "FOOD_TRUCK",
        priceRange: "ECONOMICO",
        description: "Food truck especializado en hamburguesas gourmet.",
        address: "Puerto del Buceo",
        city: "Montevideo",
        zone: "Buceo",
        hours: "19:00 - 01:00",
        photos: ["https://example.com/foodtruck1.jpg"],
        creatorId: andres.id,
      },
    }),
    prisma.local.create({
      data: {
        name: "Tacos y Más",
        type: "FOOD_TRUCK",
        priceRange: "ECONOMICO",
        description: "Auténticos tacos mexicanos y comida tex-mex.",
        address: "Explanada Universidad",
        city: "Montevideo",
        zone: "Parque Rodó",
        hours: "11:30 - 15:00, 19:00 - 23:00",
        photos: ["https://example.com/tacos.jpg"],
        creatorId: valentina.id,
      },
    }),

    // Otros (Heladería, Panadería)
    prisma.local.create({
      data: {
        name: "Gelato & Co",
        type: "OTROS",
        priceRange: "MEDIO",
        description: "Heladería artesanal con sabores únicos y naturales.",
        address: "Av. Rivera 2345",
        city: "Montevideo",
        zone: "Cordón",
        hours: "10:00 - 22:00",
        photos: ["https://example.com/gelato.jpg"],
        creatorId: ana.id,
      },
    }),
    prisma.local.create({
      data: {
        name: "Panadería Don Juan",
        type: "OTROS",
        priceRange: "ECONOMICO",
        description: "Panadería tradicional con productos frescos diarios.",
        address: "Av. 8 de Octubre 3456",
        city: "Montevideo",
        zone: "Tres Cruces",
        hours: "06:00 - 20:00",
        photos: ["https://example.com/panaderia.jpg"],
        creatorId: bruno.id,
      },
    }),
  ]);

  // Crear platos
  console.log("🍽️ Creando platos...");
  const dishes = [];

  // Platos para Café Central (índice 0)
  const cafecentral_dishes = await Promise.all([
    prisma.dish.create({
      data: {
        name: "Tostado especial",
        category: "ENTRADA",
        description: "Pan ciabatta, jamón, queso y salsa de la casa.",
        price: 220,
        city: "Montevideo",
        zone: "Centro",
        localId: locales[0].id,
        creatorId: ana.id,
      },
    }),
    prisma.dish.create({
      data: {
        name: "Cappuccino doble",
        category: "BEBIDA",
        description: "Café expreso doble con leche cremosa y espuma.",
        price: 180,
        city: "Montevideo",
        zone: "Centro",
        localId: locales[0].id,
        creatorId: ana.id,
      },
    }),
    prisma.dish.create({
      data: {
        name: "Medialunas dulces",
        category: "POSTRE",
        description: "Medialunas caseras con dulce de leche.",
        price: 150,
        city: "Montevideo",
        zone: "Centro",
        localId: locales[0].id,
        creatorId: ana.id,
      },
    }),
  ]);

  // Platos para La Parrilla del Puerto (índice 3)
  const parrilla_dishes = await Promise.all([
    prisma.dish.create({
      data: {
        name: "Bife ancho premium",
        category: "PRINCIPAL",
        description: "Corte premium de 400g con guarnición de papas rústicas.",
        price: 1250,
        city: "Montevideo",
        zone: "Ciudad Vieja",
        localId: locales[3].id,
        creatorId: bruno.id,
      },
    }),
    prisma.dish.create({
      data: {
        name: "Provoleta a la parrilla",
        category: "ENTRADA",
        description: "Queso provolone grillado con orégano y aceite de oliva.",
        price: 380,
        city: "Montevideo",
        zone: "Ciudad Vieja",
        localId: locales[3].id,
        creatorId: bruno.id,
      },
    }),
    prisma.dish.create({
      data: {
        name: "Entraña jugosa",
        category: "PRINCIPAL",
        description: "Entraña de res con chimichurri casero.",
        price: 980,
        city: "Montevideo",
        zone: "Ciudad Vieja",
        localId: locales[3].id,
        creatorId: bruno.id,
      },
    }),
    prisma.dish.create({
      data: {
        name: "Flan con dulce de leche",
        category: "POSTRE",
        description: "Flan casero con dulce de leche artesanal.",
        price: 290,
        city: "Montevideo",
        zone: "Ciudad Vieja",
        localId: locales[3].id,
        creatorId: bruno.id,
      },
    }),
  ]);

  // Platos para Trattoria Milano (índice 4)
  const trattoria_dishes = await Promise.all([
    prisma.dish.create({
      data: {
        name: "Spaghetti Carbonara",
        category: "PRINCIPAL",
        description: "Pasta fresca con panceta, huevo y queso parmesano.",
        price: 650,
        city: "Montevideo",
        zone: "Cordón",
        localId: locales[4].id,
        creatorId: carlos.id,
      },
    }),
    prisma.dish.create({
      data: {
        name: "Bruschetta tricolor",
        category: "ENTRADA",
        description: "Pan tostado con tomate, mozzarella y albahaca.",
        price: 320,
        city: "Montevideo",
        zone: "Cordón",
        localId: locales[4].id,
        creatorId: carlos.id,
      },
    }),
    prisma.dish.create({
      data: {
        name: "Tiramisu della casa",
        category: "POSTRE",
        description: "Tiramisu tradicional con café expreso.",
        price: 390,
        city: "Montevideo",
        zone: "Cordón",
        localId: locales[4].id,
        creatorId: carlos.id,
      },
    }),
  ]);

  // Platos para Bar Nocturno (índice 6)
  const bar_dishes = await Promise.all([
    prisma.dish.create({
      data: {
        name: "Negroni Premium",
        category: "BEBIDA",
        description: "Gin artesanal, Campari y Vermouth rosso.",
        price: 450,
        city: "Montevideo",
        zone: "Pocitos",
        localId: locales[6].id,
        creatorId: diego.id,
      },
    }),
    prisma.dish.create({
      data: {
        name: "Tabla de quesos premium",
        category: "ENTRADA",
        description: "Selección de quesos uruguayos con frutos secos.",
        price: 890,
        city: "Montevideo",
        zone: "Pocitos",
        localId: locales[6].id,
        creatorId: diego.id,
      },
    }),
  ]);

  // Platos para Food Truck (índice 8)
  const foodtruck_dishes = await Promise.all([
    prisma.dish.create({
      data: {
        name: "Hamburguesa BBQ Deluxe",
        category: "PRINCIPAL",
        description: "Carne 200g, queso cheddar, bacon, salsa BBQ, papas fritas.",
        price: 520,
        city: "Montevideo",
        zone: "Buceo",
        localId: locales[8].id,
        creatorId: andres.id,
      },
    }),
    prisma.dish.create({
      data: {
        name: "Limonada artesanal",
        category: "BEBIDA",
        description: "Limonada natural con menta y jengibre.",
        price: 120,
        city: "Montevideo",
        zone: "Buceo",
        localId: locales[8].id,
        creatorId: andres.id,
      },
    }),
  ]);

  // Platos para Heladería (índice 10)
  const heladeria_dishes = await Promise.all([
    prisma.dish.create({
      data: {
        name: "Helado de dulce de leche",
        category: "POSTRE",
        description: "Helado artesanal con dulce de leche de campo.",
        price: 250,
        city: "Montevideo",
        zone: "Cordón",
        localId: locales[10].id,
        creatorId: ana.id,
      },
    }),
    prisma.dish.create({
      data: {
        name: "Smoothie tropical",
        category: "BEBIDA",
        description: "Mango, piña, banana y yogurt natural.",
        price: 280,
        city: "Montevideo",
        zone: "Cordón",
        localId: locales[10].id,
        creatorId: ana.id,
      },
    }),
  ]);

  dishes.push(...cafecentral_dishes, ...parrilla_dishes, ...trattoria_dishes, ...bar_dishes, ...foodtruck_dishes, ...heladeria_dishes);

  // Crear reviews masivas
  console.log("⭐ Creando reviews...");
  const reviews = [];

  // Reviews para locales
  const localReviews = [
    // Café Central
    { rating: 5, comment: "Excelente ambiente y café de calidad.", userId: bruno.id, localId: locales[0].id },
    { rating: 4, comment: "Muy buenos precios y atención rápida.", userId: carlos.id, localId: locales[0].id },
    { rating: 5, comment: "Mi lugar favorito para desayunar.", userId: maria.id, localId: locales[0].id },
    { rating: 4, comment: "Buena ubicación en el centro.", userId: diego.id, localId: locales[0].id },

    // La Parrilla del Puerto
    { rating: 5, comment: "La mejor carne de Montevideo, sin dudas.", userId: ana.id, localId: locales[3].id },
    { rating: 4, comment: "Excelente calidad pero algo caro.", userId: lucia.id, localId: locales[3].id },
    { rating: 5, comment: "Servicio impecable y vista increíble.", userId: pablo.id, localId: locales[3].id },
    { rating: 5, comment: "Vale cada peso que pagás.", userId: sofia.id, localId: locales[3].id },

    // Trattoria Milano
    { rating: 4, comment: "Pasta fresca como en Italia.", userId: diego.id, localId: locales[4].id },
    { rating: 5, comment: "Ambiente muy acogedor y familiar.", userId: andres.id, localId: locales[4].id },
    { rating: 4, comment: "Buena relación calidad-precio.", userId: valentina.id, localId: locales[4].id },

    // Bar Nocturno
    { rating: 5, comment: "Los mejores cocktails de la ciudad.", userId: ana.id, localId: locales[6].id },
    { rating: 5, comment: "Vista espectacular y ambiente único.", userId: carlos.id, localId: locales[6].id },
    { rating: 4, comment: "Perfecto para una noche especial.", userId: maria.id, localId: locales[6].id },

    // Food Truck
    { rating: 4, comment: "Hamburguesas buenísimas y económicas.", userId: bruno.id, localId: locales[8].id },
    { rating: 5, comment: "Rápido y sabroso, ideal para el almuerzo.", userId: lucia.id, localId: locales[8].id },
    { rating: 4, comment: "Buena opción para comer algo rico.", userId: pablo.id, localId: locales[8].id },
  ];

  // Reviews para platos específicos
  const dishReviews = [
    // Café Central - platos
    { rating: 5, comment: "Tostado impecable, muy recomendado.", userId: bruno.id, dishId: cafecentral_dishes[0].id },
    { rating: 4, comment: "Cappuccino cremoso y bien preparado.", userId: maria.id, dishId: cafecentral_dishes[1].id },
    { rating: 5, comment: "Medialunas caseras deliciosas.", userId: carlos.id, dishId: cafecentral_dishes[2].id },

    // Parrilla - platos
    { rating: 5, comment: "Punto perfecto de cocción.", userId: ana.id, dishId: parrilla_dishes[0].id },
    { rating: 4, comment: "Provoleta derretida perfecta.", userId: diego.id, dishId: parrilla_dishes[1].id },
    { rating: 5, comment: "Entraña jugosa y tierna.", userId: lucia.id, dishId: parrilla_dishes[2].id },

    // Trattoria - platos
    { rating: 5, comment: "Carbonara auténtica como en Roma.", userId: pablo.id, dishId: trattoria_dishes[0].id },
    { rating: 4, comment: "Bruschetta fresca y sabrosa.", userId: sofia.id, dishId: trattoria_dishes[1].id },

    // Bar - platos
    { rating: 5, comment: "Negroni perfectamente balanceado.", userId: andres.id, dishId: bar_dishes[0].id },
    { rating: 4, comment: "Tabla de quesos de excelente calidad.", userId: valentina.id, dishId: bar_dishes[1].id },
  ];

  await prisma.review.createMany({
    data: [...localReviews, ...dishReviews],
  });

  // Recalcular ratings de locales
  console.log("🔄 Recalculando ratings de locales...");
  for (const local of locales) {
    await recomputeLocalRating(local.id);
  }

  console.log("✅ Seed completado exitosamente!");
  console.log(`👥 Usuarios creados: 10`);
  console.log(`🏪 Locales creados: ${locales.length}`);
  console.log(`🍽️ Platos creados: ${dishes.length}`);
  console.log(`⭐ Reviews creadas: ${localReviews.length + dishReviews.length}`);
}

async function recomputeLocalRating(localId) {
  const aggregate = await prisma.review.aggregate({
    where: { localId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await prisma.local.update({
    where: { id: localId },
    data: {
      ratingAverage: aggregate._avg.rating || 0,
      ratingCount: aggregate._count.rating || 0,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
