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

// =====================
// DECLARAÇÃO DE VARIÁVEIS
// =====================

// Carrinho em memória
const cart = [];

// Histórico de pedidos
let orders = JSON.parse(loadStorage("padaroca-orders")) || [];

// =====================
// FUNÇÕES
// =====================

// Atualiza a visibilidade das categorias
function updateCategories() {
  elements.categories.forEach((category) => {
    const visibleProducts = category.querySelectorAll(
      '.product-card:not([style*="display: none"])',
    );

    category.style.display = visibleProducts.length > 0 ? "block" : "none";
  });
}

// Atualiza os itens e o total do carrinho
function updateCart() {
  // Limpa o conteúdo atual do carrinho
  elements.cartItemsContainer.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  // Exibe mensagem se o carrinho estiver vazio
  if (cart.length === 0) {
    elements.cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                Seu carrinho está vazio.
            </div>
        `;

    elements.cartCount.textContent = "0";
    elements.totalPrice.textContent = "R$ 0,00";

    return;
  }

  // Cria os itens do carrinho
  cart.forEach((item) => {
    const cartItem = document.createElement("div");

    cartItem.classList.add("cart-item");

    const price = Number(item.price.replace("R$", "").replace(",", ".").trim());

    const subtotal = price * item.quantity;

    cartItem.innerHTML = `
    <div class="cart-item-header">

        <h4>${item.name}</h4>

        <p class="cart-item-subtotal">
            R$ ${subtotal.toFixed(2).replace(".", ",")}
        </p>

    </div>

    <div class="cart-item-footer">

        <div class="cart-item-controls">

            <button class="decrease-btn">-</button>

            <span>${item.quantity}</span>

            <button class="increase-btn">+</button>

        </div>

        <small>${item.price} cada</small>

    </div>
`;

    elements.cartItemsContainer.appendChild(cartItem);

    // Seleciona os botões + e -
    const increaseButton = cartItem.querySelector(".increase-btn");

    const decreaseButton = cartItem.querySelector(".decrease-btn");

    // Aumenta a quantidade
    increaseButton.addEventListener("click", () => {
      item.quantity++;
      saveCart();
      updateCart();
    });

    // Diminui a quantidade
    decreaseButton.addEventListener("click", () => {
      item.quantity--;

      if (item.quantity === 0) {
        const itemIndex = cart.findIndex(
          (cartItem) => cartItem.name === item.name,
        );

        cart.splice(itemIndex, 1);
      }
      saveCart();
      updateCart();
    });

    total += subtotal;

    totalItems += item.quantity;
  });

  // Atualiza contador e total

  elements.cartCount.textContent = totalItems;

  elements.totalPrice.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
}

// ===========
// PERSISTENCIA
// ===========
function saveCart() {
  saveStorage("padaroca-cart", JSON.stringify(cart));
}

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

  orders
    .slice()
    .reverse()
    .forEach((order) => {
      historyHTML += `
        <div class="history-item">

          <h4 class="history-info">
            ${orderIcon}
            Pedido #${order.number}
          </h4>

          <p class="history-info">
            ${userIcon}
            ${order.customer}
          </p>

          <p class="history-info">
            ${calendarIcon}
            ${order.date}
          </p>

          <p class="history-info">
            ${moneyIcon}
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

function showOrderDetails(orderNumber) {
  const order = orders.find((order) => order.number === orderNumber);

  if (!order) return;

  let itemsHtml = "";

  order.items.forEach((item) => {
    itemsHtml += `
      <li>
        ${item.quantity}x ${item.name}
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

    <div class="order-details-section">

        <span class="label">Itens</span>

        <ul class="order-items-list">

            ${itemsHtml}

        </ul>

    </div>

    <div class="order-details-section">

        <span class="label">Observação</span>

        <p>${order.note || "Nenhuma"}</p>

    </div>

    <div class="order-total">

        Total: ${order.total}

    </div>

    <button
        class="delete-order-button"
        data-order="${order.number}">

        Excluir pedido

    </button>

`;

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
// FILTROS
// =====================

elements.filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    elements.filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filter = button.dataset.filter;

    elements.products.forEach((product) => {
      const category = product.dataset.category;

      product.style.display =
        filter === "all" || filter === category ? "flex" : "none";
    });

    updateCategories();
  });
});

// =====================
// BARRA DE PESQUISA
// =====================

elements.searchInput.addEventListener("input", () => {
  const searchTerms = elements.searchInput.value
    .toLowerCase()
    .trim()
    .split(" ");

  elements.products.forEach((product) => {
    const productName = product.querySelector("h4").textContent.toLowerCase();

    const match = searchTerms.every((term) => productName.includes(term));

    product.style.display = match ? "flex" : "none";
  });

  updateCategories();
});

// =====================
// CARRINHO
// =====================

elements.addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".product-card");

    const productName = product.querySelector("h4").textContent;

    const productPrice = product.querySelector(".price").textContent;

    const existingItem = cart.find((item) => item.name === productName);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        quantity: 1,
      });
    }

    saveCart();
    updateCart();
  });
});

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

// =====================
// TEMA DA PÁGINA
// =====================

// =====================
// FINALIZAR PEDIDO
// =====================

// Gerar o numero do pedido
function getNextOrderNumber() {
  const lastOrder = Number(loadStorage("padaroca-order-number") || 0);

  const nextOrder = lastOrder + 1;

  saveStorage("padaroca-order-number", nextOrder);

  return String(nextOrder).padStart(3, "0");
}

// Função p/ imprimir comanda

function printOrder() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");

    return;
  }

  const customerName =
    elements.customerNameInput.value.trim() || "Não informado";

  const orderNote = elements.orderNoteInput.value.trim();

  const orderNumber = getNextOrderNumber();

  const orderDate = new Date().toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

  let items = "";

  cart.forEach((item) => {
    const price = Number(item.price.replace("R$", "").replace(",", ".").trim());

    const subtotal = price * item.quantity;

    items += `
            <tr>
                <td>${item.quantity}x</td>
                <td>${item.name}</td>
                <td>R$ ${subtotal.toFixed(2).replace(".", ",")}</td>
            </tr>
        `;
  });

  // COMANDA

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Permita pop-ups para imprimir a comanda.");

    return;
  }

  printWindow.document.write(`
        <!DOCTYPE html>

        <html lang="pt-BR">

            <head>

                <meta charset="UTF-8">

                <title>Comanda Padaroca</title>

                <style>

                    body {
                        font-family: Arial, sans-serif;
                        padding: 24px;
                        color: #333;
                    }

                    h1 {
                        text-align: center;
                        color: #8B4513;
                        margin-bottom: 24px;
                    }

                    p {
                        margin-bottom: 8px;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }

                    td {
                        padding: 10px 0;
                        border-bottom: 1px dashed #ccc;
                    }

                    td:last-child {
                        text-align: right;
                    }

                    .total {
                        margin-top: 20px;
                        font-size: 1.2rem;
                        font-weight: 700;
                        text-align: right;
                    }

                </style>

            </head>

            <body>

                <h1>☕ Padaroca</h1>

                <p><strong>Pedido:</strong> #${orderNumber}</p>

                <p><strong>Data:</strong> ${orderDate}</p>

                <p><strong>Cliente:</strong> ${customerName}</p>

                <table>

                    ${items}

                </table>

                ${
                  orderNote
                    ? `<p><strong>Observação:</strong> ${orderNote}</p>`
                    : ""
                }

                <p class="total">

                    Total: ${elements.totalPrice.textContent}

                </p>

            </body>

        </html>
    `);

  printWindow.document.close();

  printWindow.onload = () => {
    printWindow.focus();

    printWindow.print();
  };

  printWindow.onafterprint = () => {
    printWindow.close();
  };
}

elements.printButton.addEventListener("click", printOrder);

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

const savedCart = loadStorage("padaroca-cart");

if (savedCart) {
  cart.push(...JSON.parse(savedCart));
}

updateCart();
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
