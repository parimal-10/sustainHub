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

export async function PUT(req) {
    try {

        const {issue_id} = await req.json();  

        // Retrieve the user_id associated with the issue
        const issue = await prisma.issues.findUnique({
            where: {
                id: parseInt(issue_id)
            },
            select: {
                user_id: true
            }
        });

        if (!issue) {
            throw new Error("Issue not found");
        }

        // Update rewards column for the user_details associated with the user_id
        const updatedUserDetails = await prisma.user_details.update({
            where: {
                id: issue.user_id
            },
            data: {
                rewards: {
                    increment: 5
                }
            }
        });

        // Delete the issue
        const response = await prisma.issues.delete({
            where: {
                id: parseInt(issue_id)
            }
        });

        return NextResponse.json(response, { status: 201 });

    } catch (err) {
        console.log("Error deleting issue in backend", err);
        return NextResponse.json("No", { status: 400 })
    }
}
