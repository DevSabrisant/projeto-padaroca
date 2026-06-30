// =====================
// ARMAZENAMENTO LOCAL
// =====================

// Salva um valor no localStorage
function saveStorage(key, value) {

    localStorage.setItem(
        key,
        value
    );

}

// Busca um valor do localStorage
function loadStorage(key) {

    return localStorage.getItem(key);

}

// Remove um valor
function removeStorage(key) {
    localStorage.removeItem(key);
}