import { NextResponse } from "next/server";
import { createNote } from "@/lib/notes";
import { noteService } from "@/server/services/note.service";

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

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        return NextResponse.json(
            { error: "Expected a JSON object" },
            { status: 400 }
        );
    }

    const { title, content } = body as Record<string, unknown>;

    if (
        typeof title !== "string" ||
        !title.trim() ||
        typeof content !== "string" ||
        !content.trim()
    ) {
        return NextResponse.json(
            { error: "Title and content are required" },
            { status: 400 }
        );
    }

    const note = createNote(title.trim(), content.trim());

    return NextResponse.json(
        { success: true, data: note },
        { status: 201 }
    );
}