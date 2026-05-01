-- Articles table
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'General',
  author TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  read_min INTEGER NOT NULL DEFAULT 5,
  hue INTEGER NOT NULL DEFAULT 200,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Admin allowlist table (emails)
CREATE TABLE public.admin_emails (
  email TEXT NOT NULL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_emails ENABLE ROW LEVEL SECURITY;

-- Helper: is current user an admin (by email)?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_emails ae
    JOIN auth.users u ON lower(u.email) = lower(ae.email)
    WHERE u.id = auth.uid()
  );
$$;

-- Articles policies: public read, admin write
CREATE POLICY "Articles are viewable by everyone"
ON public.articles FOR SELECT
USING (true);

CREATE POLICY "Admins can insert articles"
ON public.articles FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update articles"
ON public.articles FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete articles"
ON public.articles FOR DELETE
TO authenticated
USING (public.is_admin());

-- admin_emails: only admins can read/manage (no public exposure of allowlist)
CREATE POLICY "Admins can view admin_emails"
ON public.admin_emails FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can manage admin_emails"
ON public.admin_emails FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON public.articles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_articles_created_at ON public.articles(created_at DESC);