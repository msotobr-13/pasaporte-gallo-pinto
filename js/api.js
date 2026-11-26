// api.js: único archivo que usa fetch
const URL_COMPAS = "https://jsonplaceholder.typicode.com/users";

async function obtenerCompasDeViaje() {
  const res = await fetch(URL_COMPAS);
  if (!res.ok) throw new Error(res.status);
  const usuarios = await res.json();
  return usuarios.map((u) => u.name);
}
