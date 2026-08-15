import { KeyRound, ShieldCheck } from "lucide-react";
import { CipherRing } from "./cipher-ring";
import { cn } from "@/lib/utils";

export function AuthPanel({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "relative flex-col justify-between overflow-hidden bg-graphite p-8 text-on-graphite sm:p-12 lg:p-14",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_0%,rgba(255,255,255,0.05),transparent_55%)]" />

      <div className="relative flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <KeyRound className="h-[18px] w-[18px]" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <span className="font-display text-lg font-medium tracking-tight">Keystone</span>
      </div>

      <div className="relative my-8 space-y-9 lg:my-12">
        <CipherRing className="w-[min(38vh,272px)]" />

        <div className="max-w-sm space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            Acesso seguro
          </p>
          <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl">
            Suas credenciais, sob uma única chave.
          </h2>
          <p className="text-sm leading-relaxed text-on-graphite-muted">
            Entre, crie sua conta ou recupere seu acesso com a privacidade que seus dados
            merecem.
          </p>
        </div>
      </div>

      <div className="relative space-y-4">
        <div className="h-px w-full bg-on-graphite/10" />
        <div className="flex items-center gap-2.5 text-xs text-on-graphite-muted">
          <ShieldCheck className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          Criptografia de ponta a ponta em seus dados.
        </div>
        <p className="text-xs text-on-graphite-muted/70">© 2026 Keystone</p>
      </div>
    </aside>
  );
}
