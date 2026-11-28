import { createNote } from "@/actions/note.action";
import Link from "next/link";

export default function NewNotePage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold m-6">Create Note</h1>

      <form action={createNote} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title
          </label>

          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter note title"
            required
            className="w-full rounded-lg border border-zinc-700 bg-transparent p-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-2">
            Content
          </label>

          <textarea
            name="content"
            id="content"
            placeholder="Write your note.."
            rows={8}
            required
            className="w-full rounded-lg border-zinc-700 bg-transparent p-3 outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3">
          <Link href="/notes" className="rounded-lg border px-4 py-2">
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Create Note
          </button>
        </div>
      </form>
    </div>
  );
}
