export const getProducts = async () => {
  let products = [];
  if (localStorage.getItem('products')) {
    products = JSON.parse(localStorage.getItem('products'));
  } else {
    const data = await fetch('../database/productos.json');
    products = await data.json();
    localStorage.setItem('products', JSON.stringify(products));
  }
  return products;
};

export const getUsers = async () => {
  let users = [];
  if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
  } else {
    const response = await fetch('../database/usuarios.json');
    users = await response.json();
    localStorage.setItem('users', JSON.stringify(users));
  }
  return users;
};

export const findUser = async (username) => {
  const users = await getUsers();
  const user = users.find((user) => user.username === username);
  return user;
};

export const loginUser = async (username, password) => {
  const user = await findUser(username);
  if (user && user.password === password) {
    const { password, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
    return user;
  } else {
    alert('Usuario o contraseña incorrectos');
    return false;
  }
};

export const getCart = () => JSON.parse(localStorage.getItem('carrito')) || [];
