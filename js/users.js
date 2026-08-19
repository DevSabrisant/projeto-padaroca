// =====================
// USUÁRIOS
// =====================

import { elements } from "./selectors.js";
import { loadStorage, saveStorage } from "./storage.js";
import { getCurrentUser } from "./auth.js";
import { isValidEmail } from "./utils.js";

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

  // Modal de edição
  elements.closeEditUserButton.addEventListener("click", closeEditUserModal);

  elements.cancelEditUserButton.addEventListener("click", closeEditUserModal);

  elements.updateUserButton.addEventListener("click", updateUser);

  elements.editUserModal.addEventListener("click", (event) => {
    if (event.target === elements.editUserModal) {
      closeEditUserModal();
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

      email: "",
      phone: "",

      address: {
        street: "",
        number: "",
        zip: "",
        neighborhood: "",
        city: "",
      },

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

  if (!user) {
    return;
  }

  const currentUser = getCurrentUser();

  if (currentUser && currentUser.id === user.id) {
    alert("Para editar seus próprios dados, acesse Meu Perfil.");
    return;
  }

  closeCreateUserModal();

  editingUserId = id;

  // Dados da conta
  elements.editUserNameInput.value = user.name || "";
  elements.editUserUsernameInput.value = user.username || "";
  elements.editUserPasswordInput.value = "";
  elements.editUserRoleInput.value = user.role || "Caixa";

  // Dados pessoais
  elements.editUserEmailInput.value = user.email || "";
  elements.editUserPhoneInput.value = user.phone || "";

  // Endereço
  elements.editUserAddressInput.value = user.address?.street || "";

  elements.editUserNumberInput.value = user.address?.number || "";

  elements.editUserZipInput.value = user.address?.zip || "";

  elements.editUserNeighborhoodInput.value = user.address?.neighborhood || "";

  elements.editUserCityInput.value = user.address?.city || "";

  // Abre o modal de edição
  elements.editUserModal.classList.add("open");
}

function updateUser() {
  if (!isAdmin()) {
    alert("Você não possui permissão para editar usuários.");
    return;
  }

  if (!editingUserId) {
    return;
  }

  const user = users.find((user) => user.id === editingUserId);

  if (!user) {
    alert("Usuário não encontrado.");
    return;
  }

  // =====================
  // DADOS DA CONTA
  // =====================

  const name = elements.editUserNameInput.value.trim();
  const username = elements.editUserUsernameInput.value.trim();
  const password = elements.editUserPasswordInput.value;
  const role = elements.editUserRoleInput.value;

  // =====================
  // DADOS PESSOAIS
  // =====================

  const email = elements.editUserEmailInput.value.trim();
  const phone = elements.editUserPhoneInput.value.trim();

  // =====================
  // ENDEREÇO
  // =====================

  const street = elements.editUserAddressInput.value.trim();
  const number = elements.editUserNumberInput.value.trim();
  const zip = elements.editUserZipInput.value.trim();
  const neighborhood = elements.editUserNeighborhoodInput.value.trim();
  const city = elements.editUserCityInput.value.trim();

  // =====================
  // VALIDAÇÕES
  // =====================

  if (!name || !username) {
    alert("Preencha nome e usuário.");
    return;
  }

  if (email && !isValidEmail(email)) {
    alert("Informe um e-mail válido.");
    return;
  }

  const usernameExists = users.some(
    (existingUser) =>
      existingUser.username === username && existingUser.id !== editingUserId,
  );

  // =====================
  // ATUALIZA DADOS DA CONTA
  // =====================

  user.name = name;
  user.username = username;
  user.role = role;

  // =====================
  // ATUALIZA DADOS PESSOAIS
  // =====================

  user.email = email;
  user.phone = phone;

  // =====================
  // ATUALIZA ENDEREÇO
  // =====================

  user.address = {
    street,
    number,
    zip,
    neighborhood,
    city,
  };

  // =====================
  // ATUALIZA SENHA
  // =====================

  if (password) {
    user.password = password;
  }

  // =====================
  // SALVA E ATUALIZA
  // =====================

  refreshUsers();

  closeEditUserModal();
}

function toggleUser(id) {
  if (!isAdmin()) {
    alert("Você não possui permissão para alterar usuários.");
    return;
  }

  const user = users.find((user) => user.id === id);

  if (!user) return;

  const currentUser = getCurrentUser();

  if (currentUser && currentUser.id === user.id) {
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

  const currentUser = getCurrentUser();

  if (currentUser && currentUser.id === user.id) {
    alert("Você não pode excluir seu próprio usuário.");
    return;
  }

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
  if (!isAdmin()) {
    return;
  }

  closeEditUserModal();
  clearCreateUserForm();

  elements.createUserModal.classList.add("open");
}

function closeCreateUserModal() {
  clearCreateUserForm();

  elements.createUserModal.classList.remove("open");
}

function closeEditUserModal() {
  elements.editUserModal.classList.remove("open");

  editingUserId = null;
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
  if (!isAdmin()) {
    alert("Você não possui permissão para gerenciar usuários.");
    return;
  }

  const name = elements.userNameInput.value.trim();
  const username = elements.userUsernameInput.value.trim();
  const password = elements.userPasswordInput.value;
  const role = elements.userRoleInput.value;

  if (!name || !username) {
    alert("Preencha nome e usuário.");
    return;
  }

  if (!password) {
    alert("Informe uma senha para o novo usuário.");
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

    email: "",
    phone: "",

    address: {
      street: "",
      number: "",
      zip: "",
      neighborhood: "",
      city: "",
    },

    active: true,
    createdAt: new Date().toISOString(),
  });

  refreshUsers();

  closeCreateUserModal();
}
