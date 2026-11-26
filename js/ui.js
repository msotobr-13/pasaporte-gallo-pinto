function actualizarSelectCompas(select, aviso, nombres, error = "") {
  select.replaceChildren();
  ["Fui solo", ...nombres].forEach((texto) => {
    const opt = document.createElement("option");
    opt.value = texto;
    opt.textContent = texto;
    select.append(opt);
  });
  select.disabled = false;
  aviso.textContent = error;
}

function mostrarError(campo, mensaje) {
  campo.classList.toggle("invalido", Boolean(mensaje));
  document.querySelector(`#error-${campo.id}`).textContent = mensaje;
}

function crearTarjeta(visita) {
  const card = document.createElement("article");
  card.className = visita.favorita ? "tarjeta favorita" : "tarjeta";
  card.dataset.id = visita.id;

  const top = document.createElement("div");
  top.className = "tarjeta-top";
  const h3 = document.createElement("h3");
  h3.textContent = visita.soda;
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = visita.provincia;
  top.append(h3, badge);

  const info = document.createElement("div");
  [
    ["Plato", visita.plato],
    ["Calificación", `${visita.calificacion} / 5`],
    ["Fecha", visita.fecha],
    ["Compa", visita.compa],
    ["¿Volvería?", visita.volveria ? "Sí" : "No"]
  ].forEach(([k, v]) => {
    const p = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${k}: `;
    p.append(strong, v);
    info.append(p);
  });

  const acciones = document.createElement("div");
  acciones.className = "acciones";

  const btnFav = document.createElement("button");
  btnFav.type = "button";
  btnFav.className = visita.favorita ? "btn btn-fav activa" : "btn btn-fav";
  btnFav.dataset.accion = "favorita";
  btnFav.textContent = visita.favorita ? "Favorita ★" : "Favorita";

  const btnBorrar = document.createElement("button");
  btnBorrar.type = "button";
  btnBorrar.className = "btn btn-borrar";
  btnBorrar.dataset.accion = "borrar";
  btnBorrar.textContent = "Borrar";

  acciones.append(btnFav, btnBorrar);
  card.append(top, info, acciones);
  return card;
}

function renderizar(contenedor, vacio, lista, resumen) {
  contenedor.replaceChildren(...lista.map(crearTarjeta));
  vacio.classList.toggle("oculto", lista.length > 0);
  document.querySelector("#total-visitas").textContent = resumen.total;
  document.querySelector("#promedio-calificacion").textContent = resumen.promedio.toFixed(1);
  document.querySelector("#provincias-selladas").textContent = `${resumen.selladas} de 7`;
  document.querySelector("#mensaje-pasaporte-completo").classList.toggle("oculto", resumen.selladas < 7);
}
