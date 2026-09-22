-- Required for gen_random_uuid(). Supabase projects normally have this enabled,
-- but keeping it here makes a fresh database migration self-contained.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public.projects (
	id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
	name TEXT NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 100),
	description TEXT NOT NULL CHECK (char_length(description) BETWEEN 10 AND 1000),
	github_url TEXT,
	live_url TEXT,
	main_image_url TEXT,
	tech_stack TEXT[] NOT NULL DEFAULT '{}'::TEXT[] CHECK (cardinality(tech_stack) > 0),
	category TEXT NOT NULL CHECK (char_length(btrim(category)) BETWEEN 1 AND 50),
	featured BOOLEAN NOT NULL DEFAULT FALSE,
	created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now())
);

-- Keep this migration compatible with a database where the table was created
-- before the complete schema was added.
ALTER TABLE public.projects
	ADD COLUMN IF NOT EXISTS github_url TEXT,
	ADD COLUMN IF NOT EXISTS live_url TEXT,
	ADD COLUMN IF NOT EXISTS main_image_url TEXT,
	ADD COLUMN IF NOT EXISTS tech_stack TEXT[] DEFAULT '{}'::TEXT[],
	ADD COLUMN IF NOT EXISTS category TEXT,
	ADD COLUMN IF NOT EXISTS featured BOOLEAN NOT NULL DEFAULT FALSE,
	ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now()),
	ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc', now());

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE UNIQUE INDEX IF NOT EXISTS projects_name_lower_idx
	ON public.projects (lower(name));

CREATE INDEX IF NOT EXISTS projects_created_at_idx
	ON public.projects (created_at DESC);

CREATE INDEX IF NOT EXISTS projects_featured_created_at_idx
	ON public.projects (featured, created_at DESC)
	WHERE featured = TRUE;

CREATE OR REPLACE FUNCTION public.set_projects_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
	NEW.updated_at = timezone('utc', now());
	RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS projects_set_updated_at ON public.projects;
CREATE TRIGGER projects_set_updated_at
	BEFORE UPDATE ON public.projects
	FOR EACH ROW
	EXECUTE FUNCTION public.set_projects_updated_at();

-- The application uses the service-role key. No public table policies are
-- created, so anon/authenticated clients cannot bypass the application API.

INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', TRUE)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM pg_policies
		WHERE schemaname = 'storage'
			AND tablename = 'objects'
			AND policyname = 'Public project image read access'
	) THEN
		CREATE POLICY "Public project image read access"
			ON storage.objects
			FOR SELECT
			TO public
			USING (bucket_id = 'project-images');
	END IF;
END
$$;