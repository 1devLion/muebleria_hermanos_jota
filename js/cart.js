// Recupera el carrito guardado en localStorage, o arranca vacío.
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Guarda el estado actual del carrito en localStorage.
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar un producto al carrito (si ya existe, aumenta su cantidad).
export function addToCart(producto) {
  let productoEncontrado = false;

  for (let indice = 0; indice < carrito.length; indice++) {
    if (carrito[indice].producto.id === producto.id) {
      carrito[indice].cantidad = carrito[indice].cantidad + 1;
      productoEncontrado = true;
      break;
    }
  }

  if (productoEncontrado === false) {
    const nuevoItem = {
      producto: producto,
      cantidad: 1,
    };
    carrito.push(nuevoItem);
  }

  guardarCarrito();
}

// Función que suma las cantidades de todos los productos del carrito.
export function obtenerCantidadCarrito() {
  let cantidadTotal = 0;

  for (let indice = 0; indice < carrito.length; indice++) {
    cantidadTotal = cantidadTotal + carrito[indice].cantidad;
  }

  return cantidadTotal;
}

// Función que devuelve todos los productos que contiene el carrito.
export function obtenerCarrito() {
  return carrito;
}
