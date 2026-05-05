import { getCache, setCache } from "@/lib/cache";

const BASE_URL = "https://sellability.brandaura.in/wp-json/wp/v2";

/* =========================
   TYPES
========================= */

export type WpRendered = {
  rendered: string;
};

export type WpMedia = {
  id: number;
  source_url?: string;
  alt_text?: string;
  title?: WpRendered;
  media_details?: {
    sizes?: Record<
      string,
      {
        source_url?: string;
      }
    >;
  };
};

export type ProjectAcf = {
  project_type?: string;
  project_status?: string;
  project_tagline?: string;
  starting_price?: number;
  price_on_request?: boolean;
  locality?: string;
  city?: string;
  google_map_url?: string | null;
  configuration?: string;
  area_size?: number;
  area_unit?: string;
  project_highlights?: string;
  amenities?: string[];
  project_image_1?: number | null;
  project_image_2?: number | null;
  project_image_3?: number | null;
  project_image_4?: number | null;
  brochure_pdf?: number | null;
  developer_name?: string;
  rera_number?: string;
  cta_text?: string;
  phone_number?: string;
  whatsapp_number?: string;
};

export type WpProject = {
  id: number;
  slug: string;
  link?: string;
  title?: WpRendered;
  excerpt?: WpRendered;
  content?: WpRendered;
  featured_media?: number;
  acf?: ProjectAcf;
};

/* =========================
   CORE FETCH (WITH REDIS)
========================= */

async function fetchJson<T>(url: string): Promise<T> {
  // Clean readable cache key
  const key = `wp:${url.replace(BASE_URL, "")}`;

  // 1. Check Redis
  const cached = await getCache<T>(key);
  if (cached) {
    console.log("✅ Redis HIT:", key);
    return cached;
  }

  console.log("❌ Redis MISS:", key);

  // 2. Fetch from WordPress
  const res = await fetch(url, {
    next: { revalidate: 60 }, // Next.js cache layer
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  }

  const data: T = await res.json();

  // 3. Dynamic TTL
  const ttl = url.includes("/media")
    ? 3600 // media rarely changes
    : url.includes("slug=")
      ? 300 // single project
      : 600; // list

  await setCache(key, data, ttl);

  return data;
}

/* =========================
   PROJECT APIs
========================= */

export async function getProjects(): Promise<WpProject[]> {
  return fetchJson<WpProject[]>(`${BASE_URL}/projects`);
}

export async function getProjectBySlug(
  slug: string,
): Promise<WpProject | null> {
  const data = await fetchJson<WpProject[]>(
    `${BASE_URL}/projects?slug=${encodeURIComponent(slug)}`,
  );

  return data[0] ?? null;
}

/* =========================
   MEDIA (OPTIMIZED)
========================= */

export async function getMediaById(
  id?: number | null,
): Promise<WpMedia | null> {
  if (!id) return null;

  try {
    return await fetchJson<WpMedia>(`${BASE_URL}/media/${id}`);
  } catch {
    return null;
  }
}

/* =========================
   HELPERS
========================= */

export function stripHtml(html = ""): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function formatPrice(value?: number): string {
  if (!value) return "";
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatLabel(value?: string): string {
  if (!value) return "";
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getImageUrl(
  media: WpMedia | null,
  size: "thumbnail" | "medium" | "full" = "full",
): string | null {
  if (!media) return null;

  if (size === "full") {
    return media.source_url || null;
  }

  return (
    media.media_details?.sizes?.[size]?.source_url || media.source_url || null
  );
}

export function getHighlights(text?: string): string[] {
  if (!text) return [];

  return text
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}
