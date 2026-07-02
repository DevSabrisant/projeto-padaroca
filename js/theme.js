// =====================
// TEMA DA APLICAÇÃO
// =====================

import { sunIcon, moonIcon } from "./icons.js";

// Elementos
const themeButton = document.querySelector(".theme-button");

// Funções
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

function initializeTheme() {
  // Insere os ícones do botão
  themeButton.innerHTML = `
        ${sunIcon}
        ${moonIcon}
    `;

  // Evento de clique no botão de tema
  themeButton.addEventListener("click", () => {
    const isDarkMode = document.body.classList.contains("dark-mode");

    if (isDarkMode) {
      applyTheme("light");
      localStorage.setItem("padaroca-theme", "light");
    } else {
      applyTheme("dark");
      localStorage.setItem("padaroca-theme", "dark");
    }
  });

  // Carrega o tema salvo
  const savedTheme = localStorage.getItem("padaroca-theme");

  if (savedTheme) {
    applyTheme(savedTheme);
  }
}

// Inicialização
initializeTheme();
