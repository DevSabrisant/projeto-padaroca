// =====================
// DASHBOARD
// =====================

import { loadStorage } from "./storage.js";
import { formatPrice } from "./utils.js";

// =====================
// INICIALIZAÇÃO
// =====================

export function initializeDashboard() {
  renderDashboard();
}

// =====================
// RENDERIZAÇÃO
// =====================

function renderDashboard() {
  const orders = loadStorage("padaroca-orders") || [];

  const ordersCount = document.querySelector(".dashboard-orders-count");
  const revenue = document.querySelector(".dashboard-revenue");
  const averageTicket = document.querySelector(".dashboard-average-ticket");
  const productsSold = document.querySelector(".dashboard-products-sold");

  if (!ordersCount || !revenue || !averageTicket || !productsSold) {
    return;
  }

  // =====================
  // INDICADORES
  // =====================

  const totalOrders = orders.length;

  const totalRevenue = orders.reduce((total, order) => {
    const orderTotal = Number(
      order.total.replace("R$", "").replace(/\./g, "").replace(",", ".").trim(),
    );

    return total + orderTotal;
  }, 0);

  const totalProducts = orders.reduce((total, order) => {
    return (
      total +
      order.items.reduce((itemsTotal, item) => {
        return itemsTotal + item.quantity;
      }, 0)
    );
  }, 0);

  const averageOrder = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  ordersCount.textContent = totalOrders;
  revenue.textContent = formatPrice(totalRevenue);
  averageTicket.textContent = formatPrice(averageOrder);
  productsSold.textContent = totalProducts;

  renderRecentOrders(orders);
  renderTopProducts(orders);
}

// =====================
// PEDIDOS RECENTES
// =====================

function renderRecentOrders(orders) {
  const container = document.querySelector(".dashboard-recent-orders");

  if (!container) {
    return;
  }

  if (orders.length === 0) {
    container.innerHTML = `
            <p class="dashboard-empty">
                Nenhum pedido encontrado.
            </p>
        `;

    return;
  }

  const recentOrders = orders.slice().reverse().slice(0, 5);

  container.innerHTML = recentOrders
    .map(
      (order) => `
                <div class="dashboard-order-item">

                    <div>
                        <strong>
                            Pedido #${order.number}
                        </strong>

                        <span>
                            ${order.customer}
                        </span>
                    </div>

                    <strong>
                        ${order.total}
                    </strong>

                </div>
            `,
    )
    .join("");
}

// =====================
// PRODUTOS MAIS VENDIDOS
// =====================

function renderTopProducts(orders) {
  const container = document.querySelector(".dashboard-top-products");

  if (!container) {
    return;
  }

  const products = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      if (!products[item.name]) {
        products[item.name] = 0;
      }

      products[item.name] += item.quantity;
    });
  });

  const topProducts = Object.entries(products)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (topProducts.length === 0) {
    container.innerHTML = `
            <p class="dashboard-empty">
                Nenhum produto vendido.
            </p>
        `;

    return;
  }

  container.innerHTML = topProducts
    .map(
      ([name, quantity], index) => `
                <div class="dashboard-product-item">

                    <span>
                        ${index + 1}. ${name}
                    </span>

                    <strong>
                        ${quantity}x
                    </strong>

                </div>
            `,
    )
    .join("");
}
