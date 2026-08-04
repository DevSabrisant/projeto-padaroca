// =====================
// LOGIN
// =====================

import { login } from "./auth.js";

const usernameInput = document.querySelector(".login-username-input");

const passwordInput = document.querySelector(".login-password-input");

const loginButton = document.querySelector(".login-button");

const errorText = document.querySelector(".login-error");

initializeLogin();

function initializeLogin() {
  loginButton.addEventListener("click", handleLogin);
}

function handleLogin() {
  clearError();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    showError("Preencha usuário e senha.");

    return;
  }
  console.log({
    username,
    password,
  });
}

function showError(message) {
  errorText.textContent = message;
}
function clearError() {
  errorText.textContent = "";
}
