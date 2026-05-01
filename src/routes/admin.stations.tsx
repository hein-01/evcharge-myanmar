import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useStations,
  createStation,
  updateStation,
  deleteStation,
  parseLatLngFromGoogleMapsUrl,
  type StationInput,
  type DbStation,
} from "@/hooks/useStations";
import { Pencil, Trash2, Plus, MapPin, Zap, ExternalLink } from "lucide-react";

const CONNECTOR_OPTIONS = ["CCS2", "Type 2", "CHAdeMO", "GB/T"] as const;

const empty: StationInput = {
  name: "",
  city: "",
  operator: "",
  connectors: [],
  max_kw: 60,
  price_per_kwh: 350,
  available: 0,
  total: 1,
  hours: "24/7",
  google_maps_url: "",
  lat: null,
  lng: null,
};

export default function AdminStationsPage() {
  const { stations, loading, refetch } = useStations();
  const [editing, setEditing] = useState<DbStation | null>(null);
  const [form, setForm] = useState<StationInput>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsed = parseLatLngFromGoogleMapsUrl(form.google_maps_url);

  const startNew = () => {
    setEditing(null);
    setForm(empty);
    setError(null);
  };

  const startEdit = (s: DbStation) => {
    setEditing(s);
    setForm({
      name: s.name,
      city: s.city,
      operator: s.operator,
      connectors: s.connectors,
      max_kw: s.max_kw,
      price_per_kwh: s.price_per_kwh,
      available: s.available,
      total: s.total,
      hours: s.hours,
      google_maps_url: s.google_maps_url,
      lat: s.lat,
      lng: s.lng,
    });
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleConnector = (c: string) => {
    setForm((f) => ({
      ...f,
      connectors: f.connectors.includes(c)
        ? f.connectors.filter((x) => x !== c)
        : [...f.connectors, c],
    }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const coords = parseLatLngFromGoogleMapsUrl(form.google_maps_url);
    const payload: StationInput = {
      ...form,
      lat: coords?.lat ?? form.lat ?? null,
      lng: coords?.lng ?? form.lng ?? null,
    };

    const res = editing ? await updateStation(editing.id, payload) : await createStation(payload);
    if (res.error) setError(res.error.message);
    else {
      await refetch();
      startNew();
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this station?")) return;
    const { error } = await deleteStation(id);
    if (error) setError(error.message);
    else refetch();
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-bold">Charging stations</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage stations shown on the public Stations page and map.
        </p>
      </div>

      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">
            {editing ? "Edit station" : "New station"}
          </h2>
          {editing && (
            <Button type="button" variant="ghost" size="sm" onClick={startNew}>
              Cancel edit
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Station name</Label>
            <Input id="name" required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Junction City Mall" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" required value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Yangon" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="operator">Operator</Label>
            <Input id="operator" value={form.operator}
              onChange={(e) => setForm({ ...form, operator: e.target.value })}
              placeholder="EVOLT" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Hours</Label>
            <Input id="hours" value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
              placeholder="24/7 or 11:00 AM – 11:00 PM" />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>Connectors (plug types this station supports)</Label>
            <div className="flex flex-wrap gap-2">
              {CONNECTOR_OPTIONS.map((c) => {
                const on = form.connectors.includes(c);
                return (
                  <button
                    type="button"
                    key={c}
                    onClick={() => toggleConnector(c)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      on
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_kw">Max speed (kW)</Label>
            <Input id="max_kw" type="number" min={0} required value={form.max_kw}
              onChange={(e) => setForm({ ...form, max_kw: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price_per_kwh">Price (MMK / kWh)</Label>
            <Input id="price_per_kwh" type="number" min={0} required value={form.price_per_kwh}
              onChange={(e) => setForm({ ...form, price_per_kwh: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="available">Available chargers</Label>
            <Input id="available" type="number" min={0} required value={form.available}
              onChange={(e) => setForm({ ...form, available: Number(e.target.value) })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total">Total chargers</Label>
            <Input id="total" type="number" min={1} required value={form.total}
              onChange={(e) => setForm({ ...form, total: Number(e.target.value) })} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="google_maps_url">Google Maps link</Label>
            <Input id="google_maps_url" type="url" value={form.google_maps_url}
              onChange={(e) => setForm({ ...form, google_maps_url: e.target.value })}
              placeholder="https://www.google.com/maps/place/.../@16.78,96.15,17z/..." />
            <p className="text-xs text-muted-foreground">
              Paste a Google Maps link. We'll auto-extract coordinates for the map pin.
              {parsed ? (
                <span className="ml-1 text-eco">
                  ✓ Parsed: {parsed.lat.toFixed(5)}, {parsed.lng.toFixed(5)}
                </span>
              ) : form.google_maps_url ? (
                <span className="ml-1 text-ruby">Couldn't extract lat/lng — pin won't show on map.</span>
              ) : null}
            </p>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : editing ? "Save changes" : (<><Plus className="h-4 w-4" /> Add station</>)}
          </Button>
        </div>
      </form>

      <div className="mt-12">
        <h2 className="font-display text-xl font-bold">All stations ({stations.length})</h2>
        <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
          {loading && <div className="p-6 text-sm text-muted-foreground">Loading…</div>}
          {!loading && stations.length === 0 && (
            <div className="p-6 text-sm text-muted-foreground">No stations yet. Add one above.</div>
          )}
          {stations.map((s) => (
            <div key={s.id} className="flex items-center gap-4 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-secondary">
                <MapPin className="h-5 w-5 text-electric" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {s.city} · {s.operator || "—"} · <Zap className="inline h-3 w-3" /> {s.max_kw} kW · {s.available}/{s.total} free
                </p>
                {s.connectors.length > 0 && (
                  <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
                    {s.connectors.join(" · ")}
                  </p>
                )}
              </div>
              {s.google_maps_url && (
                <a href={s.google_maps_url} target="_blank" rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground" aria-label="Open in Google Maps">
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Button variant="ghost" size="icon" onClick={() => startEdit(s)} aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(s.id)} aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
