export interface Note {
    id: number;
    title: string;
    content: string;
}

export const notes: Note[] = [
    {
        id: 1,
        title: "Learn next.js",
        content: "Understanding App router",
    },
    {
        id: 2,
        title: "Learn APIs",
        content: "Understanding Route handlers",
    },
];

let nextId = 3;

export function createNote(title: string, content: string): Note {
    const note: Note = {
        id: nextId++,
        title,
        content,
    };

    notes.push(note);
    return note;
}