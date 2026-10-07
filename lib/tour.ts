// Farm tour schedule + capacity, shared by the booking form and the API.
// One tour a week: Fridays 11:00, 90 min (decided Oct 2026). To change the
// day, update TOUR_WEEKDAY + the "Friday" wording in lib/translations.ts.
export const TOUR_WEEKDAY = 5; // 0 = Sun ... 5 = Fri
export const TOUR_TIME = "11:00";
export const TOUR_CAPACITY = 10;
const SAME_DAY_CUTOFF_HOUR = 10; // same-day requests allowed until 10:00 Thai time
const WEEKS_AHEAD = 8;

// Next tour dates as YYYY-MM-DD, computed in Thai time (UTC+7) no matter
// where the guest's phone or the server thinks it is.
export function upcomingTourDates() {
  const bkk = new Date(Date.now() + 7 * 3600 * 1000); // read with getUTC*
  const day = new Date(Date.UTC(bkk.getUTCFullYear(), bkk.getUTCMonth(), bkk.getUTCDate()));
  let offset = (TOUR_WEEKDAY - day.getUTCDay() + 7) % 7;
  if (offset === 0 && bkk.getUTCHours() >= SAME_DAY_CUTOFF_HOUR) offset = 7;
  day.setUTCDate(day.getUTCDate() + offset);
  return Array.from({ length: WEEKS_AHEAD }, (_, i) => {
    const d = new Date(day);
    d.setUTCDate(d.getUTCDate() + i * 7);
    return d.toISOString().slice(0, 10);
  });
}

// Guests already holding a spot, per tour date (YYYY-MM-DD), from today on.
// Every row counts except Cancelled: "New" requests hold their spots until
// Kevin confirms or cancels them, and bookings he adds by hand in Airtable
// (phone, walk-in, agent) count too. Returns null if Airtable can't be read,
// so callers can fall back to "unknown" instead of blocking bookings.
export async function bookedGuestsByDate(): Promise<Record<string, number> | null> {
  const token = process.env.AIRTABLE_API_TOKEN;
  const baseId = process.env.AIRTABLE_TOUR_BASE_ID;
  const tableName = (process.env.AIRTABLE_TOUR_TABLE_NAME ?? "Bookings Website").trim();
  if (!token || !baseId) return null;

  const formula =
    "AND(IS_AFTER({Tour Date}, DATEADD(TODAY(), -1, 'days')), {Status} != 'Cancelled')";
  const booked: Record<string, number> = {};
  let offset: string | undefined;

  try {
    do {
      const params = new URLSearchParams({ filterByFormula: formula });
      params.append("fields[]", "Tour Date");
      params.append("fields[]", "Number of Guests");
      if (offset) params.set("offset", offset);
      const res = await fetch(
        `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?${params}`,
        { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
      );
      if (!res.ok) {
        console.error("[tour] Airtable read failed:", await res.text());
        return null;
      }
      const data = await res.json();
      for (const r of data.records ?? []) {
        const date = r.fields?.["Tour Date"];
        if (!date) continue;
        booked[date] = (booked[date] ?? 0) + (Number(r.fields["Number of Guests"]) || 0);
      }
      offset = data.offset;
    } while (offset);
  } catch (err) {
    console.error("[tour] Airtable read threw:", err);
    return null;
  }

  return booked;
}
