import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center gap-6 border-b p-4">
      <Link href="/" className="font-bold">
        Dev Notes Flow
      </Link>

      <Link href="/notes">Notes</Link>

      <Link href="/notes/create">Create Note</Link>

      <Link href="/about">About</Link>
    </nav>
  );
}
