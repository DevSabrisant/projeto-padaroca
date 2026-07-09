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

  renderOrders();
}

function renderOrderDetails(order) {
  let itemsHTML = "";

  order.items.forEach((item) => {
    const price = parsePrice(item.price);

    const subtotal = price * item.quantity;

    itemsHTML += `
      <li>
        <strong>${item.quantity}x</strong>
        ${item.name}
        <span style="float:right">
          ${formatPrice(subtotal)}
        </span>
      </li>
    `;
  });

  elements.orderDetails.innerHTML = `
    <div class="order-details-header">

      <h2>Pedido #${order.number}</h2>

    </div>

    <div class="order-details-section">

      <span class="label">
        Cliente
      </span>

      <p>${order.customer}</p>

    </div>

    <div class="order-details-section">

      <span class="label">
        Data
      </span>

      <p>${order.date}</p>

    </div>

    ${
      order.note
        ? `
        <div class="order-details-section">

          <span class="label">
            Observação
          </span>

          <p>${order.note}</p>

        </div>
      `
        : ""
    }

    <div class="order-details-section">

      <span class="label">
        Itens
      </span>

      <ul class="order-items-list">

        ${itemsHTML}

      </ul>

    </div>

    <div class="order-total">

      Total: ${order.total}

    </div>

    <button class="delete-order-button">

      Excluir Pedido

    </button>
  `;
}

// Exibe os detalhes de um pedido
function showOrderDetails(orderNumber) {
  const order = orders.find((order) => order.number === orderNumber);

  if (!order) {
    return;
  }

  renderOrderDetails(order);

  elements.orderModal.classList.add("open");

  const deleteButton = document.querySelector(".delete-order-button");

  if (deleteButton) {
    deleteButton.onclick = () => {
      deleteOrder(order.number);
    };
  }
}
// Exclui um pedido
function deleteOrder(orderNumber) {
  const confirmed = confirm(
    `Deseja realmente excluir o pedido #${orderNumber}?`,
  );

  if (!confirmed) {
    return;
  }

  orders = orders.filter((order) => order.number !== orderNumber);

  saveOrders();

  renderOrders();

  elements.orderModal.classList.remove("open");
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

  renderOrders();
}

// Persiste os pedidos
function saveOrders() {
  saveStorage("padaroca-orders", JSON.stringify(orders));
}

// Renderiza o histórico de pedidos
function renderOrders() {
  elements.historyItemsContainer.innerHTML = "";

  if (orders.length === 0) {
    elements.historyItemsContainer.innerHTML = `
      <div class="empty-history">
        Nenhum pedido encontrado.
      </div>
    `;

    return;
  }

  let historyHTML = "";

  orders
    .slice()
    .reverse()
    .forEach((order) => {
      historyHTML += `
        <div class="history-item">

          <h4 class="history-info">
            Pedido #${order.number}
          </h4>

          <p class="history-info">
            ${order.customer}
          </p>

          <p class="history-info">
            ${order.date}
          </p>

          <p class="history-info">
            ${order.total}
          </p>

          <button
            class="view-order-button"
            data-order="${order.number}"
          >
            Ver detalhes
          </button>

        </div>
      `;
    });

  elements.historyItemsContainer.innerHTML = historyHTML;

  document.querySelectorAll(".view-order-button").forEach((button) => {
    button.addEventListener("click", () => {
      showOrderDetails(button.dataset.order);
    });
  });
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
