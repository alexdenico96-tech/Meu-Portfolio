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


// ============================
// FORMULÁRIO DE CONTATO
// ============================

const formContato = document.getElementById('formContato');

formContato.addEventListener('submit', (evento) => {
  // evita o comportamento padrão do formulário, que é recarregar a página
  evento.preventDefault();

  // pega os valores digitados, removendo espaços em branco nas pontas
  const nome = formContato.nome.value.trim();
  const email = formContato.email.value.trim();
  const mensagem = formContato.mensagem.value.trim();

  // expressão regular simples para validar formato de email (algo@algo.algo)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nome === '' || email === '' || mensagem === '') {
    mostrarFeedback('Por favor, preencha todos os campos.', 'erro');
    return;
  }

  if (!regexEmail.test(email)) {
    mostrarFeedback('Digite um email válido.', 'erro');
    return;
  }

  // Por enquanto só simulamos o envio (sem back-end ainda).
  // No futuro aqui entraria uma chamada a um serviço como Formspree ou EmailJS.
  mostrarFeedback(`Obrigado, ${nome}! Sua mensagem foi recebida (simulação).`, 'sucesso');
  formContato.reset(); // limpa os campos do formulário
});

// Cria (ou reutiliza) um elemento de texto abaixo do formulário para mostrar o feedback
function mostrarFeedback(texto, tipo) {
  let feedback = document.getElementById('formFeedback');

  if (!feedback) {
    feedback = document.createElement('p');
    feedback.id = 'formFeedback';
    formContato.appendChild(feedback);
  }

  feedback.textContent = texto;
  feedback.style.color = tipo === 'erro' ? '#e63946' : '#2a9d8f';
  feedback.style.marginTop = '0.5rem';
  feedback.style.fontWeight = '600';
}