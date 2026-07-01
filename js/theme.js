// =====================
// TEMA DA APLICAÇÃO
// =====================

<<<<<<< HEAD
// Elementos
const themeButton = document.querySelector(".theme-button");
=======
// Seleciona o botão de temas da página
const themeButton = document.querySelector('.theme-button');
>>>>>>> 4b99cdebec24caa98864b1c86efd6c2be12970f0

// Funções
function applyTheme(theme) {
<<<<<<< HEAD
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}
=======

    if (theme === 'dark') {

        document.body.classList.add('dark-mode');

    } else {

        document.body.classList.remove('dark-mode');

    }

};

>>>>>>> 4b99cdebec24caa98864b1c86efd6c2be12970f0

function initializeTheme() {
  // Insere os ícones do botão
  themeButton.innerHTML = `
        ${sunIcon}
        ${moonIcon}
    `;

  // Evento
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
