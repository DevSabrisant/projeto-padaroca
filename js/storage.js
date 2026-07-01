<<<<<<< HEAD
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
=======
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
>>>>>>> 4b99cdebec24caa98864b1c86efd6c2be12970f0
function removeStorage(key) {
    localStorage.removeItem(key);
}