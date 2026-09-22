import { NextRequest, NextResponse } from "next/server";
import { deleteProjectImage } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    if (typeof url !== "string") {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    await deleteProjectImage(url);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting project image:", error);
    return NextResponse.json({ error: "Failed to delete project image" }, { status: 500 });
  }
}