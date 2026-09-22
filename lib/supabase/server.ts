import { createClient } from "@supabase/supabase-js";

export const MAX_PROJECT_IMAGE_SIZE = 4 * 1024 * 1024;
export const ALLOWED_PROJECT_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

export function getStorageBucket() {
  return process.env.SUPABASE_STORAGE_BUCKET || "project-images";
}

export async function getSupabaseServerClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required"
    );
  }

  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export function getStoragePathFromUrl(imageUrl: string | null | undefined) {
  if (!imageUrl) return null;

  try {
    const url = new URL(imageUrl);
    const marker = "/storage/v1/object/public/";
    const markerIndex = url.pathname.indexOf(marker);
    if (markerIndex === -1) return null;

    const objectPath = url.pathname.slice(markerIndex + marker.length);
    const bucket = getStorageBucket();
    if (!objectPath.startsWith(`${bucket}/`)) return null;

    return decodeURIComponent(objectPath.slice(bucket.length + 1));
  } catch {
    return null;
  }
}

export async function deleteProjectImage(imageUrl: string | null | undefined) {
  const path = getStoragePathFromUrl(imageUrl);
  if (!path) return;

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.storage.from(getStorageBucket()).remove([path]);
  if (error) throw error;
}