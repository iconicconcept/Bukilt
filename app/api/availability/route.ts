import { NextRequest, NextResponse } from "next/server";

import { getAvailableSlots }
from "@/services/server/availability.service";

export async function GET(
  request: NextRequest,
) {
  const vendorId =
    request.nextUrl.searchParams.get("vendorId");

  const date =
    request.nextUrl.searchParams.get("date");

  if (!vendorId || !date) {
    return NextResponse.json([]);
  }

  const slots =
    await getAvailableSlots(
      vendorId,
      date,
    );

  return NextResponse.json(slots);
}