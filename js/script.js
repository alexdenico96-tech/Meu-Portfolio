// ============================
// MENU RESPONSIVO (HAMBÚRGUER)
// ============================

// Pegamos os elementos do DOM pelo id que definimos no HTML
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

// Ao clicar no botão, alterna (toggle) a classe "ativo" no menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('ativo');
});

// Fecha o menu automaticamente ao clicar em um link
// (útil no mobile: sem isso, o menu ficaria aberto após navegar)
const links = navLinks.querySelectorAll('a');
links.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('ativo');
  });
});