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

/**
 * Weitere Seiten-Collections (Variante B: alle Inhalte editierbar).
 *
 * Aus Pragmatismus nutzen die folgenden Seiten ein flexibles Schema
 * (z.record(z.any())). Die strukturierte Validierung übernimmt das
 * Sveltia-Editor-Schema in public/admin/config.yml — dort sind die
 * Felder pro Seite klar definiert. Im Astro-Code lesen wir die Daten
 * über typisierte Helper aus src/lib/pageContent.ts.
 *
 * Diese Lockerung ist bewusst — sonst wären 16+ vollständig getypte
 * Schemas in dieser Datei zu wartender Overhead, ohne dass die Type-
 * Safety im UI-Code echten Mehrwert brächte (Texte sind Texte).
 */
const flexibleSchema = z.record(z.string(), z.any());

const pageUnescoMission   = defineCollection({ loader: glob({ pattern: "unesco-mission.yml",       base: "./src/content/pages" }), schema: flexibleSchema });
const pageSchulprogramm   = defineCollection({ loader: glob({ pattern: "schulprogramm.yml",        base: "./src/content/pages" }), schema: flexibleSchema });
const pageErprobungsstufe = defineCollection({ loader: glob({ pattern: "erprobungsstufe.yml",      base: "./src/content/pages" }), schema: flexibleSchema });
const pageMittelstufe     = defineCollection({ loader: glob({ pattern: "mittelstufe.yml",          base: "./src/content/pages" }), schema: flexibleSchema });
const pageOberstufe       = defineCollection({ loader: glob({ pattern: "oberstufe.yml",            base: "./src/content/pages" }), schema: flexibleSchema });
const pageSchulleitung    = defineCollection({ loader: glob({ pattern: "schulleitung.yml",         base: "./src/content/pages" }), schema: flexibleSchema });
const pageBeratung        = defineCollection({ loader: glob({ pattern: "beratung.yml",             base: "./src/content/pages" }), schema: flexibleSchema });
const pageBerufsorientierung = defineCollection({ loader: glob({ pattern: "berufsorientierung.yml", base: "./src/content/pages" }), schema: flexibleSchema });
const pageKulturelleBildung = defineCollection({ loader: glob({ pattern: "kulturelle-bildung.yml", base: "./src/content/pages" }), schema: flexibleSchema });
const pagePaedagogischeKonzepte = defineCollection({ loader: glob({ pattern: "paedagogische-konzepte.yml", base: "./src/content/pages" }), schema: flexibleSchema });
const pageAnfahrt         = defineCollection({ loader: glob({ pattern: "anfahrt.yml",              base: "./src/content/pages" }), schema: flexibleSchema });
const pageSchliessfaecher = defineCollection({ loader: glob({ pattern: "schliessfaecher.yml",      base: "./src/content/pages" }), schema: flexibleSchema });
const pageFoerderverein   = defineCollection({ loader: glob({ pattern: "foerderverein.yml",        base: "./src/content/pages" }), schema: flexibleSchema });
const pageEhemalige       = defineCollection({ loader: glob({ pattern: "ehemalige.yml",            base: "./src/content/pages" }), schema: flexibleSchema });
const pagePartner         = defineCollection({ loader: glob({ pattern: "partner.yml",              base: "./src/content/pages" }), schema: flexibleSchema });
const pageEltern          = defineCollection({ loader: glob({ pattern: "eltern.yml",               base: "./src/content/pages" }), schema: flexibleSchema });
const pageKontakt         = defineCollection({ loader: glob({ pattern: "kontakt.yml",              base: "./src/content/pages" }), schema: flexibleSchema });
const pageArbeitsgemeinschaften = defineCollection({ loader: glob({ pattern: "arbeitsgemeinschaften.yml", base: "./src/content/pages" }), schema: flexibleSchema });
const pageStundentafel    = defineCollection({ loader: glob({ pattern: "stundentafel.yml",         base: "./src/content/pages" }), schema: flexibleSchema });
const pageAktuelles       = defineCollection({ loader: glob({ pattern: "aktuelles.yml",            base: "./src/content/pages" }), schema: flexibleSchema });
const pageKollegium       = defineCollection({ loader: glob({ pattern: "kollegium.yml",            base: "./src/content/pages" }), schema: flexibleSchema });
const pageKalender        = defineCollection({ loader: glob({ pattern: "kalender.yml",             base: "./src/content/pages" }), schema: flexibleSchema });
const pageImpressum       = defineCollection({ loader: glob({ pattern: "impressum.yml",            base: "./src/content/pages" }), schema: flexibleSchema });
const pageDatenschutz     = defineCollection({ loader: glob({ pattern: "datenschutz.yml",          base: "./src/content/pages" }), schema: flexibleSchema });

export const collections = {
  news,
  teachers,
  demoPages,
  siteSchool,
  pageHome,
  pageAnmeldung,
  pageLeitbild,
  pageUnescoMission,
  pageSchulprogramm,
  pageErprobungsstufe,
  pageMittelstufe,
  pageOberstufe,
  pageSchulleitung,
  pageBeratung,
  pageBerufsorientierung,
  pageKulturelleBildung,
  pagePaedagogischeKonzepte,
  pageAnfahrt,
  pageSchliessfaecher,
  pageFoerderverein,
  pageEhemalige,
  pagePartner,
  pageEltern,
  pageKontakt,
  pageArbeitsgemeinschaften,
  pageStundentafel,
  pageAktuelles,
  pageKollegium,
  pageKalender,
  pageImpressum,
  pageDatenschutz,
};
