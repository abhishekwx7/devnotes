import { getNoteById } from "@/app/lib/notes";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const note = await getNoteById(id);

  if (!note) {
    notFound();
  }

  return (
    <main className="space-y-6">
      <Link
        href="/notes"
        className="text-sm text-zinc-400 hover:text-white mb-5"
      >
        ⬅️ Back to notes
      </Link>

      <h1 className="text-4xl font-bold mt-4 text-red-500">{note.title}</h1>

      <p className="leading-relaxed text-zinc-400">{note.content}</p>
    </main>
  );
}
