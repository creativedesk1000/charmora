import { PrismaClient } from "@prisma/client";
const prismaSeed = new PrismaClient();

async function main() {
    // 1. Create User
    const admin = await prismaSeed.user.upsert({
        where: { email: "admin@charmora.com" },
        update: {},
        create: {
            email: "admin@charmora.com",
            name: "Founder Cinderella",
            password: "admin_secure_pass", // In real apps, use bcrypt to hash this
            role: "ADMIN",
        },
    });

    // 2. Create Categories & Subcategories
    const necklaceCat = await prismaSeed.category.upsert({
        where: { slug: "necklaces" },
        update: {},
        create: { name: "Necklaces", slug: "necklaces" }
    });

    const braceletCat = await prismaSeed.category.upsert({
        where: { slug: "bracelets" },
        update: {},
        create: { name: "Bracelets", slug: "bracelets" }
    });

    const earringCat = await prismaSeed.category.upsert({
        where: { slug: "earrings" },
        update: {},
        create: { name: "Earrings", slug: "earrings" }
    });

    const sub1 = await prismaSeed.subCategory.upsert({
        where: { slug: "pearl-necklaces" },
        update: {},
        create: { name: "Pearl Necklaces", slug: "pearl-necklaces", categoryId: necklaceCat.id }
    });

    // 3. Clear Existing Data (Optional but helpful for clean seed)
    await prismaSeed.orderItem.deleteMany();
    await prismaSeed.product.deleteMany();

    // 4. Create Products
    const products = [
        {
            title: "Moonlight Pearl Necklace",
            slug: "moonlight-pearl-necklace",
            description: "A cascade of iridescent freshwater pearls suspended from a delicate 18k gold chain.",
            price: 45000,
            stock: 10,
            categoryId: necklaceCat.id,
            subCategoryId: sub1.id,
            image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000",
            isBestseller: true,
            isNewArrival: true,
        },
        {
            title: "Celestial Gold Bracelet",
            slug: "celestial-gold-bracelet",
            description: "Intricately woven gold fibers create a light-catching lattice work.",
            price: 32000,
            stock: 15,
            categoryId: braceletCat.id,
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000",
            isBestseller: true,
        },
        {
            title: "Emerald Teardrop Earrings",
            slug: "emerald-teardrop-earrings",
            description: "Rare forest-green stones cut in a classic pear shape.",
            price: 28000,
            stock: 5,
            categoryId: earringCat.id,
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000",
            isNewArrival: true,
        }
    ];

    for (const p of products) {
        await prismaSeed.product.create({ data: p });
    }

    console.log("Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prismaSeed.$disconnect();
    });
