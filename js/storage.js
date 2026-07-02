// =====================
// ARMAZENAMENTO LOCAL
// =====================

export function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function removeStorage(key) {
  localStorage.removeItem(key);
}
