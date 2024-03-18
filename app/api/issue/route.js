import prisma from "@/app/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {

        const { issue_id } = await req.json()

        const response = await prisma.issues.findUnique({
            where: {
                id: parseInt(issue_id)
            },
            select: {
                longitude: true,
                latitude: true,
                category: true,
                description: true,
                src: true,
                users: {
                    select: {
                        email: true,
                        user_details: {
                            select: {
                                firstname: true,
                                lastname: true
                            }
                        }
                    }
                }
            }
        })

        return NextResponse.json(response, { status: 201 })

    } catch (err) {
        console.log("Error getting issue details in backend", err);
        return NextResponse.json("NO", { status: 400 })
    }
}   