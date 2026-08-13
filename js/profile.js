// =====================
// PERFIL DO USUÁRIO
// =====================

import { getCurrentUser, isAuthenticated } from "./auth.js";

// =====================
// AUTENTICAÇÃO
// =====================

if (!isAuthenticated()) {
  window.location.href = "login.html";
}

// =====================
// ELEMENTOS
// =====================

const profileAvatar = document.querySelector(".profile-avatar");

const profileName = document.querySelector(".profile-name");

const profileUsername = document.querySelector(".profile-username");

const profileRole = document.querySelector(".profile-role");

const profileDataName = document.querySelector(".profile-data-name");

const profileDataUsername = document.querySelector(".profile-data-username");

const profileDataRole = document.querySelector(".profile-data-role");

const profileDataEmail = document.querySelector(".profile-data-email");

const backButton = document.querySelector(".back-profile-button");

// =====================
// PREENCHER PERFIL
// =====================

function initializeProfile() {
  const user = getCurrentUser();

  if (!user) {
    return;
  }

  profileAvatar.textContent = user.name.charAt(0).toUpperCase();

  profileName.textContent = user.name;

  profileUsername.textContent = `@${user.username}`;

  profileRole.textContent = user.role;

  profileDataName.textContent = user.name;

  profileDataUsername.textContent = user.username;

  profileDataRole.textContent = user.role;

  profileDataEmail.textContent = user.email || "Não cadastrado";
}

// =====================
// VOLTAR
// =====================

backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

// =====================
// INICIALIZAÇÃO
// =====================

initializeProfile();
