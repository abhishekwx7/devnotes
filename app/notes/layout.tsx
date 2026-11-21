import Sidebar from "@/app/components/Sidebar";

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[80vh] gap-8">
      <Sidebar />

      <section className="min-w-0 flex-1">{children}</section>
    </div>
  );
}
