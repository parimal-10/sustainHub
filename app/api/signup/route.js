import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const {firstName, lastName, email, password} = await req.json();
        console.log(firstName, lastName, email, password); 
        return NextResponse.json("yes", {status: 201});
    } catch (err) {
        console.log("Signup error", err);
        return NextResponse.json("no", {status: 500});
    } finally {
        console.log("Here");
    }
}