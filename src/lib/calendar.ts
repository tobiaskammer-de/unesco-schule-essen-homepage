import { getCollection } from "astro:content";

/**
 * Termin-Quelle: src/content/site/termine.yml (Sveltia-Collection „Termine").
 * Früher kam der Kalender aus einem Google-Kalender-iCal-Feed; seit Juni 2026
 * werden alle Termine direkt im CMS gepflegt und beim Build eingelesen.
 */

export interface CalEvent {
  id: string;
  title: string;
  description?: string;
  location?: string;
  /** YYYY-MM-DD (local, Berlin time) */
  startDate: string;
  /** YYYY-MM-DD exclusive end (or same-day if no end) */
  endDate: string;
  /** ISO datetime if timed, else null */
  startTime: string | null;
  endTime: string | null;
  /** Spans multiple days (>1 calendar day) */
  isMultiDay: boolean;
  /** true = no time component (all-day) */
  isAllDay: boolean;
  /** derived tag for styling: highlight / default */
  category: "highlight" | "exam" | "holiday" | "default";
}

/** Date in YYYY-MM-DD, using Berlin time-zone for local accuracy. */
function toISODate(d: Date): string {
  // Format using Europe/Berlin so all-day Google events keep their intended date.
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Berlin",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(d);
  const year = parts.find((p) => p.type === "year")!.value;
  const month = parts.find((p) => p.type === "month")!.value;
  const day = parts.find((p) => p.type === "day")!.value;
  return `${year}-${month}-${day}`;
}

function categorize(title: string): CalEvent["category"] {
  const t = title.toLowerCase();
  if (
    /(tag der offenen tür|anmeld|elternabend|informationsabend|infoabend|einschulung|abi(turi|entlassung)|zeugnis)/i.test(
      t
    )
  )
    return "highlight";
  if (/(klausur|klass?enarbeit|pr[üu]fung|abitur)/i.test(t)) return "exam";
  if (/(ferien|feiertag|beweglich|frei(en)?tag|osterferien|sommerferien|herbstferien|weihnachtsferien|pfingst)/i.test(t))
    return "holiday";
  return "default";
}

let cached: CalEvent[] | null = null;

export async function fetchCalendar(): Promise<CalEvent[]> {
  if (cached) return cached;

  const entries = await getCollection("siteTermine");
  const raw = entries[0]?.data.events ?? [];

  const events: CalEvent[] = raw.map((t, i) => {
    const startDate = t.start;
    // end ist der letzte Tag (inklusive); fehlt er, ist der Termin eintägig.
    const endDate = t.end ?? t.start;
    const title = t.title.trim();
    return {
      id: `termin-${startDate}-${i}`,
      title,
      description: t.note,
      location: t.location,
      startDate,
      endDate,
      startTime: t.time ? `${startDate}T${t.time}:00` : null,
      endTime: t.timeEnd ? `${endDate}T${t.timeEnd}:00` : null,
      isAllDay: !t.time,
      isMultiDay: startDate !== endDate,
      category: categorize(title),
    };
  });

  // Sort ascending by start date, then start time
  events.sort((a, b) =>
    a.startDate !== b.startDate
      ? (a.startDate < b.startDate ? -1 : 1)
      : (a.startTime ?? "") < (b.startTime ?? "") ? -1 : 1
  );
  cached = events;
  return events;
}

/** Upcoming events from today (inclusive) onwards. */
export async function upcomingEvents(limit?: number): Promise<CalEvent[]> {
  const all = await fetchCalendar();
  const today = toISODate(new Date());
  const upcoming = all.filter((e) => e.endDate >= today);
  return typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;
}

/** Events overlapping a given YYYY-MM-DD date. */
export function eventsOnDate(events: CalEvent[], isoDate: string): CalEvent[] {
  return events.filter((e) => e.startDate <= isoDate && e.endDate >= isoDate);
}

/** Build a month-grid (6 weeks × 7 days, Mon–Sun) for the given month. */
export interface CalDay {
  iso: string;
  day: number;
  inMonth: boolean;
  isToday: boolean;
  events: CalEvent[];
}
export function buildMonth(
  year: number,
  month0: number /* 0-indexed */,
  events: CalEvent[]
): { days: CalDay[]; monthLabel: string; year: number; month0: number } {
  const today = toISODate(new Date());
  const first = new Date(Date.UTC(year, month0, 1));
  const firstWeekday = (first.getUTCDay() + 6) % 7; // Monday-first: Mon=0..Sun=6
  const gridStart = new Date(first);
  gridStart.setUTCDate(first.getUTCDate() - firstWeekday);

  const days: CalDay[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setUTCDate(gridStart.getUTCDate() + i);
    const iso = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getUTCDate()).padStart(2, "0")}`;
    days.push({
      iso,
      day: d.getUTCDate(),
      inMonth: d.getUTCMonth() === month0,
      isToday: iso === today,
      events: eventsOnDate(events, iso),
    });
  }

  const monthLabel = new Intl.DateTimeFormat("de-DE", {
    month: "long",
    year: "numeric",
  }).format(first);

  return { days, monthLabel, year, month0 };
}

/** Formats like "12. Mai 2026" */
export function formatDateLong(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

/** Formats like "12." (day only) */
export function formatDayNum(iso: string): string {
  const [, , d] = iso.split("-");
  return parseInt(d, 10) + ".";
}

/** Formats like "Mai" (short month name) */
export function formatMonthShort(iso: string): string {
  const [y, m] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, 1));
  return new Intl.DateTimeFormat("de-DE", { month: "short" }).format(date).replace(".", "");
}

/** Weekday label short, e.g. "Mo" */
export function formatWeekdayShort(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("de-DE", { weekday: "short" }).format(date).replace(".", "");
}

/** Formats a potentially multi-day event as "12.–15. Mai 2026" or "Mi., 12. Mai 2026" */
export function formatEventRange(e: CalEvent): string {
  if (e.startDate === e.endDate) {
    const [y, m, d] = e.startDate.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    return new Intl.DateTimeFormat("de-DE", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  }
  const [sy, sm, sd] = e.startDate.split("-").map(Number);
  const [ey, em, ed] = e.endDate.split("-").map(Number);
  const startD = new Date(Date.UTC(sy, sm - 1, sd));
  const endD = new Date(Date.UTC(ey, em - 1, ed));
  const fmt = new Intl.DateTimeFormat("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  if (sy === ey && sm === em) {
    return `${sd}.\u2013${fmt.format(endD)}`;
  }
  return `${fmt.format(startD)} \u2013 ${fmt.format(endD)}`;
}
