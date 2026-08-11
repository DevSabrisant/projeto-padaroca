// =====================
// AUTENTICAÇÃO
// =====================

import { loadStorage, saveStorage } from "./storage.js";

const USERS_KEY = "padaroca-users";
const CURRENT_USER_KEY = "padaroca-current-user";

/**
 * Realiza o login.
 * Retorna um objeto contando:
 * {
 *   success: boolean,
 *   message: string,
 *   user: object | null
 * }
 */
export function login(username, password) {
  const users = loadStorage(USERS_KEY) || [];

  const user = users.find((user) => user.username === username);

  if (!user) {
    return {
      success: false,
      message: "Usuário não encontrado.",
      user: null,
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message: "Senha incorreta.",
      user: null,
    };
  }

  if (!user.active) {
    return {
      success: false,
      message: "Usuário desativado.",
      user: null,
    };
  }

  saveStorage(CURRENT_USER_KEY, {
    id: user.id,
    name: user.name,
    username: user.username,
    role: user.role,
  });

  return {
    success: true,
    message: "Login realizado com sucesso.",
    user,
  };
}

/**
 * Encerra a sessão.
 */
export function logout() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

/**
 * Retorna o usuário logado.
 */
export function getCurrentUser() {
  return loadStorage(CURRENT_USER_KEY);
}

/**
 * Verifica se existe um usuário autenticado.
 */
export function isAuthenticated() {
  return getCurrentUser() !== null;
}

/**
 * Verifica se o usuário possui uma determinada permissão.
 */
export function hasPermission(role) {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  return user.role === role;
}
