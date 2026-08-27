// =====================
// IMPRESSÃO
// =====================

import { formatPrice } from "./utils.js";

export function printOrder(order) {
  // =====================
  // DADOS DO PEDIDO
  // =====================

  const { items, customer, note, number, date, total } = order;

  // =====================
  // VALIDAÇÃO
  // =====================

  if (!items || items.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  // =====================
  // ABRIR JANELA
  // =====================

  const printWindow = window.open("", "_blank", "width=800,height=900");

  if (!printWindow) {
    alert(
      "A janela de impressão foi bloqueada pelo navegador. Permita pop-ups para o Padaroca.",
    );

    return;
  }

  // =====================
  // ITENS
  // =====================

  let itemsHTML = "";

  items.forEach((item) => {
    const price = Number(item.price);

    const quantity = Number(item.quantity);

    const subtotal = price * quantity;

    itemsHTML += `
            <tr>

                <td class="quantity">
                    ${quantity}x
                </td>

                <td class="product">
                    ${item.name}
                </td>

                <td class="subtotal">
                    ${formatPrice(subtotal)}
                </td>

            </tr>
        `;
  });

  // =====================
  // HTML DA COMANDA
  // =====================

  const receiptHTML = `
        <!DOCTYPE html>

        <html lang="pt-BR">

        <head>

            <meta charset="UTF-8">

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            >

            <title>
                Comanda #${number} - Padaroca
            </title>

            <style>

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;

                    padding: 30px;

                    font-family: Arial, sans-serif;

                    color: #333;

                    background: #ffffff;
                }

                .receipt {
                    width: 100%;

                    max-width: 500px;

                    margin: 0 auto;
                }

                .logo {
                    text-align: center;

                    margin-bottom: 25px;
                }

                .logo h1 {
                    margin: 0;

                    color: #8b4513;

                    font-size: 32px;
                }

                .logo p {
                    margin: 5px 0 0;

                    color: #9c8168;

                    font-size: 12px;

                    letter-spacing: 2px;

                    text-transform: uppercase;
                }

                .order-info {
                    padding: 15px 0;

                    border-top: 1px dashed #ccc;

                    border-bottom: 1px dashed #ccc;
                }

                .order-info p {
                    margin: 7px 0;

                    font-size: 14px;
                }

                table {
                    width: 100%;

                    margin-top: 20px;

                    border-collapse: collapse;
                }

                th {
                    padding: 8px 0;

                    text-align: left;

                    color: #777;

                    font-size: 12px;

                    border-bottom: 1px solid #ccc;
                }

                td {
                    padding: 12px 0;

                    font-size: 14px;

                    border-bottom: 1px dashed #ddd;
                }

                .quantity {
                    width: 55px;

                    font-weight: 700;
                }

                .product {
                    padding-right: 10px;
                }

                .subtotal {
                    text-align: right;

                    white-space: nowrap;

                    font-weight: 600;
                }

                .observation {
                    margin-top: 20px;

                    padding: 12px;

                    border-radius: 10px;

                    background: #f8f3ef;

                    font-size: 13px;

                    line-height: 1.5;
                }

                .observation strong {
                    color: #5c3317;
                }

                .total {
                    margin-top: 25px;

                    padding-top: 15px;

                    border-top: 2px solid #8b4513;

                    text-align: right;

                    color: #5c3317;

                    font-size: 20px;

                    font-weight: 700;
                }

                .footer {
                    margin-top: 35px;

                    padding-top: 15px;

                    border-top: 1px dashed #ccc;

                    text-align: center;

                    color: #888;

                    font-size: 11px;
                }

                @media print {

                    body {
                        padding: 0;
                    }

                    .receipt {
                        max-width: none;
                    }

                }

            </style>

        </head>

        <body>

            <div class="receipt">

                <div class="logo">

                    <h1>
                         Padaroca
                    </h1>

                    <p>
                        Pães, doces & cafés
                    </p>

                </div>

                <div class="order-info">

                    <p>
                        <strong>Pedido:</strong>
                        #${number}
                    </p>

                    <p>
                        <strong>Data:</strong>
                        ${date}
                    </p>

                    <p>
                        <strong>Cliente:</strong>
                        ${customer}
                    </p>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>
                                Qtd.
                            </th>

                            <th>
                                Produto
                            </th>

                            <th style="text-align: right;">
                                Subtotal
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${itemsHTML}

                    </tbody>

                </table>

                ${
                  note
                    ? `
                            <div class="observation">

                                <strong>
                                    Observação:
                                </strong>

                                ${note}

                            </div>
                        `
                    : ""
                }

                <div class="total">

                    Total: ${total}

                </div>

                <div class="footer">

                    Padaroca — Pães, doces & cafés

                </div>

            </div>

        </body>

        </html>
    `;

  // =====================
  // ESCREVER DOCUMENTO
  // =====================

  printWindow.document.open();

  printWindow.document.write(receiptHTML);

  printWindow.document.close();

  // =====================
  // AGUARDAR RENDERIZAÇÃO
  // =====================

  setTimeout(() => {
    printWindow.focus();

    printWindow.print();
  }, 500);

  // =====================
  // FECHAR JANELA
  // =====================

  printWindow.onafterprint = () => {
    setTimeout(() => {
      printWindow.close();
    }, 300);
  };
}
