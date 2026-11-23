import { NextResponse } from "next/server";

import {
    noteService,
    NoteValidationError,
} from "@/server/services/note.service";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export async function GET(
    request: Request,
    { params }: RouteContext
) {
    const { id } = await params;
    const noteId = Number(id);

    if (!Number.isSafeInteger(noteId) || noteId <= 0) {
        return NextResponse.json(
            { error: "Invalid note ID" },
            { status: 400 }
        );
    }

    const note = noteService.getNoteById(noteId);

    if (!note) {
        return NextResponse.json(
            { error: "Note not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({
        success: true,
        data: note,
    });
}

export async function PATCH(
    request: Request,
    { params }: RouteContext
) {
    const { id } = await params;
    const noteId = Number(id);

    if (!Number.isSafeInteger(noteId) || noteId <= 0) {
        return NextResponse.json(
            { error: "Invalid note ID" },
            { status: 400 }
        );
    }

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

    if (title === undefined && content === undefined) {
        return NextResponse.json(
            { error: "Provide a title or content" },
            { status: 400 }
        );
    }

    if (
        (title !== undefined && typeof title !== "string") ||
        (content !== undefined && typeof content !== "string")
    ) {
        return NextResponse.json(
            { error: "Invalid title or content" },
            { status: 400 }
        );
    }

    try {
        const note = noteService.updateNote(noteId, {
            title,
            content,
        });

        if (!note) {
            return NextResponse.json(
                { error: "Note not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: note,
        });
    } catch (error) {
        if (error instanceof NoteValidationError) {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        console.error("Failed to update note:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: RouteContext
) {
    const { id } = await params;
    const noteId = Number(id);

    if (!Number.isSafeInteger(noteId) || noteId <= 0) {
        return NextResponse.json(
            { error: "Invalid note ID" },
            { status: 400 }
        );
    }

    const deleted = noteService.deleteNote(noteId);

    if (!deleted) {
        return NextResponse.json(
            { error: "Note not found" },
            { status: 404 }
        );
    }

    return new Response(null, { status: 204 });
}