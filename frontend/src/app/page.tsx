import type { Metadata } from "next";
import { KeyRound } from "lucide-react";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthPanel } from "@/components/auth/auth-panel";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export const metadata: Metadata = {
  title: "Keystone — Entre na sua conta",
  description:
    "Entre, crie sua conta ou recupere seu acesso com a privacidade que seus dados merecem.",
};

function MobileBrand() {
  return (
    <header className="flex items-center gap-2.5 bg-graphite px-6 py-5 text-on-graphite lg:hidden">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
        <KeyRound className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="font-display text-lg font-medium tracking-tight">Keystone</span>
    </header>
  );
}

export default function Home() {
  return (
    <main className="min-h-dvh">
      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
        <AuthPanel className="hidden lg:flex" />

        <section className="relative flex flex-col bg-bg">
          <ThemeToggle className="absolute right-5 top-5 z-10" />
          <MobileBrand />

          <div className="flex flex-1 items-center justify-center px-5 py-16 sm:px-10 sm:py-20">
            <AuthForm className="w-full max-w-md" />
          </div>
        </section>
      </div>
    </main>
  );
}
