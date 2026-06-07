import { blogPosts, type BlogPost } from "@/data/blog";
import { supabase, supabaseClinicId, supabaseUrl } from "@/lib/supabaseClient";

const EXPECTED_SUPABASE_URL = "https://oectaalotsfsscxkiqdv.supabase.co";

type BlogPostRow = Record<string, unknown>;

function stringField(row: BlogPostRow, keys: string[], fallback = "") {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return fallback;
}

function dateField(row: BlogPostRow) {
  return stringField(row, ["published_at", "publishedAt", "date", "created_at"], new Date().toISOString());
}

function bodyField(row: BlogPostRow) {
  const body = row.body;
  if (Array.isArray(body)) {
    return body.filter((paragraph): paragraph is string => typeof paragraph === "string" && Boolean(paragraph.trim()));
  }

  const content = stringField(row, ["content", "body", "body_md", "markdown", "html"], "");
  if (!content) {
    return [stringField(row, ["excerpt", "summary", "description"], "")].filter(Boolean);
  }

  return content
    .replace(/<[^>]+>/g, "\n")
    .split(/\n{2,}|\r\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function readingTime(row: BlogPostRow, body: string[]) {
  const configured = stringField(row, ["reading_time", "readingTime", "read_time"], "");
  if (configured) return configured;

  const words = body.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min`;
}

function normalizePost(row: BlogPostRow): BlogPost | null {
  const slug = stringField(row, ["slug"], "");
  const title = stringField(row, ["title"], "");

  if (!slug || !title) {
    return null;
  }

  const body = bodyField(row);

  return {
    title,
    slug,
    category: stringField(row, ["category", "topic", "tag"], "Fisioterapia avanzada"),
    excerpt: stringField(row, ["excerpt", "summary", "description"], ""),
    author: stringField(row, ["author", "author_name"], "Fisiovanguardia"),
    readingTime: readingTime(row, body),
    date: dateField(row),
    thumbnail: stringField(row, ["thumbnail", "thumbnail_url", "cover_image", "cover_image_url", "image_url"], "/blog/cervical.jpg"),
    body
  };
}

function logPublicBlogConfig() {
  console.info("[Public Blog] Supabase URL:", supabaseUrl ?? "not configured");

  if (supabaseUrl && supabaseUrl !== EXPECTED_SUPABASE_URL) {
    console.warn("[Public Blog] Supabase URL does not match CRM project:", supabaseUrl);
  }

  if (!supabaseClinicId) {
    console.warn("[Public Blog] Missing NEXT_PUBLIC_SUPABASE_CLINIC_ID. Blog query will not filter by clinic_id.");
  }
}

export async function getPublishedBlogPosts() {
  logPublicBlogConfig();

  if (!supabase) {
    console.warn("[Public Blog] Supabase not configured. Using local fallback posts.");
    return blogPosts;
  }

  console.info("[Public Blog] Loading published posts...");

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("[Public Blog] Error:", error);
    return [];
  }

  const posts = (data ?? [])
    .map((row) => normalizePost(row as BlogPostRow))
    .filter((post): post is BlogPost => Boolean(post));

  console.info("[Public Blog] Posts loaded:", posts.length, posts.map((post) => post.slug));
  return posts;
}

export async function getPublishedBlogPostBySlug(slug: string) {
  logPublicBlogConfig();

  if (!supabase) {
    console.warn("[Public Blog] Supabase not configured. Using local fallback post.");
    return blogPosts.find((post) => post.slug === slug) ?? null;
  }

  console.info("[Public Blog] Loading published posts...");

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("[Public Blog] Error:", error);
    return null;
  }

  const post = data ? normalizePost(data as BlogPostRow) : null;
  console.info("[Public Blog] Posts loaded:", post ? 1 : 0, post ? [post.slug] : []);
  return post;
}
