import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req) {
    try {
        const { user_id, category, description, longitude, latitude, src } = await req.json()
        const response = await prisma.issues.create({
            data: {
                longitude: longitude,
                latitude: latitude,
                user_id: parseInt(user_id),
                category: category,
                description: description,
                src: src
            }
        })
        return NextResponse.json("yes", { status: 201 })
    } catch (err) {
        console.log("Error in backend of newissue", err);
        return NextResponse.json("no", { status: 400 })
    }
}