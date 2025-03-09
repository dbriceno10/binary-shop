import Card from './card.js';

const CardContainer = (
  contenedorProductos,
  productos,
  textA,
  textB,
  isCart
) => {
  productos.forEach((producto) => {
    contenedorProductos.appendChild(Card(producto, textA, textB, isCart));
  });
  return contenedorProductos;
};

export default CardContainer;
