// =====================
// ARMAZENAMENTO LOCAL
// =====================

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

function removeStorage(key) {
  localStorage.removeItem(key);
}
