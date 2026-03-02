import prisma from "@/lib/db";
import UsersClient from "@/app/admin/users/UsersClient";

export default async function UsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <UsersClient
            initialUsers={JSON.parse(JSON.stringify(users))}
        />
    );
}
