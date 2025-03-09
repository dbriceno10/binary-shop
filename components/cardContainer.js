import Card from './card.js';

const CardContainer = (productos, addToCard) => {
  const contenedorProductos = document.getElementById('contenedor-productos');
  productos.forEach((producto) => {
    contenedorProductos.appendChild(Card(producto, addToCard));
  });
  return contenedorProductos;
};

export default CardContainer;
