// =====================
// ÍCONES DO HISTÓRICO
// =====================

const orderIcon = `
    <svg
        class="history-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <path d="M19 17V5a2 2 0 0 0-2-2H4" />

        <path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3" />

    </svg>
`;

const userIcon = `
    <svg
        class="history-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <circle
            cx="12"
            cy="8"
            r="5" />

        <path d="M20 21a8 8 0 0 0-16 0" />

    </svg>
`;

const calendarIcon = `
    <svg
        class="history-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <path d="M8 2v4" />
        <path d="M16 2v4" />

        <rect
            width="18"
            height="18"
            x="3"
            y="4"
            rx="2" />

        <path d="M3 10h18" />
        <path d="M8 14h.01" />
        <path d="M12 14h.01" />
        <path d="M16 14h.01" />
        <path d="M8 18h.01" />
        <path d="M12 18h.01" />
        <path d="M16 18h.01" />

    </svg>
`;

const moneyIcon = `
    <svg
        class="history-icon money-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <line
            x1="12"
            x2="12"
            y1="2"
            y2="22" />

        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />

    </svg>
`;

// =====================
// ÍCONES DO HEADER
// =====================

const usersIcon = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-users-round-icon lucide-users-round">

        <path d="M18 21a8 8 0 0 0-16 0" />

        <circle
            cx="10"
            cy="8"
            r="5" />

        <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />

    </svg>
`;

const cartIcon = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-shopping-cart-icon lucide-shopping-cart">

        <circle
            cx="8"
            cy="21"
            r="1" />

        <circle
            cx="19"
            cy="21"
            r="1" />

        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />

    </svg>
`;

const menuIcon = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-menu-icon lucide-menu">

        <path d="M4 5h16" />
        <path d="M4 12h16" />
        <path d="M4 19h16" />

    </svg>
`;

// =====================
// ÍCONES DO TEMA
// =====================

const sunIcon = `
    <svg
        class="theme-icon sun-icon lucide lucide-sun"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <circle
            cx="12"
            cy="12"
            r="4" />

        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />

    </svg>
`;

const moonIcon = `
    <svg
        class="theme-icon moon-icon lucide lucide-moon"
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />

    </svg>
`;

// =====================
// ÍCONES DE AÇÕES
// =====================

const closeIcon = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />

    </svg>
`;

const plusIcon = `
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round">

        <path d="M12 5v14" />
        <path d="M5 12h14" />

    </svg>
`;
