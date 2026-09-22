import { NextRequest, NextResponse } from "next/server";
import {
  ALLOWED_PROJECT_IMAGE_TYPES,
  getStorageBucket,
  getSupabaseServerClient,
  MAX_PROJECT_IMAGE_SIZE,
} from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "An image file is required" }, { status: 400 });
    }
    if (!ALLOWED_PROJECT_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_PROJECT_IMAGE_TYPES)[number])) {
      return NextResponse.json(
        { error: "Only JPG, PNG, and WebP images are supported" },
        { status: 400 }
      );
    }
    if (file.size > MAX_PROJECT_IMAGE_SIZE) {
      return NextResponse.json({ error: "Image must be 4MB or smaller" }, { status: 400 });
    }

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `projects/${crypto.randomUUID()}.${extension}`;
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.storage
      .from(getStorageBucket())
      .upload(path, file, { contentType: file.type, upsert: false });

    if (error) throw error;
    const { data } = supabase.storage.from(getStorageBucket()).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, path }, { status: 201 });
  } catch (error) {
    console.error("Error uploading project image:", error);
    return NextResponse.json({ error: "Failed to upload project image" }, { status: 500 });
  }
}