export type Note = {
    id: string;
    title: string;
    content: string;
};

const notes: Note[] = [
    {
        id: "1",
        title: "React Hooks",
        content: "Understanding useState and useEffect.",
    },
    {
        id: "2",
        title: "Next.js Routing",
        content: "Understanding file-based routing.",
    },
    {
        id: "3",
        title: "PostgreSQL",
        content: "Understanding database relationships.",
    },
];

export async function getNotes(): Promise<Note[]> {
    return notes;
}

export async function getNoteById(
    id: string
): Promise<Note | undefined> {
    return notes.find((note) => note.id === id);
}