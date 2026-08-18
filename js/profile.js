// =====================
// PERFIL DO USUÁRIO
// =====================

import { getCurrentUser, isAuthenticated } from "./auth.js";

import { loadStorage, saveStorage } from "./storage.js";

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

const profileDataUsername = document.querySelector(".profile-data-username");

const profileDataRole = document.querySelector(".profile-data-role");

const profileNameInput = document.querySelector(".profile-name-input");

const profileEmailInput = document.querySelector(".profile-email-input");

const profilePhoneInput = document.querySelector(".profile-phone-input");

const profileLoginInput = document.querySelector(".profile-login-input");

const profilePasswordInput = document.querySelector(".profile-password-input");

const profileAddressInput = document.querySelector(".profile-address-input");

const profileNumberInput = document.querySelector(".profile-number-input");

const profileZipInput = document.querySelector(".profile-zip-input");

const profileNeighborhoodInput = document.querySelector(
  ".profile-neighborhood-input",
);

const profileCityInput = document.querySelector(".profile-city-input");

const profileError = document.querySelector(".profile-error");

const profileSuccess = document.querySelector(".profile-success");

const backButton = document.querySelector(".back-profile-button");

const cancelButton = document.querySelector(".cancel-profile-button");

const saveButton = document.querySelector(".save-profile-button");

// =====================
// USUÁRIO ATUAL
// =====================

let currentUser = null;

// =====================
// TEMA
// =====================

function initializeTheme() {
  const savedTheme = localStorage.getItem("padaroca-theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

// =====================
// MENSAGENS
// =====================

function clearMessages() {
  profileError.textContent = "";
  profileSuccess.textContent = "";
}

// =====================
// IDENTIDADE
// =====================

function renderIdentity(user) {
  const firstLetter = user.name?.charAt(0).toUpperCase() || "?";

  profileAvatar.textContent = firstLetter;

  profileName.textContent = user.name || "Usuário";

  profileUsername.textContent = `@${user.username}`;

  profileRole.textContent = user.role;

  profileDataUsername.textContent = user.username;

  profileDataRole.textContent = user.role;
}

// =====================
// FORMULÁRIO
// =====================

function renderForm(user) {
  profileNameInput.value = user.name || "";

  profileLoginInput.value = user.username || "";

  profileEmailInput.value = user.email || "";

  profilePhoneInput.value = user.phone || "";

  profileAddressInput.value = user.address?.street || "";

  profileNumberInput.value = user.address?.number || "";

  profileZipInput.value = user.address?.zip || "";

  profileNeighborhoodInput.value = user.address?.neighborhood || "";

  profileCityInput.value = user.address?.city || "";
}

// =====================
// CARREGAR PERFIL
// =====================

function initializeProfile() {
  currentUser = getCurrentUser();

  if (!currentUser) {
    return;
  }

  const users = loadStorage("padaroca-users") || [];

  const storedUser = users.find((user) => user.id === currentUser.id);

  const user = storedUser || currentUser;

  if (user.role === "Administrador") {
    profileLoginInput.closest(".profile-field").style.display = "";
    profilePasswordInput.closest(".profile-field").style.display = "";
  } else {
    profileLoginInput.closest(".profile-field").style.display = "none";
    profilePasswordInput.closest(".profile-field").style.display = "none";
  }

  renderIdentity(user);

  renderForm(user);
}

// =====================
// SALVAR PERFIL
// =====================

function saveProfile() {
  clearMessages();

  const name = profileNameInput.value.trim();

  const email = profileEmailInput.value.trim();

  const phone = profilePhoneInput.value.trim();

  const street = profileAddressInput.value.trim();

  const number = profileNumberInput.value.trim();

  const zip = profileZipInput.value.trim();

  const neighborhood = profileNeighborhoodInput.value.trim();

  const city = profileCityInput.value.trim();

  if (!name) {
    profileError.textContent = "Informe seu nome completo.";

    return;
  }

  const users = loadStorage("padaroca-users") || [];

  const userIndex = users.findIndex((user) => user.id === currentUser.id);

  if (userIndex === -1) {
    profileError.textContent = "Usuário não encontrado.";

    return;
  }

  const user = users[userIndex];

  user.name = name;

  user.email = email;

  user.phone = phone;

  user.address = {
    street,
    number,
    zip,
    neighborhood,
    city,
  };

  saveStorage("padaroca-users", users);

  saveStorage("padaroca-current-user", {
    ...currentUser,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  });

  currentUser = {
    ...currentUser,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };

  renderIdentity(user);

  profileSuccess.textContent = "Alterações salvas com sucesso.";

  setTimeout(() => {
    profileSuccess.textContent = "";
  }, 3000);
}
// =====================
// CANCELAR
// =====================

function cancelChanges() {
  clearMessages();

  const users = loadStorage("padaroca-users") || [];

  const user = users.find((user) => user.id === currentUser.id);

  if (!user) {
    return;
  }

  renderForm(user);
}

// =====================
// VOLTAR
// =====================

function goBack() {
  window.location.href = "index.html";
}

// =====================
// EVENTOS
// =====================

backButton.addEventListener("click", goBack);

cancelButton.addEventListener("click", cancelChanges);

saveButton.addEventListener("click", saveProfile);

// =====================
// INICIALIZAÇÃO
// =====================

initializeTheme();

initializeProfile();
