// =====================
// SELETORES
// =====================

// Seleciona os botões de filtro
const filterButtons = document.querySelectorAll('.filter-button');

// Seleciona todos os cards de produtos
const products = document.querySelectorAll('.product-card');

// Seleciona todas as categorias do menu
const categories = document.querySelectorAll('.category');

// Seleciona o input da barra de pesquisa
const searchInput = document.querySelector('.search-box input');

// Seleciona todos os botões de adicionar produto
const addButtons = document.querySelectorAll('.add-button');

// Seleciona o contador do carrinho
const cartCount = document.querySelector('.cart-count');

// Seleciona a barra lateral do carrinho
const cartSidebar = document.querySelector('.cart-sidebar');

// Seleciona o botão de abrir o carrinho
const cartButton = document.querySelector('.cart-button');

// Seleciona o botão de fechar o carrinho
const closeCartButton = document.querySelector('.close-cart');

// Container dos itens do carrinho
const cartItemsContainer = document.querySelector('.cart-items');

// Total do carrinho
const totalPrice = document.querySelector('.total-price');

// Seleciona botão de finalizar pedido
const checkoutButton = document.querySelector('.checkout-button');

// Seleciona o nome do cliente
const customerNameInput = document.querySelector('.customer-name');

// Seleciona observações do pedido
const orderNoteInput = document.querySelector('.order-note');

// Cria o seletor para imprimir comanda do pedido
const printButton = document.querySelector('.print-button');

// Seleciona o botão que abre i histórico de pedidos
const historyButton = document.querySelector('.history-button');

// Seleciona a barra lateral do histórico
const historySidebar = document.querySelector('.history-sidebar');

// Seleciona o botão de fechar o histórico
const closeHistoryButton = document.querySelector('.close-history');

// Container onde os pedidos do histórico serão renderizados
const historyItemsContainer = document.querySelector('.history-items');

// Seleciona o modal de detalhes do pedido 
const orderModal = document.querySelector('.order-modal');

// Container quer receberá dinamicamente os dados do pedido 
const orderDetails = document.querySelector('.order-details');

// Seleciona o botão de fechar o modal de pedidos
const closeOrderModal = document.querySelector('.close-order-modal');

// Seleciona o botão de temas da página
const themeButton = document.querySelector('.theme-button');


// =====================
// DECLARAÇÃO DE VARIÁVEIS
// =====================

// Carrinho atual
const cart = [];

// Histórico de pedidos
let orders = JSON.parse(
    localStorage.getItem('padaroca-orders')
) || [];

// =====================
// ICONES SVG
// =====================

const orderIcon = `
    <svg
        class="history-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <path d="M19 17V5a2 2 0 0 0-2-2H4"/>

        <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/>

    </svg>
`;

const userIcon = `
    <svg
        class="history-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <circle cx="12" cy="8" r="5"/>
        <path d="M20 21a8 8 0 0 0-16 0"/>

    </svg>
`;

const calendarIcon = `
    <svg
        class="history-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <path d="M8 2v4"/>
        <path d="M16 2v4"/>
        <rect width="18" height="18" x="3" y="4" rx="2"/>
        <path d="M3 10h18"/>
        <path d="M8 14h.01"/>
        <path d="M12 14h.01"/>
        <path d="M16 14h.01"/>
        <path d="M8 18h.01"/>
        <path d="M12 18h.01"/>
        <path d="M16 18h.01"/>

    </svg>
`;

const moneyIcon = `
    <svg
        class="history-icon money-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <line x1="12" x2="12" y1="2" y2="22"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>

    </svg>
`;


// =====================
// FUNÇÕES
// =====================

// Atualiza a visibilidade das categorias
function updateCategories() {

    categories.forEach(category => {

        const visibleProducts = category.querySelectorAll(
            '.product-card:not([style*="display: none"])'
        );

        category.style.display =
            visibleProducts.length > 0 ? 'block' : 'none';

    });

}

// Atualiza os itens e o total do carrinho
function updateCart() {

    // Limpa o conteúdo atual do carrinho
    cartItemsContainer.innerHTML = '';

    let total = 0;

    let totalItems = 0;

    // Exibe mensagem se o carrinho estiver vazio
    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                Seu carrinho está vazio.
            </div>
        `;

        cartCount.textContent = '0';
        totalPrice.textContent = 'R$ 0,00';

        return;

    }

    // Cria os itens do carrinho
    cart.forEach(item => {

        const cartItem = document.createElement('div');

        cartItem.classList.add('cart-item');

        const price = Number(
            item.price
                .replace('R$', '')
                .replace(',', '.')
                .trim()
        );

        const subtotal = price * item.quantity;

        cartItem.innerHTML = `
    <div class="cart-item-header">

        <h4>${item.name}</h4>

        <p class="cart-item-subtotal">
            R$ ${subtotal.toFixed(2).replace('.', ',')}
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

        cartItemsContainer.appendChild(cartItem);

        // Seleciona os botões + e -
        const increaseButton = cartItem.querySelector('.increase-btn');

        const decreaseButton = cartItem.querySelector('.decrease-btn');

        // Aumenta a quantidade
        increaseButton.addEventListener('click', () => {

            item.quantity++;
            saveCart();
            updateCart();

        });

        // Diminui a quantidade
        decreaseButton.addEventListener('click', () => {

            item.quantity--;

            if (item.quantity === 0) {

                const itemIndex = cart.findIndex(
                    cartItem => cartItem.name === item.name
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

    cartCount.textContent = totalItems;

    totalPrice.textContent = `R$ ${total
        .toFixed(2)
        .replace('.', ',')}`;

}

function saveCart() {

    localStorage.setItem(
        'padaroca-cart',
        JSON.stringify(cart)
    );
}

function saveOrders() {
    localStorage.setItem(
        'padaroca-orders',
        JSON.stringify(orders)
    );
}

function renderOrders() {

    historyItemsContainer.innerHTML = '';

    if (orders.length === 0) {

        historyItemsContainer.innerHTML = `
            <div class="empty-history">
                Nenhum pedido encontrado.
            </div>
        `;

        return;

    }

    orders
        .slice()
        .reverse()
        .forEach(order => {

            historyItemsContainer.innerHTML += `

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
    data-order="${order.number}">

    Ver detalhes

</button>

    </div>

`;
        });
    document
        .querySelectorAll('.view-order-button')
        .forEach(button => {

            button.addEventListener('click', () => {

                showOrderDetails(
                    button.dataset.order
                );

            });

        });
}


function showOrderDetails(orderNumber) {

    const order = orders.find(
        order => order.number === orderNumber
    );

    if (!order) return;

    let itemsHtml = '';

    order.items.forEach(item => {

        itemsHtml += `
            <li>
                ${item.quantity}x ${item.name}
            </li>
        `;

    });

    orderDetails.innerHTML = `

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

        <p>${order.note || 'Nenhuma'}</p>

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

    orderModal.classList.add('open');

    const deleteButton =
        document.querySelector('.delete-order-button');

    deleteButton.addEventListener('click', () => {

        deleteOrder(order.number);

    });

}

function deleteOrder(orderNumber) {

    const confirmed = confirm(
        `Deseja realmente excluir o pedido #${orderNumber}?`
    );

    if (!confirmed) return;

    orders = orders.filter(
        order => order.number !== orderNumber
    );

    saveOrders();

    renderOrders();

    orderModal.classList.remove('open');

}

function applyTheme(theme) {

    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// =====================
// FILTROS
// =====================

filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');

        const filter = button.dataset.filter;

        products.forEach(product => {

            const category = product.dataset.category;

            product.style.display =
                filter === 'all' || filter === category
                    ? 'flex'
                    : 'none';

        });

        updateCategories();

    });

});


// =====================
// BARRA DE PESQUISA
// =====================

searchInput.addEventListener('input', () => {

    const searchTerms = searchInput.value
        .toLowerCase()
        .trim()
        .split(' ');

    products.forEach(product => {

        const productName = product
            .querySelector('h4')
            .textContent
            .toLowerCase();

        const match = searchTerms.every(term =>
            productName.includes(term)
        );

        product.style.display = match ? 'flex' : 'none';

    });

    updateCategories();

});


// =====================
// CARRINHO
// =====================

addButtons.forEach(button => {

    button.addEventListener('click', () => {

        const product = button.closest('.product-card');

        const productName = product
            .querySelector('h4')
            .textContent;

        const productPrice = product
            .querySelector('.price')
            .textContent;

        const existingItem = cart.find(
            item => item.name === productName
        );

        if (existingItem) {

            existingItem.quantity++;
        } else {
            cart.push({

                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        saveCart();
        updateCart();


    });

});


// =====================
// HISTORICO DE PEDIDOS
// =====================
historyButton.addEventListener('click', () => {

    cartSidebar.classList.remove('open');

    historySidebar.classList.add('open');

});

closeHistoryButton.addEventListener('click', () => {

    historySidebar.classList.remove('open');

});

closeOrderModal.addEventListener('click', () => {

    orderModal.classList.remove('open');
});

// Fecha o modal de histórico de pedidos clicando fora do modal
orderModal.addEventListener('click', (event) => {

    if (event.target === orderModal) {

        orderModal.classList.remove('open');

    }

});

// =====================
// TEMA DA PÁGINA
// =====================

themeButton.addEventListener('click', () => {

    const isDarkMode = document.body.classList.contains('dark-mode');

    if (isDarkMode) {
        applyTheme('light');

        localStorage.setItem(
            'padaroca-theme',
            'light'
        )
    } else {
        applyTheme('dark');

        localStorage.setItem(
            'padaroca-theme',
            'dark'
        )
    }

});



// =====================
// FINALIZAR PEDIDO
// =====================

// Gerar o numero do pedido
function getNextOrderNumber() {

    const lastOrder = Number(
        localStorage.getItem('padaroca-order-number') || 0
    );

    const nextOrder = lastOrder + 1;

    localStorage.setItem(
        'padaroca-order-number',
        nextOrder
    );

    return String(nextOrder).padStart(3, '0');

}


// Função p/ imprimir comanda

function printOrder() {

    if (cart.length === 0) {

        alert('Seu carrinho está vazio!');

        return;

    }

    const customerName = customerNameInput.value.trim() || 'Não informado';

    const orderNote = orderNoteInput.value.trim();

    const orderNumber = getNextOrderNumber();

    const orderDate = new Date().toLocaleString(
        'pt-BR',
        {
            dateStyle: 'short',
            timeStyle: 'short'
        }
    );

    let items = '';

    cart.forEach(item => {

        const price = Number(
            item.price
                .replace('R$', '')
                .replace(',', '.')
                .trim()
        );

        const subtotal = price * item.quantity;

        items += `
            <tr>
                <td>${item.quantity}x</td>
                <td>${item.name}</td>
                <td>R$ ${subtotal.toFixed(2).replace('.', ',')}</td>
            </tr>
        `;

    });

    // COMANDA

    const printWindow = window.open('', '_blank');

    if (!printWindow) {

        alert('Permita pop-ups para imprimir a comanda.');

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

                ${orderNote
            ? `<p><strong>Observação:</strong> ${orderNote}</p>`
            : ''
        }

                <p class="total">

                    Total: ${totalPrice.textContent}

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

printButton.addEventListener('click', printOrder);


checkoutButton.addEventListener('click', () => {

    if (cart.length === 0) {

        alert('Seu carrinho está vazio!');

        return;

    }

    const customerName = customerNameInput.value.trim();

    const orderNote = orderNoteInput.value.trim();


    if (!customerName) {

        alert('Informe o nome do cliente.');

        return;

    }


    const orderNumber = getNextOrderNumber();

    const orderDate = new Date().toLocaleString(
        'pt-BR',
        {
            dateStyle: 'short',
            timeStyle: 'short'
        }
    );

    const order = {

        number: orderNumber,

        date: orderDate,

        customer: customerName,

        note: orderNote,

        total: totalPrice.textContent,

        items: [...cart]

    };

    let message = `🛒 *Pedido #${orderNumber}*

 ${orderDate}

 *Cliente:* ${customerName}

`;

    cart.forEach(item => {

        const price = Number(
            item.price
                .replace('R$', '')
                .replace(',', '.')
                .trim()
        );

        const subtotal = price * item.quantity;

        message += `${item.quantity}x ${item.name} - R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;

    });


    if (orderNote) {

        message += `\n📝 *Observação:* ${orderNote}\n`;

    }

    message += `\n *Total: ${totalPrice.textContent}*`;

    orders.push(order);

    saveOrders();

    renderOrders();

    const phone = '5591999999999';

    const encodedMessage = encodeURIComponent(message);

    window.open(
        `https://wa.me/${phone}?text=${encodedMessage}`,
        '_blank'
    );

    // Limpa o carrinho após o envio para o WhatsApp

    cart.length = 0;

    // Limpa os campos

    customerNameInput.value = '';

    orderNoteInput.value = '';

    // Remove os dados salvos no navegador

    localStorage.removeItem('padaroca-cart');

    // Atualiza a interface
    updateCart();

});


// =====================
// INICIALIZAÇÃO
// =====================

const savedTheme = localStorage.getItem('padaroca-theme');

if (savedTheme) {
    applyTheme(savedTheme);
}
const savedCart = localStorage.getItem('padaroca-cart');

if (savedCart) {

    cart.push(...JSON.parse(savedCart));

}

updateCart();
renderOrders();



// =====================
// ABRIR E FECHAR CARRINHO
// =====================

cartButton.addEventListener('click', () => {

    historySidebar.classList.remove('open');

    cartSidebar.classList.add('open');

});

closeCartButton.addEventListener('click', () => {

    cartSidebar.classList.remove('open');

});
