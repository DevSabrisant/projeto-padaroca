// =====================
// IMPRESSÃO
// =====================

import { parsePrice, formatPrice } from "./utils.js";

export function printOrder(order) {
  const { items, customer, note, number, date, total } = order;

  if (items.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Permita pop-ups para imprimir a comanda.");
    return;
  }

  let itemsHTML = "";

  items.forEach((item) => {
    const price = parsePrice(item.price);

    const subtotal = price * item.quantity;

    itemsHTML += `
      <tr>
        <td>${item.quantity}x</td>
        <td>${item.name}</td>
        <td>${formatPrice(subtotal)}</td>
      </tr>
    `;
  });

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

        <p><strong>Pedido:</strong> #${number}</p>

        <p><strong>Data:</strong> ${date}</p>

        <p><strong>Cliente:</strong> ${customer}</p>

        <table>

          ${itemsHTML}

        </table>

        ${note ? `<p><strong>Observação:</strong> ${note}</p>` : ""}

        <p class="total">

          Total: ${total}

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
