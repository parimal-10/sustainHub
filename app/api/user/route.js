import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const { user_id } = await req.json();
        const response = await prisma.user_details.findUnique({
            select: {
                firstname: true, 
                lastname: true
            },
            where: {
                id: parseInt(user_id)
            }
        })
        return NextResponse.json(response, {status: 201})
    } catch (err) {
        console.log("Error fetching user details from the database", err);
        return NextResponse.json("no", {status: 400})
    }
}