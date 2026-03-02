import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// POST - Admin logout
export async function POST() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("admin-session");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json(
      { success: false, error: "Logout failed" },
      { status: 500 }
    );
  }
}
