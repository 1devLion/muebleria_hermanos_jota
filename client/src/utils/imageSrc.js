// imagenUrl puede ser una ruta relativa (img/products/x.webp) o una URL absoluta.
export function imageSrc(url) {
  if (!url) return "/img/ui/logo.svg"; // placeholder si el producto no tiene imagen
  return url.startsWith("http") ? url : `/${url.replace(/^\//, "")}`;
}
