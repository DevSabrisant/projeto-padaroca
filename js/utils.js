// Converte o preço de string para número
export function parsePrice(price) {
  return Number(
    price.replace("R$", "").replace(".", "").replace(",", ".").trim(),
  );
}

// Formata um número para o formato de preço brasileiro
export function formatPrice(value) {
  return `R$ ${value.toFixed(2).replace(".", ",")}`;
}
