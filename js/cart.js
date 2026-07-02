// =====================
// CARRINHO
// =====================

import { loadStorage, saveStorage } from "./storage.js";
import { elements } from "./selectors.js";
import { parsePrice, formatPrice } from "./utils.js";

// Carrinho em memória
const cart = [];

// Adiciona um produto ao carrinho
export function addToCart(product) {
  const existingItem = cart.find((item) => item.name === product.name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  }

  saveCart();
  updateCart();
}

// Retorna uma cópia do carrinho
export function getCart() {
  return [...cart];
}

// Verifica se o carrinho está vazio
export function isCartEmpty() {
  return cart.length === 0;
}

// Limpa todos os itens do carrinho
export function clearCart() {
  cart.length = 0;

  saveCart();
  updateCart();
}

// Inicializa o módulo do carrinho
export function initializeCart() {
  loadCart();

  elements.addButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card");

      const product = {
        name: productCard.querySelector("h4").textContent,
        price: productCard.querySelector(".price").textContent,
      };

      addToCart(product);
    });
  });
}

// Carrega o carrinho salvo
function loadCart() {
  const savedCart = loadStorage("padaroca-cart");

  if (savedCart) {
    cart.push(...JSON.parse(savedCart));
  }

  updateCart();
}

// Salva o carrinho
function saveCart() {
  saveStorage("padaroca-cart", JSON.stringify(cart));
}

// Atualiza os itens e o total do carrinho
function updateCart() {
  elements.cartItemsContainer.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    elements.cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        Seu carrinho está vazio.
      </div>
    `;

    elements.cartCount.textContent = "0";
    elements.totalPrice.textContent = formatPrice(0);

    return;
  }

  cart.forEach((item) => {
    const cartItem = document.createElement("div");

    cartItem.classList.add("cart-item");

    const price = parsePrice(item.price);
    const subtotal = price * item.quantity;

    cartItem.innerHTML = `
      <div class="cart-item-header">

        <h4>${item.name}</h4>

        <p class="cart-item-subtotal">
          ${formatPrice(subtotal)}
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

    elements.cartItemsContainer.appendChild(cartItem);

    const increaseButton = cartItem.querySelector(".increase-btn");
    const decreaseButton = cartItem.querySelector(".decrease-btn");

    increaseButton.addEventListener("click", () => {
      item.quantity++;
      saveCart();
      updateCart();
    });

    decreaseButton.addEventListener("click", () => {
      item.quantity--;

      if (item.quantity === 0) {
        const itemIndex = cart.findIndex(
          (cartItem) => cartItem.name === item.name,
        );

        cart.splice(itemIndex, 1);
      }

      saveCart();
      updateCart();
    });

    total += subtotal;
    totalItems += item.quantity;
  });

  elements.cartCount.textContent = totalItems;
  elements.totalPrice.textContent = formatPrice(total);
}
