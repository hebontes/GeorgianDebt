import { NextRequest, NextResponse } from 'next/server';

export interface DebtData {
    debt: number;
}

let debtStorage: DebtData = { debt: 32651648447 }; // Initialize debt

export async function GET() {
    const response = NextResponse.json(debtStorage);
    response.headers.set('Cache-Control', 'no-store'); // Disable caching for GET
    return response;
}

// Update the debt every 30 seconds in the backend
setInterval(() => {
    const debtPerSecond = 294
    const deptPer30Second = debtPerSecond * 30
    debtStorage.debt += deptPer30Second;
}, 30000); // 30 seconds

// 1 second = 294