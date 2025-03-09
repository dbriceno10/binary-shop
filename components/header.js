const Header = () => {
  const div = document.createElement('div');
  div.className = 'headerAuth';
  div.innerHTML = `
    <img src="../assets/logo-full.png" alt="binary-shop" id="binary-shop">
    <div><a href='../pages/login.html'><button class="baseBtn">Login</button></a><button class="baseBtn">Registro</button></div>
  `;
  return div;
};

export default Header;
