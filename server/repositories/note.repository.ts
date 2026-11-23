import { notes, createNote } from "@/lib/notes";

export const noteRepository = {
    findAll() {
        return notes;
    },

    findById(id: number) {
        return notes.find((note) => note.id === id) ?? null;
    },

    create(title: string, content: string) {
        return createNote(title, content);
    },

    update(
        id: number,
        data: { title?: string; content?: string }
    ) {
        const note = notes.find((note) => note.id === id);

        if (!note) return null;

        if (data.title !== undefined) {
            note.title = data.title;
        }

        if (data.content !== undefined) {
            note.content = data.content;
        }

        return note;
    },

    delete(id: number) {
        const index = notes.findIndex((note) => note.id === id);

        if (index === -1) return false;

        notes.splice(index, 1);
        return true;
    },
};