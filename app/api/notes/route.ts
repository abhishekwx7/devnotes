import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma"

export async function GET() {
    try {
        const notes = await prisma.note.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(notes, { status: 200 });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to fetch notes" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, content } = body;

        if (typeof title !== "string" || !title.trim()) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        if (content !== undefined && typeof content !== "string") {
            return NextResponse.json(
                { error: "Content must be a string" },
                { status: 400 }
            );
        }

        const note = await prisma.note.create({
            data: {
                title: title.trim(),
                content: content ?? "",
            },
        });

        return NextResponse.json(note, { status: 201 });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to create note" },
            { status: 500 }
        );
    }
}