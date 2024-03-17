import { UploadImage } from "@/app/lib/uploadImage";
import { NextResponse } from "next/server";

export async function POST (req) {
    const formData = await req.formData();
    const image = formData.get("image")

    const data = await UploadImage(image, "images")

    return NextResponse.json(data, {status: 200})
}