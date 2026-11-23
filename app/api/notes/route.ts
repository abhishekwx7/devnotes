import { NextResponse } from "next/server";

import {
    noteService,
    NoteLimitError,
    NoteValidationError,
} from "@/server/services/note.service";

export async function GET() {
    const notes = noteService.getAllNotes();

    return NextResponse.json({
        success: true,
        data: notes,
    });
}

export async function POST(request: Request) {
    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 }
        );
    }

    if (
        typeof body !== "object" ||
        body === null ||
        Array.isArray(body)
    ) {
        return NextResponse.json(
            { error: "Expected a JSON object" },
            { status: 400 }
        );
    }

    const { title, content } = body as Record<string, unknown>;

    if (
        typeof title !== "string" ||
        typeof content !== "string"
    ) {
        return NextResponse.json(
            { error: "Title and content must be strings" },
            { status: 400 }
        );
    }

    try {
        const note = noteService.createNote(title, content);

        return NextResponse.json(
            {
                success: true,
                data: note,
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof NoteValidationError) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        if (error instanceof NoteLimitError) {
            return NextResponse.json(
                { error: error.message },
                { status: 409 }
            );
        }

        console.error("Failed to create note:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}