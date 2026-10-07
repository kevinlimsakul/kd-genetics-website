import { NextResponse } from "next/server";
import { TOUR_CAPACITY, bookedGuestsByDate, upcomingTourDates } from "@/lib/tour";

// Spots left per upcoming Friday, read live from Airtable by the booking form.
// left = null means Airtable couldn't be read; the form then just hides counts.
export const dynamic = "force-dynamic";

export async function GET() {
  const booked = await bookedGuestsByDate();
  const spots = upcomingTourDates().map((date) => ({
    date,
    left: booked ? Math.max(0, TOUR_CAPACITY - (booked[date] ?? 0)) : null,
  }));
  return NextResponse.json({ capacity: TOUR_CAPACITY, spots });
}
