// =====================
// USUÁRIOS
// =====================

import { elements } from "./selectors.js";
import { loadStorage, saveStorage } from "./storage.js";

let users = loadStorage("padaroca-users") || [];

let currentUser = {
  id: 1,
  name: "Administrador",
  role: "Administrador",
};

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
    elements.newUserButton.style.display = "none";
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
  elements.usersModal.classList.add("open");
}

function closeUsersModal() {
  elements.usersModal.classList.remove("open");
}

function renderUsers() {
  elements.usersList.innerHTML = "";

  users.forEach((user) => {
    const card = createUserCard(user);
    elements.usersList.appendChild(card);
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

  const deleteButton = card.querySelector(".delete-user-button");

  deleteButton.addEventListener("click", () => {
    deleteUser(user.id);
  });

  return card;
}

function deleteUser(id) {
  const user = users.find((user) => user.id === id);

  if (!user) {
    return;
  }

  if (user.role === "Administrador") {
    alert("O administrador principal não pode ser excluído.");
    return;
  }

  if (!confirm("Deseja realmente excluir este usuário?")) {
    return;
  }

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
  return currentUser.role === "Administrador";
}

function openCreateUserModal() {
  clearCreateUserForm();

  elements.createUserModal.classList.add("open");
}

function closeCreateUserModal() {
  elements.createUserModal.classList.remove("open");
}

function clearCreateUserForm() {
  elements.userNameInput.value = "";
  elements.userUsernameInput.value = "";
  elements.userPasswordInput.value = "";
  elements.userRoleInput.value = "Caixa";
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

  const userExists = users.some((user) => user.username === username);

  if (userExists) {
    alert("Este usuário já existe.");
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    username,
    password,
    role,
    active: true,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  refreshUsers();

  clearCreateUserForm();

  closeCreateUserModal();
}
