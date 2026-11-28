import { prisma } from "../../lib/prisma";
import Link from "next/link";

export default async function NotesPage() {
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Notes</h1>
      {notes.length === 0 && <p>No notes found.</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            className="border rounded-lg p-4 hover:border-blue-500"
          >
            <h2 className="text-lg font-semibold">{note.title}</h2>

            <p className="text-sm text-gray-400 mt-2">{note.content}</p>

            <p className="text-xs text-gray-400 mt-4">
              {note.createdAt.toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
