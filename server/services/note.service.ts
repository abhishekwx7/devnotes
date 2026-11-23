import { noteRepository } from "@/server/repositories/note.repository";

export const noteService = {
    getAllNotes() {
        return noteRepository.findAll();
    },

    getNoteById(id: number) {
        return noteRepository.findById(id);
    },

    createNote(title: string, content: string) {
        return noteRepository.create(
            title.trim(),
            content.trim()
        );
    },

    updateNote(
        id: number,
        data: { title?: string; content?: string }
    ) {
        const updates = {
            ...(data.title !== undefined && {
                title: data.title.trim(),
            }),
            ...(data.content !== undefined && {
                content: data.content.trim(),
            }),
        };

        return noteRepository.update(id, updates);
    },

    deleteNote(id: number) {
        return noteRepository.delete(id);
    },
};