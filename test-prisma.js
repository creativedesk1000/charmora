const { PrismaClient } = require('@prisma/client');
const prismaClient = new PrismaClient();

async function main() {
    try {
        console.log("Attempting to connect to database...");
        const userCount = await prismaClient.user.count();
        console.log("SUCCESS! User count:", userCount);
    } catch (err) {
        console.error("PRISMA ERROR:", err.message);
        if (err.code) console.log("ERROR CODE:", err.code);
    } finally {
        await prismaClient.$disconnect();
    }
}

main();
