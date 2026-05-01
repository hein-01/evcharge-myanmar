import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type DbArticle = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  read_min: number;
  hue: number;
  created_at: string;
  updated_at: string;
};

export type ArticleInput = Omit<DbArticle, "id" | "created_at" | "updated_at">;

export function useArticles() {
  const [articles, setArticles] = useState<DbArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setArticles((data ?? []) as DbArticle[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { articles, loading, error, refetch: fetchAll };
}

export async function createArticle(input: ArticleInput) {
  return supabase.from("articles").insert(input).select().single();
}

export async function updateArticle(id: string, input: Partial<ArticleInput>) {
  return supabase.from("articles").update(input).eq("id", id).select().single();
}

export async function deleteArticle(id: string) {
  return supabase.from("articles").delete().eq("id", id);
}

export async function fetchArticle(id: string) {
  return supabase.from("articles").select("*").eq("id", id).maybeSingle();
}