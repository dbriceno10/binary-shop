import { createProduct } from './repository.js';
import { validateProduct } from './utils.js';

import Header, { logoutEvent } from '../components/header.js';

const header = document.getElementById('header');
header.appendChild(Header());
logoutEvent();

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const user = JSON.parse(localStorage.getItem('user'));
  const nombre = document.getElementById('nombre').value;
  const descripcion = document.getElementById('descripcion').value;
  const precio = document.getElementById('precio').value;
  const cantidad = document.getElementById('cantidad').value;
  const imagen = document.getElementById('imagen').files[0]; // Obtener el archivo de imagen
  const reader = new FileReader();
  reader.onload = async (e) => {
    const imageUrl = e.target.result;
    const newProduct = {
      nombre,
      descripcion,
      precio,
      cantidad,
      imagen: imageUrl,
    };
    const errorMessge = validateProduct(newProduct);
    if (errorMessge) {
      alert(errorMessge);
    } else {
      const response = await createProduct(newProduct, user);
      if (response) {
        form.reset();
        window.location.href = '/binary-shop/seller.html';
      }
    }
  };
  reader.readAsDataURL(imagen);
});
