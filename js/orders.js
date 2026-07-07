// =====================
// PEDIDOS
// =====================

import { loadStorage, saveStorage, removeStorage } from "./storage.js";

import { elements } from "./selectors.js";

import { getCart, clearCart, isCartEmpty } from "./cart.js";

import { printOrder } from "./print.js";

// Histórico em memória
let orders = JSON.parse(loadStorage("padaroca-orders")) || [];

// Inicializa o módulo
export function initializeOrders() {
  elements.checkoutButton.addEventListener("click", checkoutOrder);
}

// Finaliza um pedido
function checkoutOrder() {
  if (isCartEmpty()) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const order = createOrder();

  if (!order) {
    return;
  }
  printOrder(order);
}

// Cria um pedido
function createOrder() {
  const customerName = elements.customerNameInput.value.trim();

  const orderNote = elements.orderNoteInput.value.trim();

  if (!customerName) {
    alert("Informe o nome do cliente.");
    return null;
  }

  const orderNumber = getNextOrderNumber();

  const orderDate = new Date().toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  return {
    number: orderNumber,
    date: orderDate,
    customer: customerName,
    note: orderNote,
    total: elements.totalPrice.textContent,
    items: getCart(),
  };
}

function getNextOrderNumber() {
  const lastOrder = Number(loadStorage("padaroca-order-number") || 0);

  const nextOrder = lastOrder + 1;

  saveStorage("padaroca-order-number", nextOrder);

  return String(nextOrder).padStart(3, "0");
}
