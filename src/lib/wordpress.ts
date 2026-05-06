import { getCache, setCache } from '@/lib/cache';

const BASE_URL = "https://sellability.brandaura.in/wp-json/wp/v2";

/* =========================
   TYPES
========================= */

export type WpRendered = {
  rendered: string;
};

export type ProjectAcf = {
  project_type?: string;
  project_status?: string;
  starting_price?: number;
  city?: string;
  configuration?: string;
  amenities?: string[];
};

export type WpProject = {
  id: number;
  slug: string;
  title?: WpRendered;
  excerpt?: WpRendered;
  featured_media?: number;
  acf?: ProjectAcf;
};

/* =========================
   FILTER TYPE
========================= */

export type ProjectFilters = {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: string;
  type?: string;
  page?: number;
  perPage?: number;
};

/* =========================
   CORE FETCH (REDIS)
========================= */

async function fetchJson<T>(url: string): Promise<T> {
  const key = `wp:${url.replace(BASE_URL, '')}`;

  const cached = await getCache<T>(key);
  if (cached) {
    console.log('✅ HIT:', key);
    return cached;
  }

  console.log('❌ MISS:', key);

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data: T = await res.json();

  const ttl =
    url.includes('slug=') ? 300 :
    url.includes('page=') ? 300 :
    600;

  await setCache(key, data, ttl);

  return data;
}

/* =========================
   BASE PROJECT FETCH
========================= */

export async function getProjects(): Promise<WpProject[]> {
  return fetchJson<WpProject[]>(`${BASE_URL}/projects`);
}

export async function getProjectBySlug(slug: string) {
  const data = await fetchJson<WpProject[]>(
    `${BASE_URL}/projects?slug=${encodeURIComponent(slug)}`
  );

  return data[0] ?? null;
}

/* =========================
   FILTERED PROJECTS (CORE)
========================= */

export async function getProjectsWithFilters(
  filters: ProjectFilters
): Promise<WpProject[]> {
  const {
    city,
    minPrice,
    maxPrice,
    status,
    type,
    page = 1,
    perPage = 10,
  } = filters;

  const params = new URLSearchParams();

  params.append('page', String(page));
  params.append('per_page', String(perPage));

  // ACF filters (requires WP support or custom endpoint)
  if (city) params.append('acf[city]', city);
  if (status) params.append('acf[project_status]', status);
  if (type) params.append('acf[project_type]', type);

  if (minPrice) params.append('acf[starting_price][>=]', String(minPrice));
  if (maxPrice) params.append('acf[starting_price][<=]', String(maxPrice));

  const url = `${BASE_URL}/projects?${params.toString()}`;

  return fetchJson<WpProject[]>(url);
}

/* =========================
   FEATURED PROJECTS
========================= */

export async function getFeaturedProjects(): Promise<WpProject[]> {
  // assuming you mark featured via ACF
  const url = `${BASE_URL}/projects?acf[featured]=true`;

  return fetchJson<WpProject[]>(url);
}

/* =========================
   CITY BASED
========================= */

export async function getProjectsByCity(city: string) {
  return getProjectsWithFilters({ city });
}

/* =========================
   PRICE RANGE
========================= */

export async function getProjectsByPrice(
  min: number,
  max: number
) {
  return getProjectsWithFilters({
    minPrice: min,
    maxPrice: max,
  });
}

/* =========================
   PAGINATION
========================= */

export async function getProjectsPaginated(
  page: number,
  perPage: number = 10
) {
  return getProjectsWithFilters({ page, perPage });
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
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}