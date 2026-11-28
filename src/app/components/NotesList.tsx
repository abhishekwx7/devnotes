"use client";

import { useState } from "react";
import type { Note } from "../lib/notes";
import Link from "next/link";

export default function NotesList({ notes }: { notes: Note[] }) {
  const [search, setSearch] = useState("");

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3"
      />

      <div className="grid gap-4">
        {filteredNotes.map((note) => (
          <Link
            key={note.id}
            href={`/notes/${note.id}`}
            className="block rounded-xl border border-zinc-800 p-5 transition hover:border-zinc-600 hover:bg-zinc-900"
          >
            <h2 className="text-xl font-semibold">{note.title}</h2>

            <p className="mt-2 text-zinc-400">{note.content}</p>
          </Link>
        ))}

        {filteredNotes.length === 0 && <p>No notes found.</p>}
      </div>
    </div>
  );
}
