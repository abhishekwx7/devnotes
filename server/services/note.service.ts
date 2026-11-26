import { AppError } from "@/server/errors/app-error";
import { noteRepository } from "@/server/repositories/note.repository";

export const noteService = {
    getAllNotes() {
        return noteRepository.findAll();
    },

    getNoteById(id: number) {
        const note = noteRepository.findById(id);

        if (!note) {
            throw new AppError(
                404,
                "Note not found",
                "NOTE_NOT_FOUND"
            );
        }

        return note;
    },

    createNote(title: string, content: string) {
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle || !trimmedContent) {
            throw new AppError(
                400,
                "Title and content are required",
                "VALIDATION_ERROR"
            );
        }

        if (trimmedTitle.length > 100) {
            throw new AppError(
                400,
                "Title cannot exceed 100 characters",
                "VALIDATION_ERROR"
            );
        }

        if (noteRepository.findAll().length >= 100) {
            throw new AppError(
                409,
                "Maximum note limit reached",
                "NOTE_LIMIT_REACHED"
            );
        }

        return noteRepository.create(
            trimmedTitle,
            trimmedContent
        );
    },

    updateNote(
        id: number,
        data: { title?: string; content?: string }
    ) {
        const updates: {
            title?: string;
            content?: string;
        } = {};

        if (data.title !== undefined) {
            const title = data.title.trim();

            if (!title || title.length > 100) {
                throw new AppError(
                    400,
                    "Title must contain 1 to 100 characters",
                    "VALIDATION_ERROR"
                );
            }

            updates.title = title;
        }

        if (data.content !== undefined) {
            const content = data.content.trim();

            if (!content) {
                throw new AppError(
                    400,
                    "Content cannot be empty",
                    "VALIDATION_ERROR"
                );
            }

            updates.content = content;
        }

        // Check existence, then update.
        // These are separate operations in our temporary repository.
        this.getNoteById(id);

        return noteRepository.update(id, updates);
    },

    deleteNote(id: number) {
        this.getNoteById(id);

        return noteRepository.delete(id);
    },
};