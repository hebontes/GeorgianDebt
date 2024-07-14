import { get, getAll } from "@vercel/edge-config";
import { NextRequest, NextResponse } from "next/server";

export interface StorageResponse {
  debt: number;
  specific_date: number;
}

// 32651547563
// 1717795800000
const specificDate = new Date(2024, 5, 8, 1, 30).getTime();

export async function GET() {
  const dept_and_date = await getAll();

  return NextResponse.json(dept_and_date);
}
