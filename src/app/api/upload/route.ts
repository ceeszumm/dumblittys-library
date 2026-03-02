import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

// Ensure upload directories exist
async function ensureUploadDirs() {
  const audioDir = path.join(process.cwd(), "public", "uploads", "audio");
  const coversDir = path.join(process.cwd(), "public", "uploads", "covers");

  if (!existsSync(audioDir)) {
    await mkdir(audioDir, { recursive: true });
  }
  if (!existsSync(coversDir)) {
    await mkdir(coversDir, { recursive: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureUploadDirs();

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
    const audioTypes = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/ogg", "audio/x-m4a"];
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
    const filename = `${timestamp}_${randomStr}.${extension}`;

    // Determine upload path
    const uploadDir = type === "audio" ? "audio" : "covers";
    const filepath = path.join(process.cwd(), "public", "uploads", uploadDir, filename);

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Return public URL
    const publicUrl = `/uploads/${uploadDir}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
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

// GET - List uploaded files
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";

    const audioDir = path.join(process.cwd(), "public", "uploads", "audio");
    const coversDir = path.join(process.cwd(), "public", "uploads", "covers");

    // For now, just return success - could add file listing later
    return NextResponse.json({
      success: true,
      message: "Upload endpoint ready",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to list files" },
      { status: 500 }
    );
  }
}
