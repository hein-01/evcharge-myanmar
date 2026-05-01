import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type DbStation = {
  id: string;
  name: string;
  city: string;
  operator: string;
  connectors: string[];
  max_kw: number;
  price_per_kwh: number;
  available: number;
  total: number;
  hours: string;
  google_maps_url: string;
  lat: number | null;
  lng: number | null;
  created_at: string;
  updated_at: string;
};

export type StationInput = Omit<DbStation, "id" | "created_at" | "updated_at">;

/** Try to extract lat/lng from a Google Maps URL. Supports common formats:
 *  - .../@16.78,96.15,17z
 *  - .../!3d16.78!4d96.15
 *  - ?q=16.78,96.15
 *  Returns null if it can't be parsed.
 */
export function parseLatLngFromGoogleMapsUrl(url: string): { lat: number; lng: number } | null {
  if (!url) return null;
  const at = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (at) return { lat: parseFloat(at[1]), lng: parseFloat(at[2]) };
  const bang = url.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (bang) return { lat: parseFloat(bang[1]), lng: parseFloat(bang[2]) };
  const q = url.match(/[?&]q=(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  if (q) return { lat: parseFloat(q[1]), lng: parseFloat(q[2]) };
  return null;
}

export function useStations() {
  const [stations, setStations] = useState<DbStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("stations")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setStations((data ?? []) as DbStation[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { stations, loading, error, refetch: fetchAll };
}

export async function createStation(input: StationInput) {
  return supabase.from("stations").insert(input).select().single();
}

export async function updateStation(id: string, input: Partial<StationInput>) {
  return supabase.from("stations").update(input).eq("id", id).select().single();
}

export async function deleteStation(id: string) {
  return supabase.from("stations").delete().eq("id", id);
}
