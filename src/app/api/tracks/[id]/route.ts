import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET - Fetch a single track
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const track = await db.track.findUnique({
      where: { id },
    });

    if (!track) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    return NextResponse.json({ track });
  } catch (error) {
    console.error("Error fetching track:", error);
    return NextResponse.json({ error: "Failed to fetch track" }, { status: 500 });
  }
}

// PUT - Update a track
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const track = await db.track.update({
      where: { id },
      data: {
        title: body.title,
        artist: body.artist,
        type: body.type,
        year: body.year,
        genre: body.genre,
        bpm: body.bpm,
        duration: body.duration,
        audioFilePath: body.audioFilePath,
        coverImagePath: body.coverImagePath,
        lyrics: body.lyrics,
        originalArtist: body.originalArtist,
        licenseInfo: body.licenseInfo,
        equipmentUsed: body.equipmentUsed,
        recordingStudio: body.recordingStudio,
        description: body.description,
        isPublished: body.isPublished,
      },
    });

    return NextResponse.json({ track });
  } catch (error) {
    console.error("Error updating track:", error);
    return NextResponse.json({ error: "Failed to update track" }, { status: 500 });
  }
}

// DELETE - Delete a track
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await db.track.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting track:", error);
    return NextResponse.json({ error: "Failed to delete track" }, { status: 500 });
  }
}
