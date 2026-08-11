// =====================
// TEMA DA APLICAÇÃO
// =====================

import { sunIcon, moonIcon } from "./icons.js";
import { elements } from "./selectors.js";

// =====================
// FUNÇÕES
// =====================

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

// =====================
// INICIALIZAÇÃO
// =====================

function initializeTheme() {
  const themeButton = elements.themeToggle;

  if (!themeButton) {
    console.error("Botão de tema não encontrado.");
    return;
  }

  // Insere os ícones
  themeButton.innerHTML = `
    ${sunIcon}
    ${moonIcon}
  `;

  // Evento de clique
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

// =====================
// EXECUÇÃO
// =====================

initializeTheme();
