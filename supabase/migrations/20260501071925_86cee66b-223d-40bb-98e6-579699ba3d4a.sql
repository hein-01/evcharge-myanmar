CREATE TABLE public.stations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT '',
  operator TEXT NOT NULL DEFAULT '',
  connectors TEXT[] NOT NULL DEFAULT '{}',
  max_kw INTEGER NOT NULL DEFAULT 0,
  price_per_kwh INTEGER NOT NULL DEFAULT 0,
  available INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  hours TEXT NOT NULL DEFAULT '24/7',
  google_maps_url TEXT NOT NULL DEFAULT '',
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.stations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stations are viewable by everyone"
  ON public.stations FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert stations"
  ON public.stations FOR INSERT TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update stations"
  ON public.stations FOR UPDATE TO authenticated
  USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY "Admins can delete stations"
  ON public.stations FOR DELETE TO authenticated
  USING (is_admin());

CREATE TRIGGER update_stations_updated_at
  BEFORE UPDATE ON public.stations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();