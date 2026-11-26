# Pasaporte Gallo Pinto — Trueno

App web para registrar las visitas de Trueno a las sodas de las siete provincias de Costa Rica.

## Enlaces

* **Sitio publicado:** (https://msotobr-13.github.io/pasaporte-gallo-pinto/)
* **Repositorio:** https://github.com/msotobr-13/pasaporte-gallo-pinto

## Uso

1. Completá el formulario **Registrar visita** y guardá.
2. Filtrá por provincia, marcá **Favorita** o borrá visitas desde **Mi Pasaporte**.

## Estructura

```text
pasaporte-gallo-pinto/
├── index.html
├── README.md
├── css/estilos.css
└── js/
    ├── storage.js   # Persistencia con localStorage
    ├── api.js       # Consulta fetch a JSONPlaceholder
    ├── ui.js        # Renderizado seguro en el DOM
    └── app.js       # Estado, validación y eventos
```

## API y Declaración de IA

* **API:** `https://jsonplaceholder.typicode.com/users`
* **IA:** Utilizada como apoyo para simplificar estilos y estructura.
