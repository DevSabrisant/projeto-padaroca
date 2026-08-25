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
