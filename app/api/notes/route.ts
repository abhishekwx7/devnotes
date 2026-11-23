import { NextResponse } from "next/server";

export async function GET() {
    const notes = [
        { id: 1, title: 'Learn Next.js' },
        { id: 2, title: 'Learn Route Handlers' },
    ];

    return NextResponse.json({
        success: true,
        data: notes,
    })
}