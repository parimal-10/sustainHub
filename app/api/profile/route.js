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
                        phone: true,
                        rewards: true
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

export async function PATCH (req) {
    try {

        const {user_id, editedDetails} = await req.json();

        const response = await prisma.user_details.update({
            where: {
                id: parseInt(user_id)
            },
            data: {
                address: editedDetails.address,
                phone: parseInt(editedDetails.phone)
            }
        })
        return NextResponse.json(response, {status: 201})

    } catch (err) {
        console.log("Error updating user details", err);
        return NextResponse.json("No", {status: 400})
    }
}