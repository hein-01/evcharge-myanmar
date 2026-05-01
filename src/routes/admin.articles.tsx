import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  useArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  type ArticleInput,
  type DbArticle,
} from "@/hooks/useArticles";
import { Pencil, Trash2, Plus } from "lucide-react";

const empty: ArticleInput = {
  title: "",
  excerpt: "",
  content: "",
  category: "Industry",
  author: "",
  date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
  read_min: 5,
  hue: 200,
};

export default function AdminArticlesPage() {
  const { articles, refetch } = useArticles();
  const [editing, setEditing] = useState<DbArticle | null>(null);
  const [form, setForm] = useState<ArticleInput>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startNew = () => {
    setEditing(null);
    setForm(empty);
    setError(null);
  };

  const startEdit = (a: DbArticle) => {
    setEditing(a);
    setForm({
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      category: a.category,
      author: a.author,
      date: a.date,
      read_min: a.read_min,
      hue: a.hue,
    });
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = editing ? await updateArticle(editing.id, form) : await createArticle(form);
    if (res.error) setError(res.error.message);
    else {
      await refetch();
      startNew();
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    const { error } = await deleteArticle(id);
    if (error) setError(error.message);
    else refetch();
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-bold">Manage articles</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Posts here appear in "In-depth reads from the EV community".
        </p>
      </div>

      <form onSubmit={submit} className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">
            {editing ? "Edit article" : "New article"}
          </h2>
          {editing && (
            <Button type="button" variant="ghost" size="sm" onClick={startNew}>
              Cancel edit
            </Button>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" required maxLength={200} value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea id="excerpt" required maxLength={500} rows={2} value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="content">Content (one paragraph per line)</Label>
            <Textarea id="content" rows={8} value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" required value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" required value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" required value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="read_min">Read (min)</Label>
              <Input id="read_min" type="number" min={1} max={120} required value={form.read_min}
                onChange={(e) => setForm({ ...form, read_min: Number(e.target.value) })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hue">Hue (0-360)</Label>
              <Input id="hue" type="number" min={0} max={360} required value={form.hue}
                onChange={(e) => setForm({ ...form, hue: Number(e.target.value) })} />
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving…" : editing ? "Save changes" : (<><Plus className="h-4 w-4" /> Publish</>)}
          </Button>
          <div
            className="h-10 w-32 rounded-md border border-border"
            style={{ background: `linear-gradient(135deg, oklch(0.72 0.16 ${form.hue}) 0%, oklch(0.55 0.20 ${form.hue + 30}) 100%)` }}
            aria-hidden
          />
        </div>
      </form>

      <div className="mt-12">
        <h2 className="font-display text-xl font-bold">All articles ({articles.length})</h2>
        <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
          {articles.length === 0 && (
            <div className="p-6 text-sm text-muted-foreground">No articles yet.</div>
          )}
          {articles.map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-4">
              <div
                className="h-12 w-16 shrink-0 rounded-md"
                style={{ background: `linear-gradient(135deg, oklch(0.72 0.16 ${a.hue}) 0%, oklch(0.55 0.20 ${a.hue + 30}) 100%)` }}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{a.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {a.category} · {a.author} · {a.date}
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => startEdit(a)} aria-label="Edit">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => remove(a.id)} aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
