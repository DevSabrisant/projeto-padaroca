// =====================
// IMPORTS
// =====================
import { elements } from "./selectors.js";
import "./theme.js";
import { initializeFilters } from "./filters.js";
import { initializeCart } from "./cart.js";
import { initializeOrders } from "./orders.js";
import { usersIcon, cartIcon, orderIcon, closeIcon } from "./icons.js";
import { initializeUsers } from "./users.js";

initializeCart();
initializeFilters();
initializeOrders();
initializeUsers();

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
