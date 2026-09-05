// Construye la card de un producto y devuelve el elemento DOM.
export function createProductCard(producto) {
  const card = document.createElement('article');
  card.classList.add('product-card');

  const img = document.createElement('img');
  img.classList.add('product-card-image');
  img.src = producto.image;
  img.alt = producto.name;

  const info = document.createElement('div');
  info.classList.add('product-card-info');

  const name = document.createElement('h3');
  name.classList.add('product-card-name');
  name.textContent = producto.name;

  const description = document.createElement('p');
  description.classList.add('product-card-description');
  description.textContent = producto.description;

  const price = document.createElement('p');
  price.classList.add('product-card-price');
  price.textContent = `$${producto.price.toLocaleString('es-AR')}`;

  const link = document.createElement('a');
  link.classList.add('product-card-link');
  link.href = `producto.html?id=${producto.id}`;
  link.textContent = 'Ver producto';

  info.append(name, description, price, link);
  card.append(img, info);

  return card;
}
