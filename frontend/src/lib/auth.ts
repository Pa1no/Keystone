/**
 * Contrato de autenticação do frontend.
 *
 * Estas funções são os pontos de integração com o backend. Elas ainda não
 * realizam requisições: simulam a latência de rede e lançam
 * `BackendNotConnectedError` até que a API seja implementada.
 *
 * TODO(backend): substituir os stubs por chamadas reais à API.
 */

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  createdAt: string;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

export interface AuthApiError {
  code: string;
  message: string;
}

export class BackendNotConnectedError extends Error {
  constructor() {
    super("O backend ainda não está conectado.");
    this.name = "BackendNotConnectedError";
  }
}

function simulateLatency(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 900));
}

/** Autentica um usuário com e-mail e senha. */
export async function signIn(credentials: AuthCredentials): Promise<AuthSession> {
  void credentials;
  await simulateLatency();
  // TODO(backend): chamar POST /api/auth/login e retornar { user, token }.
  throw new BackendNotConnectedError();
}

/** Registra um novo usuário. */
export async function signUp(credentials: AuthCredentials): Promise<AuthSession> {
  void credentials;
  await simulateLatency();
  // TODO(backend): chamar POST /api/auth/register e retornar { user, token }.
  throw new BackendNotConnectedError();
}

/** Solicita o envio do link de redefinição de senha. */
export async function requestPasswordReset(email: string): Promise<void> {
  void email;
  await simulateLatency();
  // TODO(backend): chamar POST /api/auth/forgot-password.
  throw new BackendNotConnectedError();
}

/** Envia uma nova senha após a redefinição. */
export async function resetPassword(token: string, newPassword: string): Promise<void> {
  void token;
  void newPassword;
  await simulateLatency();
  // TODO(backend): chamar POST /api/auth/reset-password.
  throw new BackendNotConnectedError();
}
