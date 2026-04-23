import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * News Collection.
 *
 * Jeder Artikel ist eine Markdown-Datei unter src/content/news/.
 * Dateiname = URL-Slug (z. B. 2026-04-15-unesco-projekttag-grenzen.md → /aktuelles/2026-04-15-unesco-projekttag-grenzen).
 *
 * Die Frontmatter ist das, was Sveltia CMS als Formular anzeigt.
 * Wenn du hier ein Feld änderst, musst du auch public/admin/config.yml anpassen.
 */
const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum([
      "UNESCO-Projekttag",
      "Kooperation",
      "Ausstellung",
      "Sprachen",
      "Wettbewerb",
      "Aus dem Unterricht",
      "Termine",
      "Allgemein",
    ]),
    excerpt: z.string().min(40).max(320),
    coverImage: z.string(),
    coverAlt: z.string(),
    author: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Teachers Collection.
 *
 * Jede Lehrkraft ist eine Markdown-Datei unter src/content/teachers/.
 * Dateiname-Konvention: nachname-vorname.md (z. B. boehm-viola.md) —
 * funktioniert als URL-Slug und sortiert natürlich alphabetisch.
 *
 * Zentrale Datenquelle für Kollegium-Seite UND andere Seiten, die
 * Lehrkraft-Karten darstellen (Schulleitung, Oberstufe etc.).
 */
const teachers = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/teachers" }),
  schema: z.object({
    firstName: z.string(),
    lastName: z.string(),
    title: z.string().optional(),
    subjects: z.array(z.string()).default([]),
    roles: z.array(z.string()).default([]),
    email: z.string().email(),
    phone: z.string().optional(),
    photo: z.string().optional(),
    isTrainee: z.boolean().default(false),
    order: z.number().optional(),
  }),
});

export const collections = { news, teachers };
