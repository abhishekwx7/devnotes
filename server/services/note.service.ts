import { noteRepository } from "@/server/repositories/note.repository";

export class NoteValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoteValidationError"
    }
}

export class NoteLimitError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "NoteLimitError"
    }
}

export const noteService = {
    getAllNotes() {
        return noteRepository.findAll();
    },

    getNoteById(id: number) {
        return noteRepository.findById(id);
    },

    createNote(title: string, content: string) {
        const trimmedTitle = title.trim();
        const trimmedContent = content.trim();

        if (!trimmedTitle || !trimmedContent) {
            throw new NoteValidationError("Title and content are required!");
        }

        if (trimmedTitle.length > 100) {
            throw new NoteValidationError("Title cannot exceed 100 characters");
        }

        const notes = noteRepository.findAll();

        if (notes.length >= 100) {
            throw new NoteLimitError("Maximum note limit reached");
        }

        return noteRepository.create(trimmedTitle, trimmedContent);
    },

    updateNote(id: number, data: { title?: string; content?: string }) {
        const updates: {
            title?: string;
            content?: string;
        } = {};

        if (data.title !== undefined) {
            const title = data.title.trim();

            if (!title || title.length > 100) {
                throw new NoteValidationError("Title must contain 1 to 100 characters.");
            }

            updates.title = title;
        }

        if (data.content !== undefined) {
            const content = data.content.trim();

            if (!content) {
                throw new NoteValidationError("Content cannot be empty");
            }

            updates.content = content;
        }

        return noteRepository.update(id, updates);
    },

    deleteNote(id: number) {
        return noteRepository.delete(id);
    }
}