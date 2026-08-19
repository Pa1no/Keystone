import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";
import { AuthLayout } from "@/components/auth/auth-layout";

export const metadata: Metadata = {
  title: "Keystone — Recuperar senha",
  description:
    "Recupere o acesso à sua conta Keystone definindo uma nova senha.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthForm initialMode="forgot" className="w-full max-w-md" />
    </AuthLayout>
  );
}
