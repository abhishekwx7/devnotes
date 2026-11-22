import { Suspense } from "react";
import Sidebar from "@/app/components/Sidebar";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[80vh] gap-8">
      <Suspense
        fallback={
          <aside className="w-64 shrink-0 rounded-xl border border-zinc-800 p-4">
            Loading...
          </aside>
        }
      >
        <Sidebar />
      </Suspense>

      <section className="min-w-0 flex-1">{children}</section>
    </div>
  );
}
