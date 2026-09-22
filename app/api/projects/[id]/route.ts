import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDBConnection } from "@/db/db";
import { deleteProjectImage } from "@/lib/supabase/server";

const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().min(10).max(1000).optional(),
  github_url: z.string().url().nullable().optional(),
  live_url: z.string().url().nullable().optional(),
  main_image_url: z.string().url().nullable().optional(),
  tech_stack: z.array(z.string()).optional(),
  category: z.string().min(1).max(50).optional(),
  featured: z.boolean().optional(),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const updates = updateProjectSchema.parse(await request.json());
    const supabase = await getDBConnection();

    const { data: current, error: currentError } = await supabase
      .from("projects")
      .select("main_image_url")
      .eq("id", id)
      .single();
    if (currentError) throw currentError;

    const { data, error } = await supabase
      .from("projects")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;

    if (
      updates.main_image_url !== undefined &&
      updates.main_image_url !== current.main_image_url
    ) {
      await deleteProjectImage(current.main_image_url);
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;
    const supabase = await getDBConnection();
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("main_image_url")
      .eq("id", id)
      .single();
    if (projectError) throw projectError;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) throw error;
    await deleteProjectImage(project.main_image_url);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}