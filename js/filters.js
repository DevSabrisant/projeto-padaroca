import { elements } from "./selectors.js";

// Atualiza a visibilidade das categorias >> API PRIVADA
export function updateCategories() {
  elements.categories.forEach((category) => {
    const visibleProducts = category.querySelectorAll(
      '.product-card:not([style*="display: none"])',
    );

    category.style.display = visibleProducts.length > 0 ? "block" : "none";
  });
}

// FILTROS
// Filtro por Categoria >> API PÚBLICA
export function initializeFilters() {
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

  //   Barra de pesquisa

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
}
