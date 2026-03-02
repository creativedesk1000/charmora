const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    // Create Categories
    const categories = [
        { name: "Necklaces", slug: "necklaces" },
        { name: "Bracelets", slug: "bracelets" },
        { name: "Artisan Pieces", slug: "artisan-pieces" },
        { name: "Earrings", slug: "earrings" },
    ];

    for (const cat of categories) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        });
    }

    // Create Admin User
    await prisma.user.upsert({
        where: { email: "admin@charmora.com" },
        update: {},
        create: {
            email: "admin@charmora.com",
            name: "Admin Master",
            role: "ADMIN",
        },
    });

    console.log("Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
