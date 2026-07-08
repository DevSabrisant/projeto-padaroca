// =====================
// IMPORTS
// =====================
import { loadStorage, saveStorage, removeStorage } from "./storage.js";
import { elements } from "./selectors.js";
import {
  usersIcon,
  menuIcon,
  cartIcon,
  orderIcon,
  closeIcon,
  userIcon,
  calendarIcon,
  moneyIcon,
} from "./icons.js";
import "./theme.js";
import { initializeFilters } from "./filters.js";
import { initializeCart } from "./cart.js";
import { printOrder } from "./print.js";
import { initializeOrders } from "./orders.js";

initializeCart();
initializeFilters();
initializeOrders();

// =====================
// DECLARAÇÃO DE VARIÁVEIS
// =====================

// Histórico de pedidos
let orders = JSON.parse(loadStorage("padaroca-orders")) || [];

// =====================
// FUNÇÕES
// =====================

// ===========
// PERSISTENCIA
// ===========

function saveOrders() {
  saveStorage("padaroca-orders", JSON.stringify(orders));
}

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

  elements.historyItemsContainer.innerHTML = historyHTML;

  document.querySelectorAll(".view-order-button").forEach((button) => {
    button.addEventListener("click", () => {
      showOrderDetails(button.dataset.order);
    });
  });
}

function showOrderDetails(orderNumber) {
  const order = orders.find((order) => order.number === orderNumber);

  if (!order) return;

  elements.orderModal.classList.add("open");

  const deleteButton = document.querySelector(".delete-order-button");

  deleteButton.addEventListener("click", () => {
    deleteOrder(order.number);
  });
}

function deleteOrder(orderNumber) {
  const confirmed = confirm(
    `Deseja realmente excluir o pedido #${orderNumber}?`,
  );

  if (!confirmed) return;

  orders = orders.filter((order) => order.number !== orderNumber);

  saveOrders();

  renderOrders();

  elements.orderModal.classList.remove("open");
}

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

// elements.printButton.addEventListener("click", printOrder);

elements.checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");

    return;
  }

  const customerName = elements.customerNameInput.value.trim();

  const orderNote = elements.orderNoteInput.value.trim();

  if (!customerName) {
    alert("Informe o nome do cliente.");

    return;
  }

  const orderNumber = getNextOrderNumber();

  const orderDate = new Date().toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const order = {
    number: orderNumber,

    date: orderDate,

    customer: customerName,

    note: orderNote,

    total: elements.totalPrice.textContent,

    items: [...cart],
  };

  let message = `🛒 *Pedido #${orderNumber}*

 ${orderDate}

 *Cliente:* ${customerName}

`;

  cart.forEach((item) => {
    const price = Number(item.price.replace("R$", "").replace(",", ".").trim());

    const subtotal = price * item.quantity;

    message += `${item.quantity}x ${item.name} - R$ ${subtotal.toFixed(2).replace(".", ",")}\n`;
  });

  if (orderNote) {
    message += `\n📝 *Observação:* ${orderNote}\n`;
  }

  message += `\n *Total: ${elements.totalPrice.textContent}*`;

  orders.push(order);

  saveOrders();

  renderOrders();

  const phone = "5591999999999";

  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");

  // Limpa o carrinho após o envio para o WhatsApp

  cart.length = 0;

  // Limpa os campos

  elements.customerNameInput.value = "";

  elements.orderNoteInput.value = "";

  // Remove os dados salvos no navegador

  removeStorage("padaroca-cart");

  // Atualiza a interface
  updateCart();
});

// =====================
// ÍCONES
// =====================
console.log("Entrou na seção de ícones");
console.log(elements.usersButton);
console.log(usersIcon);
// Insere os ícones
elements.usersButton.innerHTML = usersIcon;

elements.menuButton.innerHTML = menuIcon;

elements.cartButton.insertAdjacentHTML("afterbegin", cartIcon);

elements.historyButton.insertAdjacentHTML("afterbegin", orderIcon);

// Botões de fechar
elements.closeCartButton.innerHTML = closeIcon;

elements.closeHistoryButton.innerHTML = closeIcon;

elements.closeOrderModalButton.innerHTML = closeIcon;

// =====================
// INICIALIZAÇÃO
// =====================

renderOrders();

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
