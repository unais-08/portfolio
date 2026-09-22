import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/db/db";

/* SCHEMAS */

const projectSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(10).max(1000),
  github_url: z.string().url().nullable().optional(),
  live_url: z.string().url().nullable().optional(),
  main_image_url: z.string().url().nullable().optional(),
  tech_stack: z.preprocess((val) => {
    if (typeof val === "string") {
      // Convert "React,NextJs" to ["React", "NextJs"]
      return val.split(",").map((s) => s.trim());
    }
    return val;
  }, z.array(z.string())),
  category: z.string().min(1).max(50),
  featured: z.boolean().default(false),
});


/* GET (all projects) */

export async function GET(request: NextRequest) {
  try {
    const supabase = await getDBConnection();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;

    let query = supabase
      .from("projects")
      .select(
        "id, name, description, github_url, live_url, main_image_url, tech_stack, category, featured, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (category) query = query.ilike("category", category);
    if (limit) query = query.limit(limit);

    const { data: result, error } = await query;
    if (error) throw error;

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

/* POST (create project) */

export async function POST(request: NextRequest) {
  try {
    const supabase = await getDBConnection();
    const body = await request.json();

    const validatedData = projectSchema.parse(body);

    // Uniqueness check
    const { data: existing, error: existingError } = await supabase
      .from("projects")
      .select("id")
      .ilike("name", validatedData.name);
    if (existingError) throw existingError;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "A project with this name already exists" },
        { status: 409 }
      );
    }

    const { data: result, error } = await supabase
      .from("projects")
      .insert({
        name: validatedData.name,
        description: validatedData.description,
        github_url: validatedData.github_url || null,
        live_url: validatedData.live_url || null,
        main_image_url: validatedData.main_image_url || null,
        tech_stack: validatedData.tech_stack,
        category: validatedData.category,
        featured: validatedData.featured,
      })
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

