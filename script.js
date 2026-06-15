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


// =====================
// FUNÇÕES
// =====================

// Atualiza a visibilidade das categorias
function updateCategories() {

    categories.forEach(category => {

        const visibleProducts = category.querySelectorAll(
            '.product-card:not([style*="display: none"])'
        );

        if (visibleProducts.length > 0) {

            category.style.display = 'block';

        } else {

            category.style.display = 'none';

        }

    });

}


// =====================
// FILTROS
// =====================

// Gerencia os filtros do cardápio
filterButtons.forEach(button => {

    button.addEventListener('click', () => {

        // Remove o active de todos os filtros
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Adiciona active ao filtro clicado
        button.classList.add('active');

        // Obtém o filtro selecionado
        const filter = button.dataset.filter;

        // Filtra os produtos
        products.forEach(product => {

            const category = product.dataset.category;

            if (filter === 'all' || filter === category) {

                product.style.display = 'flex';

            } else {

                product.style.display = 'none';

            }

        });

        // Atualiza as categorias visíveis
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