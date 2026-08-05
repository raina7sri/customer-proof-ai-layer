import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV = [
  { to: "/", label: "Start" },
  { to: "/create", label: "Create record" },
  { to: "/record", label: "Review record" },
  { to: "/use", label: "Use this proof" },
  { to: "/library", label: "Proof library" },
  { to: "/metrics", label: "Metrics" },
  { to: "/expansion", label: "Expansion" },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-midnight">
        <div className="mx-auto max-w-6xl px-6 pt-8 pb-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-signal" aria-hidden="true" />
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-midnight-foreground/60">
                  Aurics Lab
                </span>
              </div>
              <h1 className="mt-3 text-xl font-semibold text-midnight-foreground sm:text-2xl">
                Customer Proof AI Layer
              </h1>
              <p className="mt-1 text-sm text-midnight-foreground/70">
                Rebuilding customer marketing to be AI-native.
              </p>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-midnight-foreground/60">
              AI structures and adapts customer proof. Humans approve what is true, current,
              commercially useful, and safe to use.
            </p>
          </div>
        </div>
        <nav className="border-t border-white/10">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-6">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="shrink-0 border-b-2 border-transparent px-3 py-3 text-xs font-medium tracking-wide text-midnight-foreground/60 transition-colors hover:text-midnight-foreground"
                activeProps={{
                  className: "!border-signal !text-midnight-foreground",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
      <footer className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-[0.7rem] tracking-wide text-muted-foreground">
            Sample data — category-referenced synthetic examples. Not real customer claims.
          </p>
        </div>
      </footer>
    </div>
  );
}