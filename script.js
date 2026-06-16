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

        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price}</p>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);

        total += Number(
            item.price
                .replace('R$', '')
                .replace(',', '.')
                .trim()
        );

    });

    // Atualiza contador e total
    cartCount.textContent = cart.length;

    totalPrice.textContent = `R$ ${total
        .toFixed(2)
        .replace('.', ',')}`;

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

        cart.push({
            name: productName,
            price: productPrice
        });

        updateCart();

        console.table(cart);

    });

});


// =====================
// ABRIR E FECHAR CARRINHO
// =====================

cartButton.addEventListener('click', () => {

    cartSidebar.classList.add('open');

});

closeCartButton.addEventListener('click', () => {

    cartSidebar.classList.remove('open');

});


// =====================
// INICIALIZAÇÃO
// =====================

updateCart();