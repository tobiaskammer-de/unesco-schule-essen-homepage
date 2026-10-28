/**
 * Online-Terminbuchung für die Anmeldung Klasse 5.
 *
 * Die Buchungen laufen über einen eigenen Cloudflare-Worker (Ordner
 * `UNESCO/anmeldetermine`, nicht auf GitHub). Die Homepage fragt dort
 * im Browser die freien Slots ab und schickt die Buchung hin; deshalb steht
 * die Adresse auch in der Content-Security-Policy (BaseLayout).
 *
 * Für lokale Tests: `PUBLIC_TERMINE_API=http://localhost:8787 npm run dev`.
 */
export const TERMINE_API: string =
  import.meta.env.PUBLIC_TERMINE_API || "https://anmeldetermine.s8gg49crts.workers.dev";

/** Fassung des Datenschutzhinweises; bei Textänderung auch im Worker (CONSENT_VERSION) anpassen. */
export const CONSENT_VERSION = "2026-10-28";
