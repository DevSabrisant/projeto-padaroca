// =====================
// IMPRESSÃO
// =====================
import { parsePrice, formatPrice } from "./utils.js";

export function printOrder(order) {
  const { cart, customerName, orderNote, orderNumber, orderDate, total } =
    order;

  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Permita pop-ups para imprimir a comanda.");
    return;
  }

  let items = "";

  cart.forEach((item) => {
    const price = parsePrice(item.price);

    const subtotal = price * item.quantity;

    items += `
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
  
                      Total: Total: ${total}
  
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
