// =====================
// PRODUTOS
// =====================

import { getProducts } from "./productService.js";

// =====================
// RENDERIZAÇÃO
// =====================

export function renderProducts() {
  const products = getProducts();

  const categories = [...new Set(products.map((product) => product.category))];

  categories.forEach((category) => {
    const productsGrid = document.querySelector(`#${category} .products-grid`);

    if (!productsGrid) {
      return;
    }

    productsGrid.innerHTML = "";

    products
      .filter((product) => product.category === category && product.active)
      .forEach((product) => {
        const productCard = document.createElement("div");

        productCard.classList.add("product-card");

        productCard.dataset.productId = product.id;
        productCard.dataset.category = product.category;

        productCard.innerHTML = `
          <div
            class="product-image"
            style="background-image: url('${product.image}');">
          </div>

          <h4>${product.name}</h4>

          <p>${product.description}</p>

          <div class="card-footer">
            <p class="price">
              R$ ${product.price.toFixed(2).replace(".", ",")}
            </p>

            <button class="add-button">
              +
            </button>
          </div>
        `;

        productsGrid.appendChild(productCard);
      });
  });
}
