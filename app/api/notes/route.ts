import { NextResponse } from "next/server";
import {
    noteService,
    NoteValidationError,
    NoteLimitError,
} from "@/server/services/note.service";
import {
    createNoteSchema,
} from "@/server/validations/note.schema";

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

    const result = createNoteSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json(
            {
                success: false,
                errors: result.error.flatten().fieldErrors,
            },
            { status: 400 }
        );
    }

    try {
        const note = noteService.createNote(
            result.data.title,
            result.data.content
        );

        return NextResponse.json(
            { success: true, data: note },
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

        console.error(error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}