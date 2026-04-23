import { getCollection, type CollectionEntry } from "astro:content";

export type TeacherEntry = CollectionEntry<"teachers">;

/** Alle Lehrkräfte, alphabetisch nach Nachname sortiert (deutsche Sortierung). */
export async function getAllTeachers(): Promise<TeacherEntry[]> {
  const all = await getCollection("teachers");
  return all.sort((a, b) => {
    // Erst manuelle order-Angabe (falls gesetzt), dann alphabetisch
    const oa = a.data.order ?? Infinity;
    const ob = b.data.order ?? Infinity;
    if (oa !== ob) return oa - ob;
    return a.data.lastName.localeCompare(b.data.lastName, "de");
  });
}

/** Alle regulären Lehrkräfte (ohne Referendare). */
export async function getStaffTeachers(): Promise<TeacherEntry[]> {
  const all = await getAllTeachers();
  return all.filter((t) => !t.data.isTrainee);
}

/** Nur Referendar*innen. */
export async function getTrainees(): Promise<TeacherEntry[]> {
  const all = await getAllTeachers();
  return all.filter((t) => t.data.isTrainee);
}

/** Lehrkräfte mit einer bestimmten Rolle (z. B. "Schulleitung"). */
export async function getTeachersByRole(role: string): Promise<TeacherEntry[]> {
  const all = await getAllTeachers();
  return all.filter((t) => t.data.roles.includes(role));
}

/** Lehrkräfte, die ein Fach unterrichten. */
export async function getTeachersBySubject(subject: string): Promise<TeacherEntry[]> {
  const all = await getAllTeachers();
  return all.filter((t) => t.data.subjects.includes(subject));
}

/** Einzelne Lehrkraft über den Nachnamen finden (case-insensitive). */
export async function getTeacherByLastName(lastName: string): Promise<TeacherEntry | undefined> {
  const all = await getAllTeachers();
  return all.find(
    (t) => t.data.lastName.toLowerCase() === lastName.toLowerCase()
  );
}

/** Alle eindeutigen Fächer in alphabetischer Reihenfolge. */
export async function getAllSubjects(): Promise<string[]> {
  const all = await getStaffTeachers();
  const set = new Set<string>();
  for (const t of all) {
    for (const s of t.data.subjects) set.add(s);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, "de"));
}

/** Vollständiger Anzeigename: "Dr. Vorname Nachname" oder "Vorname Nachname". */
export function displayName(t: TeacherEntry): string {
  const { title, firstName, lastName } = t.data;
  return title ? `${title} ${firstName} ${lastName}` : `${firstName} ${lastName}`;
}

/** Initialen (für Fallback-Avatar, wenn kein Foto). */
export function initials(t: TeacherEntry): string {
  const f = t.data.firstName.trim().charAt(0);
  const l = t.data.lastName.trim().charAt(0);
  return (f + l).toUpperCase();
}
