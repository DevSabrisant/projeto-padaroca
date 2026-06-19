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


// =====================
// DECLARAÇÃO DE VARIÁVEIS
// =====================

const cart = [];


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

        console.table(cart);

    });

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


checkoutButton.addEventListener('click', () => {

    if (cart.length === 0) {

        alert('Seu carrinho está vazio!');

        return;

    }

    const customerName = customerNameInput.value.trim();

    const orderNote = orderNoteInput.value.trim();

    console.log(`Nome do cliente: "${customerName}"`);

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

    let message = `🛒 *Pedido #${orderNumber}*

📅 ${orderDate}

👤 *Cliente:* ${customerName}

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

        if (orderNote) {

            message += `\n📝 *Observação:* ${orderNote}\n`;

        }

    }

    message += `\n💰 *Total: ${totalPrice.textContent}*`;

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

const savedCart = localStorage.getItem('padaroca-cart');

if (savedCart) {

    cart.push(...JSON.parse(savedCart));

}

updateCart();


// =====================
// ABRIR E FECHAR CARRINHO
// =====================

cartButton.addEventListener('click', () => {

    cartSidebar.classList.add('open');

});

closeCartButton.addEventListener('click', () => {

    cartSidebar.classList.remove('open');

});
