"use client";

import { type SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CircleCheck,
  Eye,
  EyeOff,
  Info,
  LockKeyhole,
  Mail,
} from "lucide-react";
import {
  BackendNotConnectedError,
  requestPasswordReset,
  signIn,
  signUp,
} from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Mode = "signin" | "signup" | "forgot";

interface AuthFormProps {
  initialMode: Mode;
  className?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const copy: Record<
  Mode,
  {
    eyebrow: string;
    title: string;
    subtitle: string;
    submit: string;
    togglePrompt: string;
    toggleAction: string;
    toggleRoute: string;
  }
> = {
  signin: {
    eyebrow: "Acesso seguro",
    title: "Bem-vindo de volta",
    subtitle: "Entre para continuar na sua conta.",
    submit: "Entrar",
    togglePrompt: "Novo por aqui?",
    toggleAction: "Crie sua conta",
    toggleRoute: "/register",
  },
  signup: {
    eyebrow: "Acesso seguro",
    title: "Crie sua conta",
    subtitle: "Comece com seu e-mail e uma senha forte.",
    submit: "Criar conta",
    togglePrompt: "Já tem uma conta?",
    toggleAction: "Entre agora",
    toggleRoute: "/login",
  },
  forgot: {
    eyebrow: "Acesso seguro",
    title: "Recuperar senha",
    subtitle: "Informe seu e-mail e enviaremos um link de redefinição.",
    submit: "Enviar link",
    togglePrompt: "",
    toggleAction: "",
    toggleRoute: "/login",
  },
};

function validate(
  email: string,
  password: string,
  confirmPassword: string,
  mode: Mode,
): FormErrors {
  const errors: FormErrors = {};
  const trimmed = email.trim();

  if (!trimmed) {
    errors.email = "Informe seu e-mail.";
  } else if (!EMAIL_RE.test(trimmed)) {
    errors.email = "Informe um e-mail válido.";
  }

  if (mode !== "forgot") {
    if (!password) {
      errors.password = "Informe sua senha.";
    } else if (mode === "signup" && password.length < 8) {
      errors.password = "Use ao menos 8 caracteres.";
    }
  }

  if (mode === "signup") {
    if (!confirmPassword) {
      errors.confirmPassword = "Confirme sua senha.";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "As senhas não conferem.";
    }
  }

  return errors;
}

export function AuthForm({ initialMode, className }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "info" | "success">("idle");
  const [notice, setNotice] = useState<string | null>(null);

  const isForgot = initialMode === "forgot";
  const meta = copy[initialMode];

  const passwordTrailing = (
    <button
      type="button"
      onClick={() => setShowPassword((visible) => !visible)}
      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted transition-colors hover:bg-raised hover:text-ink"
    >
      {showPassword ? (
        <EyeOff className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Eye className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );

  function navigateTo(route: string) {
    router.push(route);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(email, password, confirmPassword, initialMode);
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password || nextErrors.confirmPassword) return;

    setStatus("loading");
    setNotice(null);

    try {
      const trimmedEmail = email.trim();
      if (initialMode === "signin") await signIn({ email: trimmedEmail, password });
      if (initialMode === "signup") await signUp({ email: trimmedEmail, password });
      if (initialMode === "forgot") {
        await requestPasswordReset(trimmedEmail);
        setStatus("success");
        return;
      }

      setStatus("info");
      setNotice(
        "Frontend de demonstração — conecte o backend para habilitar o acesso.",
      );
    } catch (error) {
      setStatus("info");
      setNotice(
        error instanceof BackendNotConnectedError
          ? "O backend ainda não está conectado. Esta é uma demonstração do frontend."
          : "Algo deu errado. Tente novamente.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className={cn("animate-fade-up text-center", className)}>
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <CircleCheck className="h-7 w-7" aria-hidden="true" />
        </div>
        <h1 className="font-display text-3xl font-medium tracking-tight text-ink">
          Link enviado
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
          Verifique a caixa de entrada de{" "}
          <span className="font-medium text-ink">{email.trim()}</span> para redefinir
          sua senha.
        </p>
        <Button
          variant="ghost"
          className="mt-8 w-full"
          onClick={() => navigateTo("/login")}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar para o login
        </Button>
      </div>
    );
  }

  return (
    <div
      key={initialMode}
      className={cn(
        "animate-fade-up rounded-3xl border border-line bg-surface p-7 shadow-card sm:p-9 dark:shadow-card-dark",
        className,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-strong">
        {meta.eyebrow}
      </p>
      <h1 className="mt-2.5 font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
        {meta.title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{meta.subtitle}</p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="E-mail"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="voce@exemplo.com"
          icon={<Mail className="h-[18px] w-[18px]" />}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
          autoFocus
        />

        {!isForgot && (
          <Input
            label="Senha"
            type={showPassword ? "text" : "password"}
            autoComplete={initialMode === "signup" ? "new-password" : "current-password"}
            placeholder="Sua senha"
            icon={<LockKeyhole className="h-[18px] w-[18px]" />}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={errors.password}
            labelAction={
              initialMode === "signin" ? (
                <button
                  type="button"
                  onClick={() => navigateTo("/forgot-password")}
                  className="-mx-1.5 cursor-pointer rounded px-1.5 py-0.5 text-xs font-medium text-muted transition-colors duration-150 hover:bg-accent-soft hover:text-accent-strong hover:underline decoration-accent-strong underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Esqueceu sua senha?
                </button>
              ) : undefined
            }
            trailing={passwordTrailing}
          />
        )}

        {initialMode === "signup" && (
          <Input
            label="Confirmar senha"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Repita sua senha"
            icon={<LockKeyhole className="h-[18px] w-[18px]" />}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            error={errors.confirmPassword}
            trailing={passwordTrailing}
          />
        )}

        <Button
          type="submit"
          loading={status === "loading"}
          className="w-full"
        >
          {meta.submit}
        </Button>

        {notice && status === "info" && (
          <p
            role="status"
            className="animate-fade-in flex items-start gap-2.5 rounded-xl border border-accent/40 bg-accent-soft px-3.5 py-3 text-sm text-ink"
          >
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" aria-hidden="true" />
            {notice}
          </p>
        )}
      </form>

      {!isForgot && (
        <div className="mt-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-muted">
          <span className="h-px flex-1 bg-line" />
          ou
          <span className="h-px flex-1 bg-line" />
        </div>
      )}

      {isForgot ? (
        <button
          type="button"
          onClick={() => navigateTo("/login")}
          className="mx-auto mt-8 flex cursor-pointer items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted transition-colors duration-150 hover:bg-raised hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar para o login
        </button>
      ) : (
        <p className="mt-6 text-center text-sm text-muted">
          {meta.togglePrompt}{" "}
          <button
            type="button"
            onClick={() => navigateTo(meta.toggleRoute)}
            className="-mx-1.5 cursor-pointer rounded-md px-1.5 py-0.5 font-semibold text-accent-strong transition-colors duration-150 hover:bg-accent-soft hover:underline decoration-accent-strong underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {meta.toggleAction}
          </button>
        </p>
      )}
    </div>
  );
}
