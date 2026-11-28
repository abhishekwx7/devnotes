import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePage({ params }: NotePageProps) {
  const { id } = await params;

  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });

  if (!note) {
    notFound();
  }

  return (
    <div className="p-6">
      <Link
        href="/notes"
        className="inline-block text-sm text-gray-500 hover:text-gray-900 mb-4"
      >
        &larr; Back to Notes
      </Link>

      <h1 className="text-3xl font-bold">{note.title}</h1>

      <p className="text-sm text-gray-500 mt-2">
        Created: {note.createdAt.toLocaleDateString()}
      </p>

      <div className="mt-6 whitespace-pre-wrap">{note.content}</div>
    </div>
  );
}
