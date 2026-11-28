"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NotebookPen, Plus } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <p className="mb-5 text-xs font-semibold tracking-widest text-zinc-500">
        WORKSPACE
      </p>

      <Link
        href="/notes/new"
        className="mb-6 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        New Note
      </Link>

      <Link
        href="/notes"
        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
          pathname === "/notes"
            ? "bg-zinc-800 text-white"
            : "text-zinc-400 hover:bg-zinc-900"
        }`}
      >
        <NotebookPen size={18} />
        All Notes
      </Link>

      <div className="mt-6 border-t border-zinc-800 pt-4">
        <p className="text-xs text-zinc-500">Your thoughts, organized.</p>
      </div>
    </aside>
  );
}
