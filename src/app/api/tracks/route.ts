import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Fetch all tracks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search");
    const type = searchParams.get("type");

    const where: {
      isPublished?: boolean;
      OR?: Array<{
        title?: { contains: string; mode: "insensitive" };
        artist?: { contains: string; mode: "insensitive" };
        genre?: { contains: string; mode: "insensitive" };
      }>;
      type?: string;
    } = { isPublished: true };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { artist: { contains: search, mode: "insensitive" } },
        { genre: { contains: search, mode: "insensitive" } },
      ];
    }

    if (type && (type === "original" || type === "cover")) {
      where.type = type;
    }

    const tracks = await db.track.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return NextResponse.json({ error: "Failed to fetch tracks" }, { status: 500 });
  }
}

// POST - Create a new track (admin only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const track = await db.track.create({
      data: {
        title: body.title,
        artist: body.artist,
        type: body.type || "original",
        year: body.year || new Date().getFullYear(),
        genre: body.genre || null,
        bpm: body.bpm || null,
        duration: body.duration || 180,
        audioFilePath: body.audioFilePath,
        coverImagePath: body.coverImagePath || null,
        lyrics: body.lyrics || null,
        originalArtist: body.originalArtist || null,
        licenseInfo: body.licenseInfo || null,
        equipmentUsed: body.equipmentUsed || null,
        recordingStudio: body.recordingStudio || null,
        description: body.description || null,
        isPublished: body.isPublished ?? true,
      },
    });

    return NextResponse.json({ track });
  } catch (error) {
    console.error("Error creating track:", error);
    return NextResponse.json({ error: "Failed to create track" }, { status: 500 });
  }
}
