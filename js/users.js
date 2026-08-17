// =====================
// USUÁRIOS
// =====================

import { elements } from "./selectors.js";
import { loadStorage, saveStorage } from "./storage.js";
import { getCurrentUser } from "./auth.js";

let users = loadStorage("padaroca-users") || [];

let editingUserId = null;

initializeDefaultUser();

export function initializeUsers() {
  elements.usersButton.addEventListener("click", openUsersModal);

  elements.closeUsersButton.addEventListener("click", closeUsersModal);

  elements.usersModal.addEventListener("click", (event) => {
    if (event.target === elements.usersModal) {
      closeUsersModal();
    }
  });

  elements.newUserButton.addEventListener("click", openCreateUserModal);

  elements.closeCreateUserButton.addEventListener(
    "click",
    closeCreateUserModal,
  );

  elements.cancelUserButton.addEventListener("click", closeCreateUserModal);

  elements.saveUserButton.addEventListener("click", createUser);

  elements.createUserModal.addEventListener("click", (event) => {
    if (event.target === elements.createUserModal) {
      closeCreateUserModal();
    }
  });

  renderUsers();

  if (!isAdmin()) {
    elements.usersButton.style.display = "none";
  }
}

function initializeDefaultUser() {
  if (users.length === 0) {
    users.push({
      id: 1,
      name: "Administrador",
      username: "admin",
      password: "123456",
      role: "Administrador",
      active: true,
      createdAt: new Date().toISOString(),
    });

    saveUsers();
  }
}

function openUsersModal() {
  if (!isAdmin()) {
    return;
  }

  renderUsers();

  elements.usersModal.classList.add("open");
}

function closeUsersModal() {
  elements.usersModal.classList.remove("open");
}

function renderUsers() {
  elements.usersList.innerHTML = "";

  users.forEach((user) => {
    elements.usersList.appendChild(createUserCard(user));
  });
}

function createUserCard(user) {
  const card = document.createElement("div");

  card.className = "user-card";

  card.innerHTML = `
      <div class="user-card-header">

          <h3>${user.name}</h3>

          <span class="user-status ${user.active ? "active" : "inactive"}">
              ${user.active ? "Ativo" : "Inativo"}
          </span>

      </div>

      <p><strong>Usuário:</strong> ${user.username}</p>

      <p><strong>Cargo:</strong> ${user.role}</p>

      <div class="user-actions">

          <button class="edit-user-button">
              Editar
          </button>

          <button class="toggle-user-button">
              ${user.active ? "Desativar" : "Ativar"}
          </button>

          <button class="delete-user-button">
              Excluir
          </button>

      </div>
  `;

  const editButton = card.querySelector(".edit-user-button");
  const toggleButton = card.querySelector(".toggle-user-button");
  const deleteButton = card.querySelector(".delete-user-button");

  editButton.addEventListener("click", () => {
    editUser(user.id);
  });

  toggleButton.addEventListener("click", () => {
    toggleUser(user.id);
  });

  deleteButton.addEventListener("click", () => {
    deleteUser(user.id);
  });

  return card;
}

function editUser(id) {
  if (!isAdmin()) {
    alert("Você não possui permissão para editar usuários.");
    return;
  }

  const user = users.find((user) => user.id === id);

  if (!user) return;

  editingUserId = id;

  elements.userNameInput.value = user.name;
  elements.userUsernameInput.value = user.username;
  elements.userPasswordInput.value = user.password;
  elements.userRoleInput.value = user.role;

  elements.saveUserButton.textContent = "Atualizar";

  elements.createUserModal.classList.add("open");
}
function toggleUser(id) {
  if (!isAdmin()) {
    alert("Você não possui permissão para alterar usuários.");
    return;
  }

  const user = users.find((user) => user.id === id);

  if (!user) return;

  const currentUser = getCurrentUser();

  if (currentUser.id === user.id) {
    alert("Você não pode desativar seu próprio usuário.");
    return;
  }

  user.active = !user.active;

  refreshUsers();
}

function deleteUser(id) {
  if (!isAdmin()) {
    alert("Você não possui permissão para excluir usuários.");
    return;
  }

  const user = users.find((user) => user.id === id);

  if (!user) return;

  const confirmDelete = confirm(`Deseja excluir o usuário "${user.name}"?`);

  if (!confirmDelete) return;

  users = users.filter((user) => user.id !== id);

  refreshUsers();
}

function saveUsers() {
  saveStorage("padaroca-users", users);
}

function refreshUsers() {
  saveUsers();
  renderUsers();
}

function isAdmin() {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  return user.role === "Administrador";
}
function openCreateUserModal() {
  clearCreateUserForm();

  elements.createUserModal.classList.add("open");
}

function closeCreateUserModal() {
  clearCreateUserForm();

  elements.createUserModal.classList.remove("open");
}

function clearCreateUserForm() {
  editingUserId = null;

  elements.userNameInput.value = "";
  elements.userUsernameInput.value = "";
  elements.userPasswordInput.value = "";
  elements.userRoleInput.value = "Caixa";

  elements.saveUserButton.textContent = "Salvar";
}

function createUser() {
  const name = elements.userNameInput.value.trim();
  const username = elements.userUsernameInput.value.trim();
  const password = elements.userPasswordInput.value;
  const role = elements.userRoleInput.value;

  if (!name || !username || !password) {
    alert("Preencha todos os campos.");
    return;
  }

  if (editingUserId) {
    const user = users.find((user) => user.id === editingUserId);

    if (!user) return;

    const usernameExists = users.some(
      (u) => u.username === username && u.id !== editingUserId,
    );

    if (usernameExists) {
      alert("Este usuário já existe.");
      return;
    }

    user.name = name;
    user.username = username;
    user.password = password;
    user.role = role;

    refreshUsers();

    closeCreateUserModal();

    return;
  }

  const usernameExists = users.some((user) => user.username === username);

  if (usernameExists) {
    alert("Este usuário já existe.");
    return;
  }

  users.push({
    id: Date.now(),
    name,
    username,
    password,
    role,
    active: true,
    createdAt: new Date().toISOString(),
  });

  refreshUsers();

  closeCreateUserModal();
}
