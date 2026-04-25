import { getCollection, type AnyEntryMap, type CollectionEntry } from "astro:content";

/**
 * Lädt den (einzigen) Eintrag einer Single-File-Collection.
 *
 * Wir nutzen für Seiten-Inhalte und Schul-Stammdaten Collections, die
 * jeweils genau eine YAML-Datei enthalten. Dieser Helper gibt direkt
 * das `data`-Objekt zurück und wirft, wenn der Eintrag fehlt — damit
 * der Build laut scheitert statt mit defekten Seiten weiterzulaufen.
 */
export async function getSingle<C extends keyof AnyEntryMap>(
  collection: C
): Promise<CollectionEntry<C>["data"]> {
  const entries = await getCollection(collection);
  const entry = entries[0];
  if (!entry) {
    throw new Error(
      `Collection "${String(collection)}" enthält keinen Eintrag. ` +
      `Erwarte mindestens eine Datei in src/content/.`
    );
  }
  return entry.data;
}
