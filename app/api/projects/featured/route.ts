import { NextResponse } from "next/server";
import { getDBConnection } from "@/db/db";

export async function GET() {
  try {
    const supabase = await getDBConnection();
    const { data, error } = await supabase
      .from("projects")
      .select(
        "id, name, description, github_url, live_url, main_image_url, tech_stack, category, featured, created_at, updated_at"
      )
      .eq("featured", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json(data ?? [], { status: 200 });
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured projects" },
      { status: 500 }
    );
  }
}