/**
 * HTML-Escape + kontrollierte Mini-Markdown-Transformationen für CMS-Texte.
 *
 * Wir setzen an mehreren Stellen YAML-Texte über `set:html` ein, um z.B.
 * `**fett**` oder Zeilenumbrüche darstellen zu können. Direktes Einsetzen
 * wäre eine Stored-XSS-Lücke — ein CMS-Editor könnte beliebiges HTML
 * einschleusen. Deshalb erst escapen, dann nur die erlaubten Mini-Pattern
 * zurück in HTML übersetzen.
 */

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** HTML-escape, dann `**fett**` → `<strong>fett</strong>`. */
export function safeBold(s: string | undefined | null): string {
  if (!s) return "";
  return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}

/** HTML-escape, dann `\n` → `<br>`. */
export function safeBreaks(s: string | undefined | null): string {
  if (!s) return "";
  return escapeHtml(s).replace(/\n/g, "<br>");
}

/** HTML-escape, dann `**fett**` und `\n` → `<br>`. */
export function safeRich(s: string | undefined | null): string {
  if (!s) return "";
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

/**
 * JSON-String für einbettung in inline `<script>`-Tags.
 * Verhindert `</script>`-Breakouts durch Escape von `<` zu `<`.
 */
export function safeInlineJson<T>(value: T): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
