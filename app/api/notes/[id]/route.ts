import { NextResponse } from "next/server";
import { notes } from "@/lib/notes";

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

    const note = notes.find((note) => note.id === noteId);

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

    const note = notes.find((note) => note.id === noteId);

    if (!note) {
        return NextResponse.json(
            { error: "Note not found" },
            { status: 404 }
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

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        return NextResponse.json(
            { error: "Expected a JSON object" },
            { status: 400 }
        );
    }

    const updates = body as Record<string, unknown>;
    const { title, content } = updates;

    if (title === undefined && content === undefined) {
        return NextResponse.json(
            { error: "Provide a title or content to update" },
            { status: 400 }
        );
    }

    if (
        (title !== undefined &&
            (typeof title !== "string" || !title.trim())) ||
        (content !== undefined &&
            (typeof content !== "string" || !content.trim()))
    ) {
        return NextResponse.json(
            { error: "Invalid title or content" },
            { status: 400 }
        );
    }

    if (typeof title === "string") {
        note.title = title.trim();
    }

    if (typeof content === "string") {
        note.content = content.trim();
    }

    return NextResponse.json({
        success: true,
        data: note,
    });
}

export async function DELETE(request: Request, { params }: RouteContext) {
    const { id } = await params;
    const noteId = Number(id);

    if (!Number.isSafeInteger(noteId) || noteId <= 0) {
        return NextResponse.json(
            { error: "Invalid note ID" },
            { status: 400 }
        );
    }

    const index = notes.findIndex((note) => note.id === noteId);

    if (index === -1) {
        return NextResponse.json(
            { error: "Note not found" },
            { status: 400 }
        );
    }

    notes.splice(index, 1);

    return new Response(null, { status: 204 });
}