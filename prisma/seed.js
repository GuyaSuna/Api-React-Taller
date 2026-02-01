const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const [ana, bruno] = await Promise.all([
    prisma.user.create({
      data: { username: "ana", name: "Ana Pereira", passwordHash },
    }),
    prisma.user.create({
      data: { username: "bruno", name: "Bruno Silva", passwordHash },
    }),
  ]);

  const local1 = await prisma.local.create({
    data: {
      name: "Cafe Central",
      type: "CAFETERIA",
      priceRange: "ECONOMICO",
      description: "Cafeteria de barrio con opciones dulces y saladas.",
      address: "Av. 18 de Julio 1234",
      city: "Montevideo",
      zone: "Centro",
      hours: "08:00 - 20:00",
      photos: ["https://example.com/cafe.jpg"],
      creatorId: ana.id,
    },
  });

  const local2 = await prisma.local.create({
    data: {
      name: "La Parrilla del Puerto",
      type: "RESTAURANTE",
      priceRange: "ALTO",
      description: "Especialidad en carnes y maridajes.",
      address: "Rambla 456",
      city: "Montevideo",
      zone: "Ciudad Vieja",
      hours: "12:00 - 23:00",
      photos: ["https://example.com/parrilla.jpg"],
      creatorId: bruno.id,
    },
  });

  const dish1 = await prisma.dish.create({
    data: {
      name: "Tostado especial",
      category: "ENTRADA",
      description: "Pan ciabatta, jamon, queso y salsa de la casa.",
      price: 220,
      city: "Montevideo",
      zone: "Centro",
      localId: local1.id,
      creatorId: ana.id,
    },
  });

  const dish2 = await prisma.dish.create({
    data: {
      name: "Bife ancho",
      category: "PRINCIPAL",
      description: "Corte premium con guarnicion.",
      price: 890,
      city: "Montevideo",
      zone: "Ciudad Vieja",
      localId: local2.id,
      creatorId: bruno.id,
    },
  });

  await prisma.review.createMany({
    data: [
      {
        rating: 5,
        comment: "Excelente ambiente y cafe.",
        userId: bruno.id,
        localId: local1.id,
      },
      {
        rating: 4,
        comment: "Muy buena carne, algo caro.",
        userId: ana.id,
        localId: local2.id,
      },
      {
        rating: 5,
        comment: "Tostado impecable.",
        userId: bruno.id,
        dishId: dish1.id,
      },
      {
        rating: 4,
        comment: "Buen punto de coccion.",
        userId: ana.id,
        dishId: dish2.id,
      },
    ],
  });

  await recomputeLocalRating(local1.id);
  await recomputeLocalRating(local2.id);
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
