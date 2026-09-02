// =====================
// GERENCIAMENTO DE PRODUTOS
// =====================

import { elements } from "./selectors.js";
import { getProducts } from "./productService.js";
import { closeIcon } from "./icons.js";
import { handleCreateProduct } from "./productManager.js";

let currentProductImageBase64 = "";

// =====================
// INICIALIZAÇÃO
// =====================

export function initializeProductsManagement() {
  elements.productsButton.addEventListener("click", openProductsModal);

  elements.closeProductsButton.addEventListener("click", closeProductsModal);

  elements.closeProductsButton.innerHTML = closeIcon;

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
  elements.productForm.reset();

  elements.productImagePreview.style.backgroundImage = "";
  currentProductImageBase64 = "";

  elements.productPriceInput.value = "";
  elements.productPriceInput.dataset.rawValue = "";

  elements.productFormModal.classList.add("open");
}

function closeProductFormModal() {
  elements.productFormModal.classList.remove("open");
}

// =====================
// IMAGEM DO PRODUTO
// =====================

function handleProductImageChange(event) {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    currentProductImageBase64 = reader.result;
    elements.productImagePreview.style.backgroundImage = `url(${reader.result})`;
  };

  reader.readAsDataURL(file);
}

// =====================
// PREÇO (digitação fluida)
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

  if (allowedKeys.includes(event.key)) return;

  const isDigit = /^[0-9]$/.test(event.key);
  const isComma = event.key === "," && !event.target.value.includes(",");

  if (!isDigit && !isComma) {
    event.preventDefault();
  }
}

function handlePriceBlur(event) {
  let value = event.target.value.replace(",", ".").trim();

  let numericValue = parseFloat(value);

  if (isNaN(numericValue)) numericValue = 0;

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

  handleCreateProduct(productData);

  closeProductFormModal();
  renderProductsList();
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
