// Array que guarda los productos que la persona agrega al carrito.
const carrito = [];

// Función par agregar un producto al carrito (si ya existe, aumenta su cantidad).
function agregarAlCarrito(producto) {
  let productoEncontrado = false;

  // Ciclo para recorrer todos los productos que ya están en el carrito.
  for (let indice = 0; indice < carrito.length; indice++) {
    if (carrito[indice].producto.id === producto.id) {
      carrito[indice].cantidad = carrito[indice].cantidad + 1;
      productoEncontrado = true;
      break;
    }
  }

  // Condicional para agregar un nuevo producto.
  if (productoEncontrado === false) {
    const nuevoItem = {
      producto: producto,
      cantidad: 1,
    };

    carrito.push(nuevoItem);
  }
}

// Función que suma las cantidades de todos los productos del carrito.
function obtenerCantidadCarrito() {
  let cantidadTotal = 0;

  // Ciclo para recorrer todos los productos que están en el carrito.
  for (let indice = 0; indice < carrito.length; indice++) {
    cantidadTotal = cantidadTotal + carrito[indice].cantidad;
  }

  return cantidadTotal;
}

// Función que devuelve todos los productos que contiene el carrito.
function obtenerCarrito() {
  return carrito;
}
