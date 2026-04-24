import { defineConfig } from "tinacms";

/**
 * TinaCMS Konfiguration — Demo-Integration.
 *
 * Lokal-Modus: läuft ohne Tina Cloud. Zum Testen:
 *   npm run tina:dev
 * Öffnet http://localhost:4321/admin-tina/ (Tina-UI) und
 * http://localhost:4321/demo/beispiel (Live-Preview der Beispielseite).
 *
 * Für Produktion würde man Tina Cloud aktivieren (clientId + token).
 */

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  // Leer lassen = Local-Modus (keine Cloud-Auth nötig für Demo).
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin-tina",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "assets/demo",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "demoPage",
        label: "Demo-Seiten (Block-Editor)",
        path: "src/content/demo",
        format: "md",
        match: { include: "**/*" },
        ui: {
          router: ({ document }) => `/demo/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Seitentitel",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Meta-Description (SEO)",
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Seitenblöcke",
            ui: {
              visualSelector: true,
            },
            templates: [
              // ---------- HERO ----------
              {
                name: "hero",
                label: "Hero (großer Titel-Block)",
                ui: {
                  previewSrc: "/admin-tina/assets/preview-hero.svg",
                  defaultItem: {
                    variant: "feature",
                    eyebrow: "Rubrik · Thema",
                    title: "Eine starke Überschrift.",
                    lede: "Eine prägnante Einleitung in ein bis zwei Sätzen.",
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "variant",
                    label: "Stil",
                    options: [
                      { value: "feature", label: "Dunkel (Petrol)" },
                      { value: "page", label: "Hell (Creme)" },
                    ],
                  },
                  { type: "string", name: "eyebrow", label: "Kicker-Zeile" },
                  { type: "string", name: "title", label: "Überschrift" },
                  {
                    type: "string",
                    name: "lede",
                    label: "Einleitungstext",
                    ui: { component: "textarea" },
                  },
                  { type: "image", name: "image", label: "Hintergrundbild (optional)" },
                ],
              },
              // ---------- TEXT 2-SPALTIG ----------
              {
                name: "textTwoCol",
                label: "Zweispaltiger Text",
                ui: {
                  defaultItem: {
                    heading: "Ein Thema in zwei Spalten.",
                    left: "Links einleitender oder aufmerksamkeitsstarker Text.",
                    right:
                      "Rechts vertiefende Inhalte, Erläuterungen oder Details.",
                  },
                },
                fields: [
                  { type: "string", name: "heading", label: "Überschrift (optional)" },
                  {
                    type: "string",
                    name: "left",
                    label: "Linke Spalte",
                    ui: { component: "textarea" },
                  },
                  {
                    type: "string",
                    name: "right",
                    label: "Rechte Spalte",
                    ui: { component: "textarea" },
                  },
                ],
              },
              // ---------- 3-KARTEN-GRID ----------
              {
                name: "cardGrid",
                label: "Kartenraster (3 Karten)",
                ui: {
                  defaultItem: {
                    heading: "Drei Gründe, drei Wege, drei Schritte.",
                    cards: [
                      { kicker: "Eins", title: "Erster Punkt", text: "Kurze Erklärung des ersten Punkts." },
                      { kicker: "Zwei", title: "Zweiter Punkt", text: "Kurze Erklärung des zweiten Punkts." },
                      { kicker: "Drei", title: "Dritter Punkt", text: "Kurze Erklärung des dritten Punkts." },
                    ],
                  },
                },
                fields: [
                  { type: "string", name: "heading", label: "Überschrift" },
                  {
                    type: "object",
                    list: true,
                    name: "cards",
                    label: "Karten",
                    ui: {
                      itemProps: (item) => ({ label: item?.title || "Karte" }),
                    },
                    fields: [
                      { type: "string", name: "kicker", label: "Kicker" },
                      { type: "string", name: "title", label: "Titel" },
                      {
                        type: "string",
                        name: "text",
                        label: "Text",
                        ui: { component: "textarea" },
                      },
                    ],
                  },
                ],
              },
              // ---------- ZITAT-BAND ----------
              {
                name: "quote",
                label: "Zitat-Band (petrol)",
                ui: {
                  defaultItem: {
                    quote: "Ein prägnanter Satz, der bleibt.",
                    cite: "Autor*in",
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "quote",
                    label: "Zitat",
                    ui: { component: "textarea" },
                  },
                  { type: "string", name: "cite", label: "Quelle / Name" },
                ],
              },
              // ---------- CALL-TO-ACTION ----------
              {
                name: "cta",
                label: "Call-to-Action (mit Button)",
                ui: {
                  defaultItem: {
                    heading: "Bereit für den nächsten Schritt?",
                    text: "Kurzer Anstoß-Text, warum man jetzt klicken sollte.",
                    buttonText: "Jetzt Kontakt aufnehmen",
                    buttonUrl: "/Kontakt",
                  },
                },
                fields: [
                  { type: "string", name: "heading", label: "Überschrift" },
                  {
                    type: "string",
                    name: "text",
                    label: "Erklärtext",
                    ui: { component: "textarea" },
                  },
                  { type: "string", name: "buttonText", label: "Button-Beschriftung" },
                  { type: "string", name: "buttonUrl", label: "Button-Ziel (URL oder /Seite)" },
                ],
              },
              // ---------- BILDERGALERIE ----------
              {
                name: "gallery",
                label: "Bildergalerie (3 Bilder)",
                ui: {
                  defaultItem: {
                    heading: "Eindrücke",
                    images: [],
                  },
                },
                fields: [
                  { type: "string", name: "heading", label: "Überschrift (optional)" },
                  {
                    type: "object",
                    list: true,
                    name: "images",
                    label: "Bilder",
                    ui: {
                      itemProps: (item) => ({ label: item?.caption || "Bild" }),
                    },
                    fields: [
                      { type: "image", name: "src", label: "Bild" },
                      { type: "string", name: "alt", label: "Bildbeschreibung" },
                      { type: "string", name: "caption", label: "Bildunterschrift" },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
