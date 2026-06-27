// =====================
// TEMA DA APLICAÇÃO
// =====================

// Seleciona o botão de temas da página
const themeButton = document.querySelector('.theme-button');

// Função para aplicar tema
function applyTheme(theme) {

    if (theme === 'dark') {

        document.body.classList.add('dark-mode');

    } else {

        document.body.classList.remove('dark-mode');

    }

};


// Inicializa o tema
function initializeTheme() {

    // Evento
    themeButton.addEventListener('click', () => {

        const isDarkMode =
            document.body.classList.contains('dark-mode');

        if (isDarkMode) {

            applyTheme('light');

            localStorage.setItem(
                'padaroca-theme',
                'light'
            );

        } else {

            applyTheme('dark');

            localStorage.setItem(
                'padaroca-theme',
                'dark'
            );

        }

    });

    // Carrega o tema salvo
    const savedTheme =
        localStorage.getItem('padaroca-theme');

    if (savedTheme) {

        applyTheme(savedTheme);

    }

}

// Inicia o módulo
initializeTheme();