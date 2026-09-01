// =====================
// GERENCIAMENTO DE PRODUTOS
// =====================

import {
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProduct,
} from "./productService.js";

// =====================
// CRIAR PRODUTO
// =====================

export function handleCreateProduct(productData) {
  return createProduct(productData);
}

// =====================
// ATUALIZAR PRODUTO
// =====================

export function handleUpdateProduct(id, productData) {
  return updateProduct(id, productData);
}

// =====================
// EXCLUIR PRODUTO
// =====================

export function handleDeleteProduct(id) {
  return deleteProduct(id);
}

// =====================
// ATIVAR / DESATIVAR
// =====================

export function handleToggleProduct(id) {
  return toggleProduct(id);
}
