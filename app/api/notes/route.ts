import { NextResponse } from "next/server";

import { noteService } from "@/server/services/note.service";
import { handleApiError } from "@/server/utils/handle-api-error";
import { parseJsonBody } from "@/server/utils/parse-json-body";
import { validateRequest } from "@/server/utils/validate-request";
import { createNoteSchema } from "@/server/validations/note.schema";

export async function GET() {
    try {
        const notes = noteService.getAllNotes();

        return NextResponse.json({
            success: true,
            data: notes,
        });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function POST(request: Request) {
    try {
        const body = await parseJsonBody(request);

        const data = validateRequest(createNoteSchema, body);

        const note = noteService.createNote(data.title, data.content);

        return NextResponse.json(
            {
                success: true,
                data: note,
            },
            { status: 201 }
        );
    } catch (error) {
        return handleApiError(error);
    }
}