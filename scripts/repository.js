import { getUsers, findUser, getProducts, getCart } from './dao.js';

export const registerUser = async (user) => {
  const users = await getUsers();
  const userExists = await findUser(user.username);
  if (userExists) {
    alert('El usuario ya esta registrado');
    return false;
  } else {
    user.id = new Date().getTime();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  }
};

export const addProductToCard = (product) => {
  let products = [];
  const auxProduct = { ...product };
  if (!localStorage.getItem('carrito')) {
    auxProduct.cantidad = 1;
    products.push(auxProduct);
    localStorage.setItem('carrito', JSON.stringify(products));
    alert('Producto agregado al carrito');
  } else {
    products = JSON.parse(localStorage.getItem('carrito'));
    const findIndex = products?.findIndex((prod) => prod.id === auxProduct.id);
    if (findIndex !== -1) {
      if (products[findIndex].cantidad + 1 > product.cantidad) {
        alert('No hay suficiente stock');
      } else {
        products[findIndex].cantidad++;
        localStorage.setItem('carrito', JSON.stringify(products));
        alert('Producto agregado al carrito');
      }
    } else {
      auxProduct.cantidad = 1;
      products.push(auxProduct);
      localStorage.setItem('carrito', JSON.stringify(products));
      alert('Producto agregado al carrito');
    }
  }
  return products;
};

export const addProduct = async (product) => {
  const productos = await getProducts();
  const cartProducts = getCart();
  const producto = productos?.find((prod) => prod.id === product.id);
  const index = cartProducts?.findIndex((prod) => prod.id === product.id);
  if (cartProducts[index].cantidad + 1 > producto.cantidad) {
    alert('No hay suficiente stock');
  } else {
    cartProducts[index].cantidad++;
    localStorage.setItem('carrito', JSON.stringify(cartProducts));
  }
};

export const removeProduct = (product) => {
  const cartProducts = getCart();
  const index = cartProducts?.findIndex((prod) => prod.id === product.id);
  if (cartProducts[index].cantidad < 1) {
    localStorage.setItem(
      'carrito',
      JSON.stringify(cartProducts?.filter((prod) => prod.id !== product.id))
    );
  } else {
    cartProducts[index].cantidad--;
    localStorage.setItem('carrito', JSON.stringify(cartProducts));
  }
};
