import { getNotes } from "../lib/notes";
import NotesList from "@/app/components/NotesList";

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <main>
      <h1 className="mb-6 text-3xl font-bold">All Notes</h1>

      <NotesList notes={notes} />
    </main>
  );
}
