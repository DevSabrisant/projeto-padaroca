// =====================
// IMPORTS
// =====================
import { isAuthenticated, getCurrentUser, logout } from "./auth.js";
import { elements } from "./selectors.js";
import "./theme.js";
import { initializeFilters } from "./filters.js";
import { initializeCart } from "./cart.js";
import { initializeOrders } from "./orders.js";
import { usersIcon, cartIcon, orderIcon, closeIcon } from "./icons.js";
import { initializeUsers } from "./users.js";

// =====================
// AUTENTICAÇÃO
// =====================

if (!isAuthenticated()) {
  window.location.href = "login.html";
}

// =====================
// INICIALIZAÇÕES
// =====================

initializeCart();
initializeFilters();
initializeOrders();
initializeUsers();
initializeCurrentUser();

// =====================
// HISTORICO DE PEDIDOS
// =====================
elements.historyButton.addEventListener("click", () => {
  elements.cartSidebar.classList.remove("open");

  elements.historySidebar.classList.add("open");
});

elements.closeHistoryButton.addEventListener("click", () => {
  elements.historySidebar.classList.remove("open");
});

elements.closeOrderModalButton.addEventListener("click", () => {
  elements.orderModal.classList.remove("open");
});

// Fecha o modal de histórico de pedidos clicando fora do modal
elements.orderModal.addEventListener("click", (event) => {
  if (event.target === elements.orderModal) {
    elements.orderModal.classList.remove("open");
  }
});

// Insere os ícones
elements.usersButton.innerHTML = usersIcon;

elements.cartButton.insertAdjacentHTML("afterbegin", cartIcon);

elements.historyButton.insertAdjacentHTML("afterbegin", orderIcon);

// Botões de fechar
elements.closeCartButton.innerHTML = closeIcon;

elements.closeHistoryButton.innerHTML = closeIcon;

elements.closeOrderModalButton.innerHTML = closeIcon;

elements.closeUsersButton.innerHTML = closeIcon;

elements.closeCreateUserButton.innerHTML = closeIcon;

elements.closeEditUserButton.innerHTML = closeIcon;

// =====================
// ABRIR E FECHAR CARRINHO
// =====================

elements.cartButton.addEventListener("click", () => {
  elements.historySidebar.classList.remove("open");

  elements.cartSidebar.classList.add("open");
});

elements.closeCartButton.addEventListener("click", () => {
  elements.cartSidebar.classList.remove("open");
});

// Usuários
function initializeCurrentUser() {
  const user = getCurrentUser();

  if (!user) {
    return;
  }

  elements.currentUserName.textContent = user.name;
  elements.currentUserRole.textContent = user.role;

  elements.dropdownUserName.textContent = user.name;
  elements.dropdownUserRole.textContent = user.role;

  elements.userAvatar.textContent = user.name.charAt(0).toUpperCase();
}

// =====================
// MENU DO USUÁRIO
// =====================

elements.userAvatar.addEventListener("click", (event) => {
  event.stopPropagation();

  elements.userDropdown.classList.toggle("open");
});

document.addEventListener("click", (event) => {
  if (!elements.userMenu.contains(event.target)) {
    elements.userDropdown.classList.remove("open");
  }
});

// =====================
// LOGOUT
// =====================

elements.logoutButton.addEventListener("click", () => {
  logout();

  window.location.href = "login.html";
});

// =====================
// MEU PERFIL
// =====================

elements.profileButton.addEventListener("click", () => {
  elements.userDropdown.classList.remove("open");

  window.location.href = "profile.html";
});
