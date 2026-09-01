// ==============
// SERVIÇOS DE PRODUTOS
// ==============

import { loadStorage, saveStorage } from "./storage.js";
import { products as defaultProducts } from "./productsData.js";

const PRODUCTS_KEY = "padaroca-products";

// ==============
// PRODUTOS
// ==============

//  Retorna todos os produtos
export function getProducts() {
  const storedProducts = loadStorage(PRODUCTS_KEY);

  if (storedProducts) {
    return storedProducts;
  }
  saveStorage(PRODUCTS_KEY, defaultProducts);
  return defaultProducts;
}
//  Retorna um produto pelo ID
export function getProductById(id) {
  const products = getProducts();

  return products.find((product) => product.id === id);
}

// Cria um novo produto
export function createProduct(productData) {
  const products = getProducts();

  const newProduct = {
    id: Date.now(),
    ...productData,
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);

  saveStorage(PRODUCTS_KEY, products);

  return newProduct;
}

// Atualiza um produto existente
export function updateProduct(id, productData) {
  const products = getProducts();

  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...productData,
  };

  saveStorage(PRODUCTS_KEY, products);

  return products[index];
}

// Exclui um produto
export function deleteProduct(id) {
  const products = getProducts();

  const filteredProducts = products.filter((product) => product.id !== id);

  saveStorage(PRODUCTS_KEY, filteredProducts);

  return true;
}

// Ativa ou desativa um produto
export function toggleProduct(id) {
  const products = getProducts();

  const product = products.find((product) => product.id === id);

  if (!product) {
    return null;
  }

  product.active = !product.active;

  saveStorage(PRODUCTS_KEY, products);

  return product;
}
