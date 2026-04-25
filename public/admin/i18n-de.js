/**
 * Deutsche Übersetzung für die Sveltia-CMS-Oberfläche.
 *
 * HINTERGRUND: Sveltia bietet aktuell offiziell keine deutsche Lokalisierung
 * (laut Maintainer sind die UI-Strings noch nicht ready für i18n bis Version 1.0).
 * Dieses Skript überschreibt die englischen Strings runtime über einen
 * MutationObserver — pragmatischer Workaround.
 *
 * WARNUNG: Wenn Sveltia interne Strings ändert (Update), bleiben dort
 * englische Texte sichtbar, bis die Übersetzungs-Map unten ergänzt wird.
 *
 * Außerdem: Browser-Tab-Titel wird von Sveltia auf "Sveltia CMS" gesetzt
 * — den überschreiben wir hier auf "UNESCO-CMS".
 */
(function () {
  "use strict";

  const PAGE_TITLE = "UNESCO-CMS";

  // Übersetzungs-Map: englische Original-Strings → deutsche Übersetzung.
  // Exact-match (case-sensitive). Reihenfolge irrelevant.
  const T = {
    // Auth & Login
    "Sign in with GitHub": "Mit GitHub anmelden",
    "Sign in with Personal Access Token": "Mit Personal Access Token anmelden",
    "Sign in with Token": "Mit Token anmelden",
    "Sign In": "Anmelden",
    "Sign Out": "Abmelden",
    "Log out": "Abmelden",
    "Logout": "Abmelden",
    "Login": "Anmelden",
    "Loading…": "Wird geladen…",
    "Loading...": "Wird geladen…",
    "Personal Access Token": "Personal Access Token",
    "Continue": "Weiter",

    // Top-Bar / Navigation
    "Collections": "Inhalte",
    "Contents": "Inhalte",
    "Assets": "Medien",
    "Media": "Medien",
    "Media Library": "Medien-Bibliothek",
    "Workflow": "Workflow",
    "Editorial Workflow": "Redaktioneller Workflow",
    "Settings": "Einstellungen",
    "Account": "Konto",
    "Help": "Hilfe",
    "Search": "Suche",
    "Search…": "Suchen…",

    // Listen / Filter
    "All": "Alle",
    "All Collections": "Alle Sammlungen",
    "Sort": "Sortieren",
    "Sort by": "Sortieren nach",
    "Filter": "Filter",
    "Filter by": "Filtern nach",
    "Group": "Gruppieren",
    "Group by": "Gruppieren nach",
    "View": "Ansicht",
    "Grid": "Kachel",
    "List": "Liste",
    "Ascending": "Aufsteigend",
    "Descending": "Absteigend",
    "Newest": "Neueste",
    "Oldest": "Älteste",
    "Recently Updated": "Kürzlich geändert",
    "Title": "Titel",
    "Author": "Autor",
    "Date": "Datum",
    "Modified": "Geändert",
    "Created": "Erstellt",
    "No items": "Keine Einträge",
    "No matches": "Keine Treffer",
    "No results": "Keine Ergebnisse",

    // Aktionen
    "Save": "Speichern",
    "Saving…": "Wird gespeichert…",
    "Saving...": "Wird gespeichert…",
    "Saved": "Gespeichert",
    "Publish": "Veröffentlichen",
    "Published": "Veröffentlicht",
    "Unpublish": "Veröffentlichung zurücknehmen",
    "Publishing…": "Wird veröffentlicht…",
    "Save and Publish": "Speichern und veröffentlichen",
    "Save Draft": "Entwurf speichern",
    "Draft": "Entwurf",
    "Drafts": "Entwürfe",
    "Delete": "Löschen",
    "Deleting…": "Wird gelöscht…",
    "Deleted": "Gelöscht",
    "Discard": "Verwerfen",
    "Discard Changes": "Änderungen verwerfen",
    "Discard changes": "Änderungen verwerfen",
    "Cancel": "Abbrechen",
    "Close": "Schließen",
    "Confirm": "Bestätigen",
    "Yes": "Ja",
    "No": "Nein",
    "OK": "OK",
    "Apply": "Übernehmen",
    "Reset": "Zurücksetzen",
    "Edit": "Bearbeiten",
    "Show": "Anzeigen",
    "Preview": "Vorschau",
    "View live": "Live ansehen",
    "Open": "Öffnen",
    "Add": "Hinzufügen",
    "Add New": "Neu anlegen",
    "Add new": "Neu anlegen",
    "New": "Neu",
    "Create": "Erstellen",
    "Create New": "Neu erstellen",
    "Duplicate": "Duplizieren",
    "Copy": "Kopieren",
    "Copied": "Kopiert",
    "Move": "Verschieben",
    "Rename": "Umbenennen",
    "Upload": "Hochladen",
    "Uploading…": "Wird hochgeladen…",
    "Uploaded": "Hochgeladen",
    "Download": "Herunterladen",
    "Insert": "Einfügen",
    "Replace": "Ersetzen",
    "Remove": "Entfernen",
    "Back": "Zurück",
    "Next": "Weiter",
    "Done": "Fertig",
    "Submit": "Absenden",
    "Send": "Senden",
    "Refresh": "Aktualisieren",
    "Reload": "Neu laden",
    "Retry": "Erneut versuchen",

    // Editor
    "Editor": "Editor",
    "Toggle Preview Pane": "Vorschau ein-/ausblenden",
    "Bold": "Fett",
    "Italic": "Kursiv",
    "Underline": "Unterstrichen",
    "Strikethrough": "Durchgestrichen",
    "Code": "Code",
    "Heading 1": "Überschrift 1",
    "Heading 2": "Überschrift 2",
    "Heading 3": "Überschrift 3",
    "Heading 4": "Überschrift 4",
    "Heading 5": "Überschrift 5",
    "Heading 6": "Überschrift 6",
    "Paragraph": "Absatz",
    "Quote": "Zitat",
    "Numbered List": "Nummerierte Liste",
    "Bulleted List": "Aufzählung",
    "Link": "Link",
    "Insert Link": "Link einfügen",
    "Insert Image": "Bild einfügen",
    "Image": "Bild",
    "Insert Code Block": "Code-Block einfügen",
    "URL": "URL",
    "Title (optional)": "Titel (optional)",
    "Alt text": "Alternativtext",
    "Alt Text": "Alternativtext",
    "Description": "Beschreibung",
    "Caption": "Bildunterschrift",

    // Felder / Validierung
    "Required": "Pflichtfeld",
    "Optional": "Optional",
    "This field is required.": "Dieses Feld ist erforderlich.",
    "Required.": "Pflichtfeld.",
    "Field is required": "Pflichtfeld",
    "Choose": "Auswählen",
    "Choose an option": "Bitte auswählen",
    "Choose an image": "Bild auswählen",
    "Choose a file": "Datei auswählen",
    "Browse": "Durchsuchen",
    "Drag and drop or click to upload": "Per Drag & Drop oder Klick hochladen",
    "Drop files here": "Dateien hierher ziehen",
    "or": "oder",
    "and": "und",
    "Loading entries…": "Einträge werden geladen…",
    "Loading entries...": "Einträge werden geladen…",

    // Status / Hinweise
    "Unsaved Changes": "Ungespeicherte Änderungen",
    "Unsaved changes": "Ungespeicherte Änderungen",
    "You have unsaved changes": "Sie haben ungespeicherte Änderungen",
    "Are you sure?": "Sind Sie sicher?",
    "Are you sure you want to delete this entry?":
      "Diesen Eintrag wirklich löschen?",
    "Are you sure you want to leave this page?":
      "Diese Seite wirklich verlassen?",
    "This action cannot be undone.": "Diese Aktion kann nicht rückgängig gemacht werden.",
    "Successfully published.": "Erfolgreich veröffentlicht.",
    "Successfully saved.": "Erfolgreich gespeichert.",
    "Successfully deleted.": "Erfolgreich gelöscht.",
    "Failed to save.": "Speichern fehlgeschlagen.",
    "Failed to publish.": "Veröffentlichen fehlgeschlagen.",
    "An error occurred.": "Ein Fehler ist aufgetreten.",

    // Sammlungen / Einträge
    "Entries": "Einträge",
    "Entry": "Eintrag",
    "Empty": "Leer",
    "Total": "Gesamt",
    "Item": "Eintrag",
    "Items": "Einträge",
    "of": "von",
    "Page": "Seite",
    "Next Page": "Nächste Seite",
    "Previous Page": "Vorherige Seite",

    // Datum
    "Today": "Heute",
    "Yesterday": "Gestern",
    "Tomorrow": "Morgen",
    "Now": "Jetzt",
    "Just now": "Gerade eben",
    "ago": "her",
    "in": "in",
    "minute ago": "Minute her",
    "minutes ago": "Minuten her",
    "hour ago": "Stunde her",
    "hours ago": "Stunden her",
    "day ago": "Tag her",
    "days ago": "Tagen her",

    // Medien
    "Media library": "Medien-Bibliothek",
    "Insert from Media Library": "Aus Medien-Bibliothek einfügen",
    "Choose from Media Library": "Aus Medien-Bibliothek auswählen",
    "Upload new": "Neu hochladen",
    "No assets": "Keine Medien",
    "File name": "Dateiname",
    "File size": "Dateigröße",
    "Dimensions": "Abmessungen",

    // Workflow / Veröffentlichung
    "Status": "Status",
    "Stage": "Stufe",
    "In Review": "In Prüfung",
    "Ready": "Bereit",
    "In Progress": "In Bearbeitung",

    // Misc
    "Yes, I'm sure": "Ja, sicher",
    "More": "Mehr",
    "Less": "Weniger",
    "Show more": "Mehr anzeigen",
    "Show less": "Weniger anzeigen",
    "Expand": "Aufklappen",
    "Collapse": "Zuklappen",
    "Show all": "Alle anzeigen",
    "Hide": "Ausblenden",
    "Welcome": "Willkommen",
  };

  // Häufige Sätze mit Variablen — als Regex behandeln (wenig, behutsam).
  // Beispiel: "Last updated 5 minutes ago" → "Zuletzt aktualisiert vor 5 Minuten"
  const REGEX_RULES = [
    [/^Last updated (.+)$/, "Zuletzt geändert $1"],
    [/^Last edited (.+)$/, "Zuletzt bearbeitet $1"],
    [/^Created (.+)$/, "Erstellt $1"],
    [/^by (.+)$/, "von $1"],
    [/^(\d+) (entry|entries)$/, (m, n) => `${n} ${n === "1" ? "Eintrag" : "Einträge"}`],
    [/^(\d+) (item|items)$/, (m, n) => `${n} ${n === "1" ? "Eintrag" : "Einträge"}`],
    [/^(\d+) (asset|assets)$/, (m, n) => `${n} ${n === "1" ? "Medium" : "Medien"}`],
    [/^(\d+) minute(s)? ago$/, (m, n) => `vor ${n} Minute${n === "1" ? "" : "n"}`],
    [/^(\d+) hour(s)? ago$/, (m, n) => `vor ${n} Stunde${n === "1" ? "" : "n"}`],
    [/^(\d+) day(s)? ago$/, (m, n) => `vor ${n} Tag${n === "1" ? "" : "en"}`],
  ];

  function translate(text) {
    if (!text) return text;
    const trimmed = text.trim();
    if (!trimmed) return text;
    if (T[trimmed]) {
      // Whitespace beibehalten
      return text.replace(trimmed, T[trimmed]);
    }
    for (const [re, rep] of REGEX_RULES) {
      if (re.test(trimmed)) {
        const out = typeof rep === "function" ? trimmed.replace(re, rep) : trimmed.replace(re, rep);
        return text.replace(trimmed, out);
      }
    }
    return text;
  }

  // Markiert Text-Knoten, die wir bereits angefasst haben (Performance + Schutz vor Endlos-Loop)
  const SEEN = new WeakSet();

  function walk(root) {
    if (!root) return;
    // Text-Knoten direkt verändern (am robustesten)
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    let node;
    while ((node = walker.nextNode())) {
      if (SEEN.has(node)) continue;
      const before = node.nodeValue;
      const after = translate(before);
      if (after !== before) {
        node.nodeValue = after;
      }
      SEEN.add(node);
    }

    // Attribute, die in der UI sichtbar sind
    const attrTargets = root.querySelectorAll
      ? root.querySelectorAll("[placeholder], [title], [aria-label]")
      : [];
    attrTargets.forEach((el) => {
      ["placeholder", "title", "aria-label"].forEach((attr) => {
        if (!el.hasAttribute(attr)) return;
        const v = el.getAttribute(attr);
        const t = translate(v);
        if (t !== v) el.setAttribute(attr, t);
      });
    });
  }

  function setBrandTitle() {
    if (document.title !== PAGE_TITLE) {
      document.title = PAGE_TITLE;
    }
  }

  function init() {
    setBrandTitle();
    walk(document.body);

    // MutationObserver: läuft auf jede DOM-Änderung von Sveltia
    const obs = new MutationObserver((mutations) => {
      let touchedTitle = false;
      for (const m of mutations) {
        m.addedNodes &&
          m.addedNodes.forEach((n) => {
            if (n.nodeType === Node.ELEMENT_NODE) {
              walk(n);
            } else if (n.nodeType === Node.TEXT_NODE) {
              if (!SEEN.has(n)) {
                const t = translate(n.nodeValue);
                if (t !== n.nodeValue) n.nodeValue = t;
                SEEN.add(n);
              }
            }
          });
        if (m.type === "characterData" && m.target && m.target.nodeType === Node.TEXT_NODE) {
          // Sveltia hat den Text-Inhalt aktualisiert — neu übersetzen
          SEEN.delete(m.target);
          const t = translate(m.target.nodeValue);
          if (t !== m.target.nodeValue) m.target.nodeValue = t;
          SEEN.add(m.target);
        }
        if (m.type === "childList" && m.target === document.head) {
          touchedTitle = true;
        }
        if (m.target && m.target.nodeName === "TITLE") {
          touchedTitle = true;
        }
      }
      if (touchedTitle) setBrandTitle();
    });
    obs.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Title separat beobachten — Sveltia setzt document.title häufig direkt
    const titleEl = document.querySelector("title");
    if (titleEl) {
      const titleObs = new MutationObserver(setBrandTitle);
      titleObs.observe(titleEl, { childList: true, characterData: true, subtree: true });
    }
    // Fallback: pollen, weil document.title manchmal ohne Title-Element-Mutation gesetzt wird
    setInterval(setBrandTitle, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
