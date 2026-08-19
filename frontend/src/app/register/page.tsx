import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "Keystone — Criar conta",
  description:
    "Crie sua conta Keystone e comece a gerar chaves de acesso personalizadas.",
};

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthForm initialMode="signup" className="w-full max-w-md" />
    </AuthLayout>
  );
}
