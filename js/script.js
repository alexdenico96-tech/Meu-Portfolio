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
// DARK MODE (COM PERSISTÊNCIA)
// ============================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// 1) Ao carregar a página, decide qual tema usar:
//    prioridade: escolha salva pelo usuário > preferência do sistema operacional > claro
function aplicarTemaInicial() {
  const temaSalvo = localStorage.getItem('tema');

  if (temaSalvo) {
    definirTema(temaSalvo);
    return;
  }

  const prefereSistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  definirTema(prefereSistemaEscuro ? 'dark' : 'light');
}

// 2) Aplica o tema no HTML e atualiza o ícone do botão
function definirTema(tema) {
  if (tema === 'dark') {
    html.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️'; // mostra sol = "clique para clarear"
  } else {
    html.removeAttribute('data-theme');
    themeIcon.textContent = '🌙'; // mostra lua = "clique para escurecer"
  }
}

// 3) Ao clicar, alterna o tema e SALVA a escolha no navegador do visitante
//    (localStorage persiste mesmo depois de fechar o navegador)
themeToggle.addEventListener('click', () => {
  const temaAtual = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
  definirTema(novoTema);
  localStorage.setItem('tema', novoTema);
});

aplicarTemaInicial();


// ============================
// WIDGET FLUTUANTE DO CONNOR
// ============================

const connorBotao = document.getElementById('connorBotao');
const connorPainel = document.getElementById('connorPainel');
const connorFechar = document.getElementById('connorFechar');
const connorIframe = document.getElementById('connorIframe');

function alternarConnor() {
  const estaAberto = connorPainel.classList.toggle('aberto');

  // Só carrega o iframe na PRIMEIRA vez que o painel abre — assim a página
  // do portfólio não gasta recursos carregando o chat se ninguém for usá-lo,
  // e não "acorda" o backend gratuito do Render sem necessidade.
  //
  // IMPORTANTE: usamos getAttribute('src') em vez de connorIframe.src aqui.
  // Isso porque a PROPRIEDADE .src de um iframe com src="" vazio no HTML
  // retorna a URL da própria página atual (não uma string vazia!), então
  // "!connorIframe.src" nunca seria verdadeiro. O ATRIBUTO, checado com
  // getAttribute, reflete exatamente o que está escrito no HTML.
  if (estaAberto && !connorIframe.getAttribute('src')) {
    connorIframe.src = connorIframe.dataset.src;
  }
}

connorBotao.addEventListener('click', alternarConnor);
connorFechar.addEventListener('click', alternarConnor);


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

// Endereço do backend publicado no Render.
const URL_BACKEND = 'https://meu-portfolio-6dcj.onrender.com/api/contato';

formContato.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const nome = formContato.nome.value.trim();
  const email = formContato.email.value.trim();
  const mensagem = formContato.mensagem.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nome === '' || email === '' || mensagem === '') {
    mostrarFeedback('Por favor, preencha todos os campos.', 'erro');
    return;
  }

  if (!regexEmail.test(email)) {
    mostrarFeedback('Digite um email válido.', 'erro');
    return;
  }

  const botaoEnviar = formContato.querySelector('button[type="submit"]');
  const textoOriginalBotao = botaoEnviar.textContent;
  botaoEnviar.textContent = 'Enviando...';
  botaoEnviar.disabled = true;

  try {
    const resposta = await fetch(URL_BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, mensagem }),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.erro || 'Erro ao enviar mensagem.');
    }

    mostrarFeedback(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`, 'sucesso');
    formContato.reset();
  } catch (erro) {
    mostrarFeedback('Não foi possível enviar agora. Tente novamente em instantes.', 'erro');
    console.error(erro);
  } finally {
    botaoEnviar.textContent = textoOriginalBotao;
    botaoEnviar.disabled = false;
  }
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