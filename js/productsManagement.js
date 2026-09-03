// =====================
// GERENCIAMENTO DE PRODUTOS
// =====================

import { elements, refreshProductElements } from "./selectors.js";
import {
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  toggleProduct,
} from "./productService.js";
import { closeIcon } from "./icons.js";
import { handleCreateProduct } from "./productManager.js";
import { renderProducts } from "./products.js";

let currentProductImageBase64 = "";
let editingProductId = null;

// =====================
// INICIALIZAÇÃO
// =====================

export function initializeProductsManagement() {
  elements.productsButton.addEventListener("click", openProductsModal);

  elements.closeProductsButton.addEventListener("click", closeProductsModal);

  elements.closeProductsButton.innerHTML = closeIcon;
  elements.closeProductFormButton.innerHTML = closeIcon;

  elements.productForm.addEventListener("submit", handleProductFormSubmit);

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

  elements.productImageInput.addEventListener(
    "change",
    handleProductImageChange,
  );

  elements.productPriceInput.type = "text";

  elements.productPriceInput.addEventListener("keydown", handlePriceKeydown);

  elements.productPriceInput.addEventListener("blur", handlePriceBlur);

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
  editingProductId = null;

  elements.productForm.reset();

  elements.productImagePreview.style.backgroundImage = "";

  currentProductImageBase64 = "";

  elements.productPriceInput.value = "";
  elements.productPriceInput.dataset.rawValue = "";

  elements.productFormModal.classList.add("open");
}

// =====================
// EDITAR PRODUTO
// =====================

function openEditProductModal(productId) {
  const product = getProductById(productId);

  if (!product) {
    return;
  }

  editingProductId = product.id;

  elements.productNameInput.value = product.name;

  elements.productDescriptionInput.value = product.description;

  elements.productCategoryInput.value = product.category;

  elements.productPriceInput.value = product.price.toFixed(2).replace(".", ",");

  elements.productPriceInput.dataset.rawValue = product.price;

  currentProductImageBase64 = product.image || "";

  if (product.image) {
    elements.productImagePreview.style.backgroundImage = `url(${product.image})`;
  } else {
    elements.productImagePreview.style.backgroundImage = "";
  }

  elements.productFormModal.classList.add("open");
}

// =====================
// FECHAR FORMULÁRIO
// =====================

function closeProductFormModal() {
  elements.productFormModal.classList.remove("open");
}

// =====================
// IMAGEM DO PRODUTO
// =====================

function handleProductImageChange(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    currentProductImageBase64 = reader.result;

    elements.productImagePreview.style.backgroundImage = `url(${reader.result})`;
  };

  reader.readAsDataURL(file);
}

// =====================
// PREÇO
// =====================

function handlePriceKeydown(event) {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End",
  ];

  if (allowedKeys.includes(event.key)) {
    return;
  }

  const isDigit = /^[0-9]$/.test(event.key);

  const isComma = event.key === "," && !event.target.value.includes(",");

  if (!isDigit && !isComma) {
    event.preventDefault();
  }
}

function handlePriceBlur(event) {
  let value = event.target.value.replace(",", ".").trim();

  let numericValue = parseFloat(value);

  if (isNaN(numericValue)) {
    numericValue = 0;
  }

  event.target.value = numericValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  event.target.dataset.rawValue = numericValue;
}

// =====================
// SALVAR PRODUTO
// =====================

function handleProductFormSubmit(event) {
  event.preventDefault();

  const priceValue = parseFloat(
    elements.productPriceInput.dataset.rawValue || "0",
  );

  const productData = {
    name: elements.productNameInput.value.trim(),
    description: elements.productDescriptionInput.value.trim(),
    price: priceValue,
    category: elements.productCategoryInput.value,
    image: currentProductImageBase64,
    active: true,
  };

  if (editingProductId === null) {
    handleCreateProduct(productData);
  } else {
    updateProduct(editingProductId, productData);
  }

  closeProductFormModal();

  renderProducts();
  refreshProductElements();

  renderProductsList();

  editingProductId = null;
}

// =====================
// ATIVAR / DESATIVAR PRODUTO
// =====================

function handleToggleProduct(productId) {
  const product = getProductById(productId);

  if (!product) {
    return;
  }

  toggleProduct(productId);

  renderProducts();
  refreshProductElements();
  renderProductsList();
}

// =====================
// DELETAR PRODUTO
// =====================

function handleDeleteProduct(productId) {
  const product = getProductById(productId);

  if (!product) {
    return;
  }

  const confirmed = confirm(
    `Tem certeza que deseja excluir o produto "${product.name}"?`,
  );

  if (!confirmed) {
    return;
  }

  deleteProduct(productId);

  renderProducts();
  refreshProductElements();
  renderProductsList();
}

// =====================
// LISTAGEM DE PRODUTOS
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

      <div class="product-management-actions">
        <button
          class="edit-product-button"
          data-product-id="${product.id}">
          Editar
        </button>

        <button
          class="toggle-product-button"
          data-product-id="${product.id}">
          ${product.active ? "Desativar" : "Ativar"}
        </button>

        <button
          class="delete-product-button"
          data-product-id="${product.id}">
          Excluir
        </button>
      </div>
    `;

    const editButton = productItem.querySelector(".edit-product-button");

    editButton.addEventListener("click", () => {
      openEditProductModal(product.id);
    });

    const toggleButton = productItem.querySelector(".toggle-product-button");

    toggleButton.addEventListener("click", () => {
      handleToggleProduct(product.id);
    });

    const deleteButton = productItem.querySelector(".delete-product-button");

    deleteButton.addEventListener("click", () => {
      handleDeleteProduct(product.id);
    });

    elements.productsList.appendChild(productItem);
  });
}
