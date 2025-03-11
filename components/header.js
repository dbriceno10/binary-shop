import { roles } from '/binary-shop/scripts/constants.js';
import { logout as logoutUser } from '/binary-shop/scripts/repository.js';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const div = document.createElement('div');
  div.className = 'headerAuth';
  let options = '';
  if (!user) {
    options = `<a href='/binary-shop/login.html'><button class="baseBtn">Login</button></a><a href='/binary-shop/register.html'><button class="baseBtn">Registro</button></a>`;
  } else {
    if (user.rol === roles.BUYER) {
      options = `<a href='/binary-shop/index.html'><button class="baseBtn">Inicio</button></a><a href='/binary-shop/update-user.html'><button class="baseBtn">Actualizar perfil</button></a><a href='/binary-shop/cart.html'><button class="baseBtn">Ir al carrito</button></a><button class="baseBtn" id="logout">Cerrar sesión</button>`;
    }
    if (user.rol === roles.SELLER) {
      options = `<a href='/binary-shop/seller.html'><button class="baseBtn">Inicio</button></a><button class="baseBtn" id="logout">Cerrar sesión</button>`;
    }
    if (user.rol === roles.ADMIN) {
      options = `<a href='/binary-shop/admin.html'><button class="baseBtn">Inicio</button></a><a href="/binary-shop/admin-users.html"><button class="baseBtn">Administrar usuarios</button></a><button class="baseBtn" id="logout">Cerrar sesión</button>`;
    }
  }
  div.innerHTML = `
    <a href='/'><img src="/binary-shop/assets/logo-full.png" alt="binary-shop" title="Volver al inicio" id="binary-shop"></a>
    <div>${options}</div>
  `;
  return div;
};

export const logoutEvent = () => {
  const logout = document.getElementById('logout');
  if (logout) {
    logout.addEventListener('click', () => {
      const confirmed = confirm('¿Estás seguro de cerrar sesión?');
      if (confirmed) {
        logoutUser();
      }
    });
  }
};

export default Header;
