import { truncateString } from '../scripts/utils.js';

const Card = (producto, addToCard) => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.id = `producto${producto.id}`;
  div.innerHTML = `
   <div class="cardImage">
    <img src=${producto.imagen} alt=${producto.nombre} title=${producto.nombre}>
   </div>
   <div class="cardInfo">
    <h4>${producto.nombre}</h4>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <p class="descripcion">${truncateString(producto.descripcion, 80)}</p>
    <button id="agregar${producto.id}" class="baseBtn">Agregar</button>
    <button id="comprar${producto.id}" class="baseBtn">Comprar</button>
   </div>
    `;
  // DOM:
  // const boton = document.getElementById(`agregar${producto.id}`);
  // boton.addEventListener('click', () => {
  //   if (addToCard && typeof addToCard === 'function') {
  //     addToCard(producto.id);
  //   }
  // });
  return div;
};

export default Card;
