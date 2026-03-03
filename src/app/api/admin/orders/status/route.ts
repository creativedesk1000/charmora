import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const { id, status } = await req.json();

        const order = await prisma.order.update({
            where: { id },
            data: { status }
        });

        return NextResponse.json(order);
    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 });
    }
}
