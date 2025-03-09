import Card from './card.js';

const CardContainer = (productos, textA, textB, isCard) => {
  const contenedorProductos = document.getElementById('contenedor-productos');
  contenedorProductos.innerHTML = '';
  productos.forEach((producto) => {
    contenedorProductos.appendChild(Card(producto, textA, textB, isCard));
  });
  return contenedorProductos;
};

export default CardContainer;
