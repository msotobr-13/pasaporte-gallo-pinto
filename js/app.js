// app.js: estado, validación, eventos y arranque
const PROVINCIAS = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];
let visitas = leerVisitas();
let filtro = "Todas";

// Referencias DOM
const form = document.querySelector("#form-visita");
const soda = document.querySelector("#soda");
const provincia = document.querySelector("#provincia");
const plato = document.querySelector("#plato");
const calificacion = document.querySelector("#calificacion");
const fecha = document.querySelector("#fecha");
const compa = document.querySelector("#compa");
const avisoCompas = document.querySelector("#estado-compas");
const volveria = document.querySelector("#volveria");
const filtroSelect = document.querySelector("#filtro-provincia");
const contenedor = document.querySelector("#contenedor-tarjetas");
const vacio = document.querySelector("#mensaje-vacio");

// Validaciones
const hoyISO = () => new Date().toLocaleDateString("sv-SE");
const validar = (campo, ok, msg) => (mostrarError(campo, ok ? "" : msg), ok);
const validarSoda = () => validar(soda, soda.value.trim().length >= 3 && soda.value.trim().length <= 40, "Obligatorio (3 a 40 caracteres).");
const validarProvincia = () => validar(provincia, PROVINCIAS.includes(provincia.value), "Elegí una provincia.");
const validarPlato = () => validar(plato, plato.value.trim().length >= 3, "Obligatorio (mínimo 3 caracteres).");
const validarNota = () => {
  const nota = Number(document.querySelector('input[name="calificacion"]:checked')?.value);
  return validar(calificacion, Number.isInteger(nota) && nota >= 1 && nota <= 5, "Elegí una calificación del 1 al 5.");
};
const validarFecha = () => validar(fecha, fecha.value !== "" && fecha.value <= hoyISO(), "Fecha obligatoria y no puede ser futura.");

// Estado y renderizado
function actualizar() {
  guardarVisitas(visitas);
  const visibles = filtro === "Todas" ? visitas : visitas.filter((v) => v.provincia === filtro);
  const suma = visitas.reduce((acc, v) => acc + v.calificacion, 0);
  const selladas = new Set(visitas.map((v) => v.provincia)).size;
  renderizar(contenedor, vacio, visibles, {
    total: visitas.length,
    promedio: visitas.length ? suma / visitas.length : 0,
    selladas
  });
}

// Eventos
soda.addEventListener("input", validarSoda);
provincia.addEventListener("change", validarProvincia);
plato.addEventListener("input", validarPlato);
calificacion.addEventListener("change", validarNota);
fecha.addEventListener("change", validarFecha);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (![validarSoda(), validarProvincia(), validarPlato(), validarNota(), validarFecha()].every(Boolean)) return;

  visitas.push({
    id: Date.now(),
    soda: soda.value.trim(),
    provincia: provincia.value,
    plato: plato.value.trim(),
    calificacion: Number(document.querySelector('input[name="calificacion"]:checked').value),
    fecha: fecha.value,
    compa: compa.value || "Fui solo",
    volveria: volveria.checked,
    favorita: false
  });
  actualizar();
  form.reset();
  compa.value = "Fui solo";
});

filtroSelect.addEventListener("change", (e) => {
  filtro = e.target.value;
  actualizar();
});

contenedor.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-accion]");
  if (!btn) return;
  const id = Number(btn.closest(".tarjeta").dataset.id);
  const visita = visitas.find((v) => v.id === id);
  if (!visita) return;

  if (btn.dataset.accion === "favorita") {
    visita.favorita = !visita.favorita;
    actualizar();
  } else if (btn.dataset.accion === "borrar" && confirm(`¿Borrar "${visita.soda}"?`)) {
    visitas = visitas.filter((v) => v.id !== id);
    actualizar();
  }
});

// Arranque
(async function iniciar() {
  actualizar();
  try {
    actualizarSelectCompas(compa, avisoCompas, await obtenerCompasDeViaje());
  } catch {
    actualizarSelectCompas(compa, avisoCompas, [], "No se pudieron cargar los compas; podés registrar la visita como 'Fui solo'");
  }
})();
