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

// Valida e-mail do usuário
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function searchCep(cep) {
  const cleanCep = cep.replace(/\D/g, "");

  if (cleanCep.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);

    if (!response.ok) {
      throw new Error("Erro ao consultar o CEP.");
    }

    const data = await response.json();

    if (data.erro) {
      return null;
    }

    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
    };
  } catch (error) {
    console.error("Erro ao consultar CEP:", error);
    return null;
  }
}
