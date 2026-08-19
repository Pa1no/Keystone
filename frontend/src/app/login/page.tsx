import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "Keystone — Entrar",
  description:
    "Entre na sua conta Keystone para gerenciar suas chaves de acesso.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthForm initialMode="signin" className="w-full max-w-md" />
    </AuthLayout>
  );
}
