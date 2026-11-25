import { NextResponse } from "next/server";
import {
    noteService,
    NoteValidationError,
} from "@/server/services/note.service";
import {
    noteIdSchema,
    updateNoteSchema,
} from "@/server/validations/note.schema";

type RouteContext = {
    params: Promise<{ id: string }>;
};

// GET /api/notes/:id
export async function GET(
    request: Request,
    { params }: RouteContext
) {
    const { id } = await params;
    const parsedId = noteIdSchema.safeParse(id);

    if (!parsedId.success) {
        return NextResponse.json(
            { error: "Invalid note ID" },
            { status: 400 }
        );
    }

    const note = noteService.getNoteById(parsedId.data);

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

// PATCH /api/notes/:id
export async function PATCH(
    request: Request,
    { params }: RouteContext
) {
    const { id } = await params;
    const parsedId = noteIdSchema.safeParse(id);

    if (!parsedId.success) {
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

    const result = updateNoteSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            {
                success: false,
                errors: result.error.flatten(),
            },
            { status: 400 }
        );
    }

    try {
        const note = noteService.updateNote(
            parsedId.data,
            result.data
        );

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

        console.error(error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// DELETE /api/notes/:id
export async function DELETE(
    request: Request,
    { params }: RouteContext
) {
    const { id } = await params;
    const parsedId = noteIdSchema.safeParse(id);

    if (!parsedId.success) {
        return NextResponse.json(
            { error: "Invalid note ID" },
            { status: 400 }
        );
    }

    const deleted = noteService.deleteNote(parsedId.data);

    if (!deleted) {
        return NextResponse.json(
            { error: "Note not found" },
            { status: 404 }
        );
    }

    return new Response(null, { status: 204 });
}