import { Link } from "react-router-dom";

function LegalPage({
  eyebrow = "Europetourz",
  title,
  description,
  lastUpdated,
  children,
}) {
  return (
    <section className="min-h-screen bg-[#070b14] px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            {eyebrow}
          </p>

          <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
            {title}
          </h1>

          {description && (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-400">
              {description}
            </p>
          )}

          {lastUpdated && (
            <p className="mt-4 text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        <div className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 leading-8 text-gray-300 shadow-2xl sm:p-10">
          {children}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/contact"
            className="rounded-xl bg-yellow-400 px-5 py-3 font-bold text-black transition hover:bg-yellow-300"
          >
            Contact Us
          </Link>

          <Link
            to="/"
            className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LegalSection({ title, children }) {
  return (
    <section>
      <h2 className="mb-3 text-2xl font-bold text-white">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function LegalList({ children }) {
  return (
    <ul className="list-disc space-y-2 pl-6 text-gray-300">
      {children}
    </ul>
  );
}

export default LegalPage;