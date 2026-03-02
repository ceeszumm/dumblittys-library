import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "audio" or "cover"

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    if (!type || !["audio", "cover"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Must be 'audio' or 'cover'" },
        { status: 400 }
      );
    }

    // Validate file types
    const audioTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/x-m4a", "audio/m4a"];
    const imageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (type === "audio" && !audioTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid audio file type. Supported: MP3, WAV, OGG, M4A" },
        { status: 400 }
      );
    }

    if (type === "cover" && !imageTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid image file type. Supported: JPEG, PNG, GIF, WEBP" },
        { status: 400 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split(".").pop() || (type === "audio" ? "mp3" : "jpg");
    const filename = `${type}/${timestamp}_${randomStr}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      
      addRandomSuffix: false,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// GET - Check upload endpoint
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: "Upload endpoint ready (Vercel Blob)",
  });
}
