import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {

        const { user_id } = await req.json();
        
        const response = await prisma.users.findUnique({
            where: {
                id: parseInt(user_id)
            },
            select: {
                email: true,
                user_details: {
                    select: {
                        firstname: true,
                        lastname: true,
                        address: true,
                        phone: true
                    }
                }
            }
        })
        return NextResponse.json(response, {status: 201})

    } catch (err) {
        console.log("Error in profile backend", err);
        return NextResponse.json("NO", {status: 400})
    }  
}