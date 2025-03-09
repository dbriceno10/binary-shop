import Card from './card.js';

const CardContainer = (productos, textA, textB, isCart) => {
  const contenedorProductos = document.getElementById('contenedor-productos');
  productos.forEach((producto) => {
    contenedorProductos.appendChild(Card(producto, textA, textB, isCart));
  });
  return contenedorProductos;
};

export default CardContainer;
