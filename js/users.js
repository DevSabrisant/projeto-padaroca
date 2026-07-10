// =====================
// USUÁRIOS
// =====================

import { elements } from "./selectors.js";

export function initializeUsers() {
  elements.usersButton.addEventListener("click", openUsersModal);

  elements.closeUsersButton.addEventListener("click", closeUsersModal);

  elements.usersModal.addEventListener("click", (event) => {
    if (event.target === elements.usersModal) {
      closeUsersModal();
    }
  });
}

function openUsersModal() {
  elements.usersModal.classList.add("open");
}

function closeUsersModal() {
  elements.usersModal.classList.remove("open");
}
