import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Note not found</h1>

      <p className="text-zinc-400">This note does not exist.</p>

      <Link href="/notes" className="text-blue-500 hover:underline">
        Return to notes
      </Link>
    </div>
  );
}
