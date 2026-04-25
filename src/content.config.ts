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

/**
 * Demo Pages Collection (TinaCMS Block-Editor Demo).
 *
 * Block-basierte Seiten, deren Inhalt als Array im Frontmatter liegt.
 * Felder wie Titel/Text sind optional, weil jeder Blocktyp andere
 * Properties mitbringt. Die Validierung erfolgt über das Tina-Schema.
 */
const demoPages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/demo" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    blocks: z.array(z.record(z.any())).default([]),
  }),
});

/**
 * Schul-Stammdaten (Single-File Collection).
 *
 * Zentral gepflegte Daten, die seitenübergreifend benutzt werden:
 * Adresse, Telefon, E-Mail, aktuelles Schuljahr.
 *
 * Bearbeitbar in Sveltia unter „Schul-Stammdaten".
 */
const siteSchool = defineCollection({
  loader: glob({ pattern: "school.yml", base: "./src/content/site" }),
  schema: z.object({
    name: z.string(),
    nameLong: z.string(),
    schoolYear: z.string(),
    address: z.object({
      street: z.string(),
      postal: z.string(),
      city: z.string(),
    }),
    phone: z.string(),
    phoneOberstufe: z.string().optional(),
    fax: z.string().optional(),
    emailGeneral: z.string().email(),
    emailContact: z.string().email().optional(),
    emailOberstufe: z.string().email().optional(),
  }),
});

/**
 * Seiten-Inhalte (Single-File Collections, eine pro Seite).
 *
 * Pro Seite eine YAML-Datei mit klar benannten Feldern. Layout bleibt
 * im Astro-Code, nur Texte/Listen werden über Sveltia editierbar.
 */
const pageHome = defineCollection({
  loader: glob({ pattern: "home.yml", base: "./src/content/pages" }),
  schema: z.object({
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      titleHighlight: z.string().optional(),
      sub: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
      imageSrc: z.string(),
      imageAlt: z.string(),
    }),
    path: z.object({
      title: z.string(),
      intro: z.string(),
      cards: z.array(z.object({
        kicker: z.string(),
        title: z.string().optional(),
        bigDate: z.string().optional(),
        bigDateSub: z.string().optional(),
        text: z.string().optional(),
        ctaLabel: z.string().optional(),
        ctaHref: z.string().optional(),
      })),
    }),
    partners: z.object({
      eyebrow: z.string(),
      title: z.string(),
      intro: z.string(),
    }),
  }),
});

const pageAnmeldung = defineCollection({
  loader: glob({ pattern: "anmeldung.yml", base: "./src/content/pages" }),
  schema: z.object({
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      titleHighlight: z.string().optional(),
      lede: z.string(),
    }),
    klasse5: z.object({
      eyebrow: z.string(),
      title: z.string(),
      titleHighlight: z.string().optional(),
      intro: z.string(),
    }),
    termine: z.object({
      kicker: z.string(),
      title: z.string(),
      intro: z.string(),
      list: z.array(z.object({
        date: z.string(),
        day: z.string(),
        time: z.string(),
      })),
    }),
    closing: z.object({
      title: z.string(),
      text: z.string(),
    }),
  }),
});

const pageLeitbild = defineCollection({
  loader: glob({ pattern: "leitbild.yml", base: "./src/content/pages" }),
  schema: z.object({
    hero: z.object({
      badge: z.string().optional(),
      eyebrow: z.string(),
      title: z.string(),
      titleHighlight: z.string().optional(),
      lede: z.string(),
    }),
    motto: z.object({
      quote: z.string(),
      sub: z.string(),
    }),
    values: z.object({
      eyebrow: z.string(),
      title: z.string(),
      cards: z.array(z.object({
        num: z.string(),
        title: z.string(),
        text: z.string(),
      })),
    }),
    closing: z.object({
      title: z.string(),
      text: z.string(),
    }),
  }),
});

export const collections = {
  news,
  teachers,
  demoPages,
  siteSchool,
  pageHome,
  pageAnmeldung,
  pageLeitbild,
};
