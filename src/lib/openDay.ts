/**
 * Tag der offenen Tür: zentrale Angaben für Hinweisleiste (BaseLayout) und
 * Startseiten-Kopf (index.astro).
 *
 * Beides erscheint nur bis `endsAt`. Die Seite wird jede Nacht um 03:00 UTC
 * neu gebaut; zusätzlich blendet ein kleines Skript im Browser Leiste und
 * Kopf nach `endsAt` sofort aus. Für den nächsten Termin hier Datum und
 * Ende eintragen, sonst nichts.
 */
export const openDay = {
  /** Ende der Veranstaltung, danach verschwinden Leiste und Startseiten-Kopf. */
  endsAt: "2026-12-05T14:00:00+01:00",
  dateLong: "Samstag, 5. Dezember 2026",
  /** Kurzform für die Hinweisleiste auf dem Handy (muss in eine Zeile passen). */
  dateShort: "Sa 5.12.",
  time: "10 bis 14 Uhr",
  timeShort: "10–14 Uhr",
  page: "Tag-der-offenen-Tuer.html",
};

/** true, solange der Termin noch bevorsteht (zur Build-Zeit ausgewertet). */
export function openDayUpcoming(now: Date = new Date()): boolean {
  return now.getTime() < new Date(openDay.endsAt).getTime();
}
