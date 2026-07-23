import { getServerSession } from "next-auth";

import { SignInButton, SignOutButton } from "@/app/components/auth-buttons";
import { ShoppingListApp } from "@/app/components/shopping-list-app";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = Boolean(session?.user?.email);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-1 flex-col px-4 py-5 sm:px-6 md:px-8 md:py-8">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(52,211,153,0.9)]" />
            Personal finance
          </div>
          <h1 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
            Budgetly
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400 sm:text-base">
            Manage budgets, track expenses and income, and keep your finances in sync.
          </p>
        </div>
        {isAuthenticated ? <SignOutButton /> : <SignInButton />}
      </header>

      {!isAuthenticated && (
        <main className="flex flex-1 items-center justify-center">
          <div className="max-w-lg rounded-2xl border border-white/10 bg-zinc-900/70 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur">
            <h2 className="text-2xl font-semibold text-zinc-100">
              Sign in to manage your finances
            </h2>
            <p className="mt-2 text-base text-zinc-400">
              Your budgets and entries are private to your account and stored in a
              Vercel-managed Postgres database.
            </p>
            <div className="mt-5 flex justify-center">
              <SignInButton />
            </div>
          </div>
        </main>
      )}

      {isAuthenticated && (
        <main className="flex-1">
          <div className="mb-5 w-full rounded-2xl border border-white/[0.1] bg-white/[0.035] px-4 py-3 text-sm text-zinc-300 shadow-xl shadow-black/10 backdrop-blur-xl">
            Signed in as{" "}
            <span className="font-semibold text-zinc-100">
              {session?.user?.email}
            </span>
          </div>
          <ShoppingListApp />
        </main>
      )}
    </div>
  );
}
