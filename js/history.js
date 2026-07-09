// =====================
// HISTÓRICO
// =====================

import { loadStorage, saveStorage } from "./storage.js";

import { elements } from "./selectors.js";

import { parsePrice, formatPrice } from "./utils.js";

// Histórico em memória
let orders = JSON.parse(loadStorage("padaroca-orders")) || [];

// =====================
// INICIALIZAÇÃO
// =====================

export function initializeHistory() {
  refreshOrders();

  renderOrders();
}

// Atualiza a lista de pedidos
function refreshOrders() {
  orders = JSON.parse(loadStorage("padaroca-orders")) || [];
}

// =====================
// DETALHES DO PEDIDO
// =====================

// Renderiza os detalhes do pedido
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

      <span class="label">Cliente</span>

      <p>${order.customer}</p>

    </div>

    <div class="order-details-section">

      <span class="label">Data</span>

      <p>${order.date}</p>

    </div>

    ${
      order.note
        ? `
        <div class="order-details-section">

          <span class="label">Observação</span>

          <p>${order.note}</p>

        </div>
      `
        : ""
    }

    <div class="order-details-section">

      <span class="label">Itens</span>

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

// Exibe os detalhes
function showOrderDetails(orderNumber) {
  refreshOrders();

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

  saveStorage("padaroca-orders", JSON.stringify(orders));

  renderOrders();

  elements.orderModal.classList.remove("open");
}

// =====================
// HISTÓRICO
// =====================

// Renderiza o histórico
function renderOrders() {
  refreshOrders();

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
