// storage.js: único archivo que usa localStorage
const CLAVE_VISITAS = "pasaporte.visitas";

function leerVisitas() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_VISITAS));
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function guardarVisitas(visitas) {
  try {
    localStorage.setItem(CLAVE_VISITAS, JSON.stringify(visitas));
  } catch (err) {
    console.error(err);
  }
}
