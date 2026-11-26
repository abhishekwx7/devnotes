import { NextResponse } from "next/server";

import { noteService } from "@/server/services/note.service";
import { handleApiError } from "@/server/utils/handle-api-error";
import { parseJsonBody } from "@/server/utils/parse-json-body";
import { validateRequest } from "@/server/utils/validate-request";
import { noteIdSchema, updateNoteSchema } from "../../../../server/validations/note.schema";

type RouteContext = {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteContext) {
    try {
        const { id } = await params;
        const noteId = validateRequest(noteIdSchema, id);

        const note = noteService.getNoteById(noteId);

        return NextResponse.json({
            sucess: true,
            data: note,
        });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function PATCH(request: Request, { params }: RouteContext) {
    try {
        const { id } = await params;
        const noteId = validateRequest(noteIdSchema, id);

        const body = await parseJsonBody(request);

        const updates = validateRequest(updateNoteSchema, body);

        const note = noteService.updateNote(noteId, updates);

        return NextResponse.json({
            sucess: true,
            data: note,
        });
    } catch (error) {
        return handleApiError(error);
    }
}

export async function DELETE(request: Request, { params }: RouteContext) {
    try {
        const { id } = await params;
        const noteId = validateRequest(noteIdSchema, id);

        noteService.deleteNote(noteId);

        return new Response(null, { status: 204 });
    } catch (error) {
        return handleApiError(error);
    }
}