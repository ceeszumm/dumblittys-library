import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!type || !["audio", "cover"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    const audioTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/x-m4a", "audio/m4a"];
    const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (type === "audio" && !audioTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid audio file type" }, { status: 400 });
    }

    if (type === "cover" && !imageTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid image file type" }, { status: 400 });
    }

    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 10);
    const extension = file.name.split(".").pop() || (type === "audio" ? "mp3" : "jpg");
    const filename = `${type}/${timestamp}_${randomStr}.${extension}`;

    const blob = await put(filename, file, { access: "public" });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ success: true, message: "Upload endpoint ready" });
}
