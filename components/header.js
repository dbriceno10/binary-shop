const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const div = document.createElement('div');
  div.className = 'headerAuth';
  let options = '';
  if (!user) {
    options = `<div><a href='../login.html'><button class="baseBtn">Login</button></a><a href='../register.html'><button class="baseBtn">Registro</button></a></div>`;
  }
  div.innerHTML = `
    <a href='/'><img src="../assets/logo-full.png" alt="binary-shop" id="binary-shop"></a>
    ${options}
  `;
  return div;
};

export default Header;
