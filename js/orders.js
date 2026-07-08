// =====================
// PEDIDOS
// =====================

import { loadStorage, saveStorage } from "./storage.js";

import { elements } from "./selectors.js";

import { getCart, clearCart, isCartEmpty } from "./cart.js";

import { printOrder } from "./print.js";

import { parsePrice, formatPrice } from "./utils.js";

// Histórico em memória
let orders = JSON.parse(loadStorage("padaroca-orders")) || [];

// =====================
// INICIALIZAÇÃO
// =====================

// Inicializa o módulo
export function initializeOrders() {
  elements.checkoutButton.addEventListener("click", checkoutOrder);

  elements.printButton.addEventListener("click", printCurrentOrder);
}

// =====================
// CHECKOUT
// =====================

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

  saveOrder(order);

  const message = createWhatsAppMessage(order);

  sendToWhatsApp(message);

  resetCheckout();
}

// Imprime a comanda atual
function printCurrentOrder() {
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

// Gera o próximo número do pedido
function getNextOrderNumber() {
  const lastOrder = Number(loadStorage("padaroca-order-number") || 0);

  const nextOrder = lastOrder + 1;

  saveStorage("padaroca-order-number", nextOrder);

  return String(nextOrder).padStart(3, "0");
}

// =====================
// PERSISTÊNCIA
// =====================

// Salva um pedido
function saveOrder(order) {
  orders.push(order);

  saveOrders();
}

// Persiste os pedidos
function saveOrders() {
  saveStorage("padaroca-orders", JSON.stringify(orders));
}

// =====================
// WHATSAPP
// =====================

// Cria a mensagem para envio no WhatsApp
function createWhatsAppMessage(order) {
  let message = `🛒 *Pedido #${order.number}*

${order.date}

*Cliente:* ${order.customer}

`;

  order.items.forEach((item) => {
    const price = parsePrice(item.price);

    const subtotal = price * item.quantity;

    message += `${item.quantity}x ${item.name} - ${formatPrice(subtotal)}\n`;
  });

  if (order.note) {
    message += `\n📝 *Observação:* ${order.note}\n`;
  }

  message += `\n*Total: ${order.total}*`;

  return message;
}

// Envia o pedido para o WhatsApp
function sendToWhatsApp(message) {
  const phone = "5591999999999";

  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
}

// =====================
// LIMPEZA
// =====================

// Limpa o checkout após finalizar o pedido
function resetCheckout() {
  clearCart();

  elements.customerNameInput.value = "";

  elements.orderNoteInput.value = "";

  elements.cartSidebar.classList.remove("open");
}
