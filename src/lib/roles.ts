import { getCollection, type CollectionEntry } from "astro:content";
import type { TeacherEntry } from "./teachers";

/**
 * Kanonische Funktionsrollen.
 *
 * Diese Schlüssel sind die VERBINDUNG zwischen Lehrkraft-Datenbank
 * (src/content/teachers/*.md → roles[]) und allen Seiten, die
 * Ansprechpersonen automatisiert anzeigen (Schulleitung, Beratung,
 * Mittelstufe, Oberstufe, Berufsorientierung).
 *
 * Wechselt eine Person eine Funktion, genügt es, die Rolle in der
 * Lehrkraft-Markdown zu verschieben — alle Seiten ziehen automatisch
 * nach.
 *
 * Wichtig: Der Wert hier MUSS exakt dem Eintrag im roles[]-Array der
 * Lehrkraft entsprechen (Groß/Kleinschreibung, Sonderzeichen).
 * Erlaubt ist ein Zusatz in Klammern am Ende, z. B.
 * "Koordination Mittelstufe (kommissarisch)" — für den Abgleich zählt
 * nur der Teil vor der Klammer, der Zusatz wird als Hinweis angezeigt.
 */
export const ROLES = {
  SCHULLEITUNG: "Schulleitung",
  STELLV_SCHULLEITUNG: "Stellvertretende Schulleitung",
  KOORD_MITTELSTUFE: "Koordination Mittelstufe",
  KOORD_OBERSTUFE: "Koordination Oberstufe",
  KOORD_ERPROBUNGSSTUFE: "Koordination Erprobungsstufe",
  STUFENLEITUNG_EF: "Stufenleitung EF",
  SEKRETARIAT: "Sekretariat",
  BERATUNGSLEHRER: "Beratungslehrer",
  SCHULSOZIALARBEIT: "Schulsozialarbeit",
  BEAUFTRAGTE_LESEFOERDERUNG_SI: "Beauftragte Leseförderung Sek I",
} as const;

export type RoleKey = keyof typeof ROLES;
export type RoleValue = (typeof ROLES)[RoleKey];

/**
 * Liste aller kanonischen Rollen (z. B. für Hint-Texte im CMS).
 */
export const ALL_ROLES: RoleValue[] = Object.values(ROLES);

/** Kern eines Rollen-Eintrags ohne Klammer-Zusatz ("… (kommissarisch)" → "…"). */
export function roleCore(entry: string): string {
  return entry.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

/** Klammer-Zusatz eines Rollen-Eintrags, z. B. "kommissarisch"; undefined ohne Zusatz. */
export function roleNote(entry: string): string | undefined {
  return entry.match(/\(([^)]*)\)\s*$/)?.[1]?.trim() || undefined;
}

/** Prüft, ob eine Lehrkraft die Rolle führt (Klammer-Zusatz wird ignoriert). */
export function hasRole(teacher: TeacherEntry, role: string): boolean {
  return teacher.data.roles.some((r) => roleCore(r) === role);
}

/** Zusatz, den eine Lehrkraft zu dieser Rolle führt (z. B. "kommissarisch"). */
export function roleNoteFor(teacher: TeacherEntry, role: string): string | undefined {
  const entry = teacher.data.roles.find((r) => roleCore(r) === role);
  return entry ? roleNote(entry) : undefined;
}

/**
 * Eine einzelne Person mit der gegebenen Funktionsrolle finden.
 *
 * Nimmt die Person mit dem niedrigsten `order` (oder alphabetisch
 * ersten), falls mehrere die Rolle führen. Gibt `undefined` zurück,
 * wenn die Stelle aktuell vakant ist.
 */
export async function getTeacherByRole(
  role: RoleValue
): Promise<TeacherEntry | undefined> {
  const all = await getCollection("teachers");
  const matches = all
    .filter((t) => hasRole(t, role))
    .sort((a, b) => {
      const oa = a.data.order ?? Infinity;
      const ob = b.data.order ?? Infinity;
      if (oa !== ob) return oa - ob;
      return a.data.lastName.localeCompare(b.data.lastName, "de");
    });
  return matches[0];
}

/**
 * Alle Personen mit der gegebenen Funktionsrolle.
 *
 * Nützlich, wenn eine Funktion von mehreren Personen gemeinsam
 * ausgefüllt wird (z. B. zwei Beratungslehrkräfte).
 */
export async function getTeachersWithRole(
  role: RoleValue
): Promise<TeacherEntry[]> {
  const all = await getCollection("teachers");
  return all
    .filter((t) => hasRole(t, role))
    .sort((a, b) => {
      const oa = a.data.order ?? Infinity;
      const ob = b.data.order ?? Infinity;
      if (oa !== ob) return oa - ob;
      return a.data.lastName.localeCompare(b.data.lastName, "de");
    });
}
