import { NextRequest, NextResponse } from "next/server";

export interface DebtData {
  debt: number;
  get_diff_in_seconds: number;
}
const DEPLOY_DATE = new Date(2024, 6, 8, 1, 30);
let debtStorage: DebtData = {
  debt: 32651648447,
  get_diff_in_seconds: Math.floor(
    (new Date().getTime() - DEPLOY_DATE.getTime()) / 1000
  ),
}; // Initialize debt

export async function GET() {
  const response = NextResponse.json({
    dept: debtStorage.debt + debtStorage.get_diff_in_seconds * 294,
  });
  response.headers.set("Cache-Control", "no-store"); // Disable caching for GET
  return response;
}
