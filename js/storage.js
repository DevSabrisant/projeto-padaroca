// ================
// ARMAZENAMENTO LOCAL
// ================

// Salva info no localStorage
function saveStorage (key, value) {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );
}

// Carrega um valor do localStorage
function loadStorage(key) {
    
    const data = localStorage.getItem(key);
    return data
    ? JSON.parse(data)
    : null;
}

// Remove info do localStorage
function removeStorage(key) {
    localStorage.removeItem(key);
}