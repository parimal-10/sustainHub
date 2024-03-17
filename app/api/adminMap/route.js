import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server"

export async function GET (req) {
    try {
        const response = await prisma.issues.findMany({
            select: {
                id: true,
                longitude: true,
                latitude: true,
            }
        })
        return NextResponse.json(response)
    } catch (err) {
        console.log("Error getting admin map data", err);
        return NextResponse.json("no", {status: 400})
    }
}