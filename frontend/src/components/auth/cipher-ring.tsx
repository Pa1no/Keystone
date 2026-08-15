import { KeyRound } from "lucide-react";
import { cn } from "@/lib/utils";

interface CipherRingProps {
  className?: string;
}

/**
 * Assinatura visual da página: anéis concêntricos que giram lentamente,
 * como o mostrador de um cadeado de combinação.
 */
export function CipherRing({ className }: CipherRingProps) {
  return (
    <div className={cn("relative aspect-square", className)} aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(229,161,62,0.14),transparent_65%)]" />

      <div className="absolute inset-0 rounded-full border border-on-graphite/10" />

      <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-dashed border-on-graphite/25" />

      <div
        className="cipher-ring-mask absolute inset-[12%] animate-spin-reverse rounded-full opacity-80"
        style={{
          background:
            "repeating-conic-gradient(from 12deg at 50% 50%, rgba(229,161,62,0.85) 0deg 3.5deg, transparent 3.5deg 26deg)",
        }}
      />

      <div className="absolute inset-[26%] rounded-full border border-accent/25" />

      <div className="absolute inset-[32%] flex items-center justify-center rounded-full border border-accent/40 bg-graphite-raised shadow-[0_0_44px_rgba(229,161,62,0.22)]">
        <KeyRound className="h-7 w-7 text-accent" strokeWidth={2} />
      </div>
    </div>
  );
}
