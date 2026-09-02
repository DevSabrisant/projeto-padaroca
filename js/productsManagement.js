// =====================
// GERENCIAMENTO DE PRODUTOS
// =====================

import { elements } from "./selectors.js";
import { getProducts } from "./productService.js";
import { closeIcon } from "./icons.js";

// =====================
// INICIALIZAÇÃO
// =====================

export function initializeProductsManagement() {
  elements.productsButton.addEventListener("click", openProductsModal);

  elements.closeProductsButton.addEventListener("click", closeProductsModal);

  elements.closeProductsButton.innerHTML = closeIcon;

  elements.productsModal.addEventListener("click", (event) => {
    if (event.target === elements.productsModal) {
      closeProductsModal();
    }
  });

  elements.newProductButton.addEventListener("click", openNewProductModal);

  elements.closeProductFormButton.addEventListener(
    "click",
    closeProductFormModal,
  );

  elements.cancelProductButton.addEventListener("click", closeProductFormModal);

  elements.productFormModal.addEventListener("click", (event) => {
    if (event.target === elements.productFormModal) {
      closeProductFormModal();
    }
  });

  renderProductsList();
}

// =====================
// MODAL DE PRODUTOS
// =====================

function openProductsModal() {
  renderProductsList();

  elements.productsModal.classList.add("open");
}

function closeProductsModal() {
  elements.productsModal.classList.remove("open");
}

// =====================
// NOVO PRODUTO
// =====================

function openNewProductModal() {
  elements.productForm.reset();

  elements.productFormModal.classList.add("open");
}

function closeProductFormModal() {
  elements.productFormModal.classList.remove("open");
}

// =====================
// LISTAGEM
// =====================

function renderProductsList() {
  const products = getProducts();

  elements.productsList.innerHTML = "";

  products.forEach((product) => {
    const productItem = document.createElement("div");

    productItem.className = "product-management-item";

    productItem.innerHTML = `
            <div class="product-management-info">
                <strong>${product.name}</strong>

                <span>
                    R$ ${product.price.toFixed(2).replace(".", ",")}
                </span>
            </div>
        `;

    elements.productsList.appendChild(productItem);
  });
}
