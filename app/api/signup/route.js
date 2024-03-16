import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import prisma from "@/app/lib/prisma"

export async function POST (req) {
    try {
        const {firstName, lastName, email, password} = await req.json();

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                email: email,
                password: hashedPassword,
                role: "USER"
            }
        })

        await prisma.user_details.create({
            data: {
                id: newUser.id,
                firstname: firstName,
                lastname: lastName
            }
        })

        return NextResponse.json("yes", {status: 201});
    } catch (err) {
        console.log("Signup error", err);
        return NextResponse.json("no", {status: 500});
    }
}