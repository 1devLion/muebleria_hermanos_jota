# E-commerce: Mueblería Hermanos Jota

E-commerce desarrollado como proyecto final de Sprint 1 y 2 de la certificación Full Stack Developer. Simula una experiencia de compra (catálogo, detalle de producto y carrito).

**Sitio en vivo:** [click aquí](https://1devlion.github.io/muebleria_hermanos_jota/)

---

## Integrantes

- [Alexis Antiñanco](github.com/1devLion)
- [Tamara Guidetti](github.com/Tamy594)
- [Martín Betancor](github.com/bentadev)
- [Ramiro Rosales](github.com/ramirosales52)
- [Puca Patiño Kevin Jonathan](github.com/KevinJPP)

---

## Descripción del proyecto

El sitio permite a un usuario navegar el catálogo de la mueblería, ver el detalle de cada producto (incluyendo materiales, acabado y garantía) y simular el armado de un carrito de compras. Los 11 productos, sus acabados y el programa de garantía se gestionan localmente mediante arrays de objetos en JavaScript.

### Funcionalidades principales

- **Home** con banner principal y productos destacados, cargados dinámicamente con una simulación de petición asíncrona
- **Catálogo** con la grilla completa de productos y buscador por nombre
- **Detalle de producto** con imagen, descripción completa, acabado, garantía y botón para añadir al carrito
- **Carrito simulado**, con contador visible en el header en todas las páginas, persistido con `localStorage`
- **Formulario de contacto** con validación del lado del cliente y mensaje de éxito
- **Diseño responsivo**, desarrollado con enfoque mobile-first

---

## Tecnologías utilizadas

- **HTML5:** estructura semántica de las 4 páginas
- **CSS3:** diseño responsivo con Flexbox, variables CSS para la identidad de marca
- **JavaScript (Vanilla):** manipulación del DOM, manejo de eventos, arrays de objetos como fuente de datos, carga asíncrona simulada
- **Git y GitHub:** control de versiones en equipo, con ramas por tarea y Pull Requests
- **GitHub Pages:** hosting del sitio desplegado