import { getCollection, type CollectionEntry } from "astro:content";

export type NewsEntry = CollectionEntry<"news">;

/** Alle veröffentlichten Artikel, absteigend nach Datum sortiert. */
export async function getAllNews(): Promise<NewsEntry[]> {
  const all = await getCollection("news", (entry) => !entry.data.draft);
  return all.sort(
    (a, b) => b.data.date.getTime() - a.data.date.getTime()
  );
}

/** Die N neuesten Artikel. */
export async function getLatestNews(limit = 3): Promise<NewsEntry[]> {
  const all = await getAllNews();
  return all.slice(0, limit);
}

/**
 * Korrigiert absolute Bild-Pfade um den Astro-`base` (für GitHub Pages).
 * Frontmatter enthält `/assets/news/foo.jpg`, live wird daraus
 * `/unesco-schule-essen-homepage/assets/news/foo.jpg`.
 */
export function withBase(path: string, base: string): string {
  if (!path) return path;
  if (path.startsWith("http")) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  const baseClean = base.endsWith("/") ? base.slice(0, -1) : base;
  // Wenn bereits mit base: unverändert zurückgeben.
  if (baseClean && clean.startsWith(baseClean + "/")) return clean;
  return `${baseClean}${clean}`;
}

/** Formatiert ein Datum als „12. Mai 2026". */
export function formatArticleDate(d: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(d);
}

/** Formatiert ein Datum als „12.04.2026" (kompakt). */
export function formatArticleDateCompact(d: Date): string {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Berlin",
  }).format(d);
}

/** Slug aus einem Eintrag. */
export function entrySlug(entry: NewsEntry): string {
  return entry.id.replace(/\.md$/, "");
}

/** Badge-CSS-Klasse aus Kategorie ableiten (matcht bestehende .badge-*). */
export function categoryBadgeClass(category: string): string {
  switch (category) {
    case "UNESCO-Projekttag":
      return "badge-unesco";
    case "Ausstellung":
    case "Kooperation":
      return "badge-kunst";
    case "Sprachen":
      return "badge-news";
    case "Wettbewerb":
      return "badge-sport";
    case "Termine":
      return "badge-aktuell";
    default:
      return "badge-news";
  }
}
