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


// ============================
// ESTATÍSTICAS ANIMADAS (CONTADOR)
// ============================

// Pega todos os elementos com a classe .stat-numero (os 3 números da seção)
const numeros = document.querySelectorAll('.stat-numero');

// Função que anima um único número de 0 até o valor alvo
function animarContador(elemento) {
  const alvo = parseInt(elemento.dataset.alvo); // lê o atributo data-alvo="50" como número
  const duracao = 1500; // duração total da animação, em milissegundos
  const fps = 60; // quadros por segundo, pra animação ficar suave
  const totalFrames = Math.round(duracao / (1000 / fps));
  let frame = 0;

  const intervalo = setInterval(() => {
    frame++;
    // progresso vai de 0 até 1 conforme os frames avançam
    const progresso = frame / totalFrames;
    const valorAtual = Math.round(alvo * progresso);
    elemento.textContent = valorAtual;

    if (frame === totalFrames) {
      clearInterval(intervalo); // para o loop quando a animação termina
      elemento.textContent = alvo; // garante que termine exatamente no valor certo
    }
  }, 1000 / fps);
}

// Cria o "observador": ele vai vigiar quando os elementos entram na tela
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      // entry.isIntersecting é true quando o elemento está visível na tela
      if (entry.isIntersecting) {
        animarContador(entry.target);
        // para de observar depois de animar uma vez (evita repetir o efeito)
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 } // dispara quando 50% do elemento estiver visível
);

// Manda o observador vigiar cada número da seção de estatísticas
numeros.forEach((numero) => observer.observe(numero));