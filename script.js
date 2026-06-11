// Seleciona os botões de filtro
const filterButtons = document.querySelectorAll('.filter-button');

// Seleciona todos os cards de produtos
const products = document.querySelectorAll('.product-card');

// Seleciona todas as categorias do menu
const categories = document.querySelectorAll('.category');

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

        // Esconde categorias vazias
        categories.forEach(category => {

            const visibleProducts = category.querySelectorAll(
                '.product-card:not([style*="display: none"])'
            );

            if (visibleProducts.length === 0) {

                category.style.display = 'none';

            } else {

                category.style.display = 'block';

            }

        });

    });

});