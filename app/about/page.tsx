import Link from "next/link";

export const metadata = {
  title: "About - Dev Notes",
  description: "A note taking app for your techincal notes",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] px-6 py-24 text-stone-900 selection:bg-amber-200">
      <article className="mx-auto max-w-xl space-y-12">
        {/* Header */}
        <header className="space-y-4">
          <p className="text-xs font-medium uppercase tracking-widest text-stone-400">
            About
          </p>
          <h1 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">
            A quiet place for noisy minds.
          </h1>
          <p className="text-base leading-7 text-stone-600">
            Dev Note Flow is a distraction free workspace built for writing,
            thinking and organizing notes about your projects.
          </p>
        </header>

        {/* Core Philosphy*/}
        <section className="space-y-6 border-y border-stone-600 py-10 text-sm leading-6 text-stone-600">
          <div>
            <h2 className="font-medium text-stone-900">Instant and Offline</h2>
            <p className="mt-1">
              Opens in milli seconds and works completely offline.
            </p>
          </div>
          <div>
            <h2 className="font-medium text-stone-900">Private by Default</h2>
            <p className="mt-1">
              End-to-End Encrypted. No ads, no tracking and no AI Models
              scanning your personal writing.
            </p>
          </div>
          <div>
            <h2 className="font-medium text-stone-900">Plain Text Forever</h2>
            <p className="mt-1">Everything is stored in clean markdown.</p>
          </div>
        </section>

        {/* Minimal CTA */}
        <footer className="flex items-center gap-6">
          <Link
            href="/signup"
            className="rounded-md bg-stone-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-stone-800 transition"
          >
            Start Writing
          </Link>
          <Link
            href="/"
            className="text-sm text-stone-500 hover:text-stone-900 transition"
          ></Link>
        </footer>
      </article>
    </main>
  );
}
