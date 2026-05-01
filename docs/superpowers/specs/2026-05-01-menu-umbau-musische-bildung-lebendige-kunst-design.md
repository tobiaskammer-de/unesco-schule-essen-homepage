# Menü-Umbau: „Kulturelle Bildung und Kunst" → zwei Einträge

**Datum:** 2026-05-01
**Branch:** `claude/elegant-mahavira-1a0dd7`

## Ziel

Der bisher einzige Menüpunkt **„Kulturelle Bildung und Kunst"** wird in zwei eigenständige Menüpunkte aufgeteilt:

1. **Musische und kulturelle Bildung** — bekommt den vollständigen, **unveränderten** Inhalt der bisherigen Seite.
2. **Lebendige Kunst** — neue Dummy-Seite mit Platzhaltertexten und einer voll funktionsfähigen, CMS-editierbaren **Bildergalerie inkl. Lightbox**.

Beide Seiten sind über Sveltia CMS pflegbar.

## Status quo (kurz)

- Eine Astro-Seite [Kulturelle-Bildung.astro](../../../src/pages/Kulturelle-Bildung.astro) (rendert die kompletten Sektionen Hero / Profilkurse / Partner / Closing)
- Eine YAML-Datei [kulturelle-bildung.yml](../../../src/content/pages/kulturelle-bildung.yml) — im CMS aktuell **nur das Hero** editierbar; alle anderen Sektionen sind hardcoded im Astro-Markup
- Menü-Eintrag in [BaseLayout.astro:1050](../../../src/layouts/BaseLayout.astro:1050) (Mega-Dropdown „Profil" → Spalte „Was uns ausmacht")
- Astro-Content-Collection `pageKulturelleBildung` in [content.config.ts:231](../../../src/content.config.ts:231)
- Sveltia-CMS-Eintrag in [config.yml:776-792](../../../public/admin/config.yml:776) (`kulturelleBildung`, Label „Kulturelle Bildung")

## Architektur-Übersicht

| Was | Bisher | Nachher |
|---|---|---|
| Menüpunkt(e) | 1 × „Kulturelle Bildung und Kunst" | 2 × „Musische und kulturelle Bildung" + „Lebendige Kunst" |
| Astro-Seiten | `Kulturelle-Bildung.astro` | `Musische-und-Kulturelle-Bildung.astro` (umbenannt) + `Lebendige-Kunst.astro` (neu) |
| Content-YAMLs | `kulturelle-bildung.yml` | `musische-und-kulturelle-bildung.yml` (umbenannt) + `lebendige-kunst.yml` (neu) |
| Astro-Collections | `pageKulturelleBildung` | `pageMusischeUndKulturelleBildung` + `pageLebendigeKunst` |
| Sveltia-Einträge | `kulturelleBildung` | `musischeUndKulturelleBildung` + `lebendigeKunst` |

## Komponente 1 — Menüstruktur

In [BaseLayout.astro:1046-1054](../../../src/layouts/BaseLayout.astro:1046) (Mega-Dropdown „Profil", Spalte „Was uns ausmacht") wird die Liste angepasst:

```
- Politische Bildung
- Erinnerungskultur
- Musische und kulturelle Bildung   ← war: Kulturelle Bildung und Kunst
- Lebendige Kunst                   ← neu, direkt darunter
- Naturwissenschaftliches Lernen
- Sprachen
```

Die beiden neuen Einträge stehen direkt untereinander, weil sie thematisch zusammengehören.

## Komponente 2 — Bestehende Seite umbenennen

**Strategie: Reines Umbenennen, Inhalt 1:1 unverändert.**

### Datei-Operationen

- `src/pages/Kulturelle-Bildung.astro` → `src/pages/Musische-und-Kulturelle-Bildung.astro` (Inhalt unverändert, **außer** dem `<title>`-Attribut)
- `src/content/pages/kulturelle-bildung.yml` → `src/content/pages/musische-und-kulturelle-bildung.yml` (Inhalt **vollständig unverändert**)

### Code-Anpassungen in der umbenannten Astro-Datei

Genau **zwei** kleine Anpassungen:

1. `<BaseLayout title="Kulturelle Bildung und Kunst · UNESCO-Schule Essen">` → `<BaseLayout title="Musische und kulturelle Bildung · UNESCO-Schule Essen">` (vom User explizit freigegeben — Browser-Tab-Titel ist Meta, nicht „Inhalt").
2. `getSingle("pageKulturelleBildung")` → `getSingle("pageMusischeUndKulturelleBildung")` — technische Konsequenz der Collection-Umbenennung.

### Content-Collection in [content.config.ts](../../../src/content.config.ts)

Die bestehende Collection-Definition (Zeile 231) wird umbenannt:
- Konstanten-Name: `pageKulturelleBildung` → `pageMusischeUndKulturelleBildung`
- `glob`-Pattern: `"kulturelle-bildung.yml"` → `"musische-und-kulturelle-bildung.yml"`
- Eintrag im `collections`-Export entsprechend umbenannt

### Sveltia-CMS-Eintrag in [config.yml](../../../public/admin/config.yml)

Die bestehende Konfiguration unter `# ---------------- KULTURELLE BILDUNG ----------------` (Zeile 776-792) wird angepasst:
- `file:` → `src/content/pages/musische-und-kulturelle-bildung.yml`
- `label:` → `"Musische und kulturelle Bildung"`
- `name:` → `musischeUndKulturelleBildung`
- Felder unverändert (nur Hero ist im CMS editierbar — bleibt so)
- Kommentar-Block-Header umbenennen: `# ---------------- MUSISCHE UND KULTURELLE BILDUNG ----------------`

### Bewusst unverändert gelassen (User-Vorgabe „UNVERÄNDERT")

Folgende Stellen behalten das Wording „Kulturelle Bildung" / „Kulturelle Bildung und Kunst", weil der User die Inhalte explizit unverändert übernehmen möchte:

- Hero-Eyebrow im YAML: `"Profil · Kulturelle Bildung und Kunst"`
- Hero-Title-Logik im Markup: `die bei uns <em>{...}</em>` — bleibt
- Sektionsüberschrift: *„Kulturelle Bildung im Schulalltag"* (h2 in der `kb-courses`-Sektion)
- Sektionsüberschrift: *„Kulturelle Bildung durch starke Partner"* (h2 in der `kb-partners`-Sektion)
- Closing-Sektion: unverändert
- Alle CSS-Klassen (`kb-intro`, `kb-courses`, …): unverändert — sie sind nur Layout-Hooks, kein User-sichtbarer Text

Diese Texte kann der User später jederzeit selbst über Sveltia (Hero) bzw. eine Code-Anpassung anpassen.

## Komponente 3 — Neue Seite „Lebendige Kunst"

### Sektionsaufbau

1. **Hero** — Eyebrow „Profil · Lebendige Kunst", Titel + Lede als Platzhalter, optionales Hero-Bild. Verwendet die bestehende `<PageHero variant="feature" …>`-Komponente analog zur Schwester-Seite.
2. **Platzhalter-Sektion (Intro)** — kurzer Hinweistext, dass die Seite gerade entsteht. Visuell einfach gehalten (Container, Text, optional Eyebrow). CMS-editierbar.
3. **Galerie-Sektion** — der zentrale, schon jetzt nutzbare Block (Details unten).

### Datei: `src/pages/Lebendige-Kunst.astro`

Frischer Astro-Component-File. Layout-Stil orientiert sich an der bestehenden Schwester-Seite (gleiche CSS-Variablen `--petrol`, `--creme`, `--offwhite`, `--space-section`, `--card-padding`, `--hairline` …), damit das visuelle Vokabular der Schul-Homepage konsistent bleibt.

CSS-Prefix für Sektionen dieser Seite: `.lk-` (für „Lebendige Kunst"), parallel zum `.kb-`-Schema der bestehenden Seite.

### Datei: `src/content/pages/lebendige-kunst.yml`

```yaml
hero:
  eyebrow: "Profil · Lebendige Kunst"
  title: "Lebendige Kunst,"
  titleHighlight: "die hier entsteht."
  lede: "Hier entsteht in Kürze eine Seite zur lebendigen Kunst an unserer Schule. (Platzhalter — wird noch gefüllt.)"
  image: ""
  imageAlt: ""

intro:
  eyebrow: "In Arbeit"
  title: "Diese Seite wird gerade aufgebaut."
  body: |
    Wir arbeiten an Inhalten zu Lebendiger Kunst an unserer Schule. Schauen Sie gerne bald wieder vorbei — die Galerie unten zeigt schon erste Eindrücke.

gallery:
  eyebrow: "Galerie"
  title: "Eindrücke aus dem Kunstunterricht."
  body: "Werke, Werkstätten, Ausstellungen — eine wachsende Sammlung."
  items: []
```

`gallery.items` startet leer; der User trägt die ersten Einträge selbst über Sveltia ein. Optional kann ich 1–2 Beispiel-Einträge mit echten existierenden Bildern aus `public/assets/` hinzufügen, damit die Seite beim ersten Deploy nicht ganz leer aussieht — siehe „Offene Punkte".

### Astro-Collection in [content.config.ts](../../../src/content.config.ts)

Eine neue `pageLebendigeKunst`-Collection mit dem flexiblen Schema (`flexibleSchema`), analog zu den vielen anderen YAML-getriebenen Seiten — die Validierung übernimmt Sveltia über `config.yml`.

### Sveltia-CMS-Eintrag in [config.yml](../../../public/admin/config.yml)

Neuer Eintrag direkt nach `musischeUndKulturelleBildung` (also dort, wo bisher der `kulturelleBildung`-Block aufhörte). Felder:

- `hero` (object) — Eyebrow, Titel, Title-Highlight, Lede, Bild (optional), Bild-Alt
- `intro` (object, collapsed) — Eyebrow, Titel, Body (Markdown)
- `gallery` (object) — Eyebrow, Titel, Einleitungstext, dann eine **`items`-Liste** (siehe Komponente 4)

## Komponente 4 — Galerie inkl. Lightbox

### CMS-Schema (`gallery.items`)

Eine `widget: list`-Struktur. Pro Eintrag:

| Feld | Widget | Pflicht | Zweck |
|---|---|---|---|
| `image` | image (kein `choose_url`) | ja | Das Galerie-Bild |
| `imageAlt` | string | ja | Alt-Text (Barrierefreiheit) |
| `title` | string | nein | optionaler Titel über dem Bild |
| `caption` | text | nein | optionaler Bildtext unter dem Bild (mehrzeilig) |

Kein zusätzliches `order`-Feld — Sveltia erlaubt Drag-and-Drop in `list`-Widgets, das ist die natürliche Sortier-UX.

### Datenfluss

`lebendige-kunst.yml` → Astro-Collection (`getSingle("pageLebendigeKunst")`) → über `page.gallery.items` als Array in den Astro-Markup-Loop → fertig gerendertes HTML mit allen Galerie-Karten und einem leichtgewichtigen Lightbox-Skript am Seitenende.

### Visuelles Layout (Grid)

- Responsives CSS-Grid: Desktop 3 Spalten, Tablet 2, Mobil 1 (Breakpoints in Anlehnung an die bestehende `kb-partner-grid` / `kb-course-grid`-Logik)
- Pro Karte: optionaler Titel oben, dann das Bild (16:10 oder 4:3 — ich entscheide mich für **4:3**, weil Kunstwerke häufiger hochformatiger / quadratischer sind als die 16:10-Bühnenbilder), darunter optionaler Bildtext
- Kartenstil analog zu `.kb-partner` (weißer Hintergrund, `--hairline`-Border, `border-top`-Akzent in `--petrol`, sanfter Hover-Lift)
- Bilder werden mit `loading="lazy"` und `decoding="async"` ausgeliefert
- Klickbar: jede Karte ist ein `<button>` (oder `<a href="#">` mit JS-Handler) und öffnet die Lightbox

### Lightbox-Komponente

**Implementierung: vanilla JS, eingebettet im Astro-Component, keine externe Library** — passt zum bestehenden Tech-Stack der Seite (kein React/Vue, nur Astro + leichtes JS).

#### Verhalten

- Klick auf Karte → Vollbild-Overlay öffnet sich, zeigt das Bild groß zentriert
- Über/unter dem Bild: Titel und Bildtext, falls vorhanden
- **Tastatur:** `Esc` schließt, `←` und `→` navigieren zwischen Bildern, `Tab` bleibt im Lightbox-Trap
- **Maus:** Klick auf den dunklen Hintergrund schließt; ein expliziter Schließen-Button (×) ist oben rechts; Pfeil-Buttons links/rechts schalten weiter
- **Touch:** Pfeil-Buttons reichen — kein Swipe-Handling in Phase 1 (kann später ergänzt werden)
- **Fokus-Management:** beim Öffnen wird der Fokus in die Lightbox gesetzt; beim Schließen wandert er auf die ursprünglich geklickte Karte zurück
- **Body-Scroll-Lock** während Lightbox offen ist
- **`prefers-reduced-motion`:** Keine Fade-/Zoom-Animation, wenn der User reduzierte Animationen bevorzugt
- Beim Erreichen des Anfangs/Endes der Galerie: zyklisch (vom letzten zum ersten und umgekehrt)

#### Barrierefreiheit

- Overlay als `role="dialog"` mit `aria-modal="true"` und `aria-label="Galerie-Bild"`
- Schließen-/Pfeil-Buttons mit `aria-label`
- Fokus-Trap: Tab-Reihenfolge bleibt im Dialog
- Beim Schließen: Fokus zurück auf die geklickte Karte (`document.activeElement`-State vor Öffnen merken)

#### Markup-Struktur (Skizze)

```html
<section class="lk-gallery" aria-label="Galerie Lebendige Kunst">
  <div class="container">
    <div class="head"><span class="eyebrow">…</span><h2>…</h2><p>…</p></div>
    <ul class="lk-gallery-grid" role="list">
      {items.map((item, i) => (
        <li>
          <button class="lk-gallery-card"
                  data-lightbox-index={i}
                  aria-label={`Bild öffnen: ${item.title || item.imageAlt}`}>
            {item.title && <h3>{item.title}</h3>}
            <div class="media"><img src={item.image} alt={item.imageAlt} loading="lazy" decoding="async"/></div>
            {item.caption && <p>{item.caption}</p>}
          </button>
        </li>
      ))}
    </ul>
  </div>

  <!-- Lightbox-Overlay (initial hidden) -->
  <div class="lk-lightbox" role="dialog" aria-modal="true" aria-label="Galerie-Bild" hidden>
    <button class="lk-lightbox-close" aria-label="Schließen">×</button>
    <button class="lk-lightbox-prev"  aria-label="Vorheriges Bild">‹</button>
    <button class="lk-lightbox-next"  aria-label="Nächstes Bild">›</button>
    <figure>
      <img class="lk-lightbox-image" alt="" />
      <figcaption>
        <h3 class="lk-lightbox-title"></h3>
        <p class="lk-lightbox-caption"></p>
      </figcaption>
    </figure>
  </div>
</section>

<script>
  // Vanilla-JS-Lightbox: liest items aus einem JSON-Datablock,
  // bindet Karten-Clicks, Tastatur, Fokus-Trap, Body-Scroll-Lock.
</script>
```

Die Item-Daten werden zur JS-Hand vom Server über ein `<script type="application/json" id="lk-gallery-data">…</script>` (oder analog) ausgegeben — kein zusätzlicher Roundtrip, kein Framework nötig.

### Leerer-Galerie-Verhalten

Wenn `items.length === 0`, zeigt die Galerie-Sektion nur den Header (Eyebrow/Titel/Einleitung) und einen unauffälligen Hinweis: *„Bald gibt es hier erste Bilder zu sehen."* — kein leeres Grid, keine Lightbox-Logik aktiv.

## Datei-Struktur — neu nach Umbau

```
src/pages/
  Musische-und-Kulturelle-Bildung.astro   ← umbenannt aus Kulturelle-Bildung.astro
  Lebendige-Kunst.astro                    ← NEU

src/content/pages/
  musische-und-kulturelle-bildung.yml      ← umbenannt aus kulturelle-bildung.yml
  lebendige-kunst.yml                      ← NEU

src/content.config.ts                      ← angepasst (Collection umbenannt + neue Collection)
src/layouts/BaseLayout.astro               ← Menü-Eintrag aufgeteilt
public/admin/config.yml                    ← CMS-Eintrag umbenannt + neuer Eintrag
```

Keine `Kulturelle-Bildung.html`-Datei mehr — bestehende externe Links auf diese URL sind aktuell nicht erkennbar (es ist eine reine Profil-Unterseite). Eingehende Links würden ins Leere laufen. Das ist im Schul-Kontext akzeptabel; bei Bedarf könnte später ein Redirect ergänzt werden.

## Fehlerbehandlung & Build-Verhalten

- Astro bricht den Build ab, wenn eine Collection leer ist (`getSingle` wirft) — also muss `lebendige-kunst.yml` von Anfang an existieren und valide sein.
- Bilder im `gallery.items[i].image`-Feld referenzieren Pfade unter `public/assets/…`. Sveltia kümmert sich um Upload und Pfad-Generierung.
- Optionale Felder (`title`, `caption`, `image` im Hero) werden im Markup mit `{value && (…)}`-Conditionals gerendert — leere Strings führen nicht zu leeren `<h3></h3>`-Tags.

## Tests / Verifikation

Manuelle Verifikation reicht für diese Änderung — kein automatisierter Test-Stack im Projekt:

1. `npm run dev` starten, Seite erreichbar prüfen:
   - `/Musische-und-Kulturelle-Bildung.html` zeigt den unveränderten alten Inhalt; Browser-Tab-Titel zeigt den neuen Namen
   - `/Lebendige-Kunst.html` zeigt die neue Dummy-Seite
2. Menü im Header: zwei neue Einträge sichtbar, beide klickbar, beide führen zur richtigen Seite
3. Mit befüllter `gallery.items`-Liste (mind. 2 Bildern): Galerie-Grid rendert, Klick öffnet Lightbox, Pfeil-Tasten / Pfeil-Buttons schalten weiter, `Esc` schließt, Fokus kehrt zur geklickten Karte zurück
4. Mit leerer `gallery.items`-Liste: Galerie-Sektion zeigt nur Header + Hinweistext, keine JS-Fehler in der Console
5. Sveltia CMS (`npm run dev` lokal oder live): beide Einträge sichtbar im Admin, Felder editierbar, Bilder hochladbar
6. `npm run build` läuft ohne Fehler durch
7. Mobile / Tablet / Desktop: Galerie-Grid responsive, Lightbox auf Mobil benutzbar
8. `prefers-reduced-motion`: Lightbox öffnet ohne Animation

## Offene Punkte / spätere Ergänzungen

Bewusst **nicht** Teil dieser Umsetzung (YAGNI):

- **Beispiel-Galerie-Einträge zum Start:** Die Galerie startet leer. Der User kann bei Bedarf später entscheiden, ob initial ein, zwei Beispieleinträge mit existierenden Schul-Bildern hinzukommen sollen.
- **Swipe-Gesten** auf Touch-Geräten in der Lightbox
- **Redirect** von `/Kulturelle-Bildung.html` auf die neue Seite (nur sinnvoll, wenn externe Backlinks existieren — derzeit keine bekannt)
- **Hero-Eyebrow / Sektionsüberschriften** auf der Schwester-Seite an „Musische und kulturelle Bildung" anpassen (User-Wunsch: explizit unverändert)
- **Galerie-Komponente herauslösen** als wiederverwendbare Astro-Component für andere Seiten — derzeit auf eine Seite beschränkt; Refaktorierung auf Wunsch jederzeit möglich
