import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getDBConnection } from "@/db/db";

/* SCHEMAS */

const createProjectSchema = z.object({
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
});


/* GET (all projects) */

export async function GET(request: NextRequest) {
  try {
    const sql = await getDBConnection();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;

    // Use a conditional approach directly within the sql template literal
    const result = await sql`
      SELECT
        id,
        name,
        description,
        github_url,
        live_url,
        main_image_url,
        tech_stack,
        category,
        created_at,
        updated_at
      FROM projects
      ${category ? sql`WHERE LOWER(category) = LOWER(${category})` : sql``}
      ORDER BY created_at DESC
      ${limit ? sql`LIMIT ${limit}` : sql``}
    `;

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
    const sql = await getDBConnection();
    const body = await request.json();

    const validatedData = createProjectSchema.parse(body);

    // Uniqueness check
    const existing = await sql`
      SELECT id FROM projects WHERE LOWER(name) = LOWER(${validatedData.name})
    `;
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "A project with this name already exists" },
        { status: 409 }
      );
    }

    // Insert
    const result = await sql`
      INSERT INTO projects (
        name,
        description,
        github_url,
        live_url,
        main_image_url,
        tech_stack,
        category,
        created_at,
        updated_at
      ) VALUES (
        ${validatedData.name},
        ${validatedData.description},
        ${validatedData.github_url || null},
        ${validatedData.live_url || null},
        ${validatedData.main_image_url || null},
        ${JSON.stringify(validatedData.tech_stack)},
        ${validatedData.category},
        NOW(),
        NOW()
      )
      RETURNING *
    `;

    console.log("DataBase Insert Result:", result);
    const newProject = result[0];

    return NextResponse.json(newProject, { status: 201 });
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

