# Meu Portfólio

Portfólio pessoal de Gerardo Silva, construído do zero com HTML, CSS e
JavaScript puro no front-end (sem frameworks), um backend em Node.js para
envio de email, e um assistente de IA integrado — projeto de aprendizado de
desenvolvimento full-stack, construído passo a passo.

🔗 **Site publicado:** https://alexdenico96-tech.github.io/Meu-Portfolio/
🔗 **Backend (API de contato):** https://meu-portfolio-6dcj.onrender.com
🔗 **Connor (assistente de IA):** https://connor-assistente.onrender.com — [repositório próprio](https://github.com/alexdenico96-tech/assistente-ia)

## 🚧 Status
Concluído e publicado — front-end no GitHub Pages, backend no Render,
formulário de contato enviando emails reais via Resend, e o Connor
respondendo perguntas sobre formação/experiência via widget flutuante.

## 🛠️ Tecnologias

**Front-end**
- HTML5 (tags semânticas)
- CSS3 (Flexbox, Grid, Media Queries, variáveis CSS, dark mode, glassmorphism)
- JavaScript Vanilla (DOM, Intersection Observer, Fetch API, localStorage)

**Back-end**
- Node.js + Express
- Resend (envio de email via API HTTPS)
- Deploy no Render

**IA**
- Connor: assistente de IA embutido via iframe (projeto próprio, veja abaixo)

## ✨ Funcionalidades
- Layout responsivo (desktop, tablet e mobile)
- Menu de navegação com botão hambúrguer no mobile
- Rolagem suave entre seções, com onda decorativa no hero
- Modo claro/escuro com persistência da escolha do visitante (localStorage)
- Seção de estatísticas com contador animado ao entrar na tela
- Seção de Formação e Experiência em formato de linha do tempo
- Formulário de contato com campo de assunto, validação (front e back-end) e envio real de email
- Foto vetorizada no hero, mantendo a identidade visual do site
- Widget flutuante do **Connor**, assistente de IA que responde perguntas
  sobre a formação, experiência e projetos, direto no portfólio

## 📋 Roadmap
- [x] Estrutura inicial, conteúdo real, estilização e responsividade
- [x] Menu responsivo, estatísticas animadas, ícones de redes sociais
- [x] Deploy no GitHub Pages
- [x] Foto vetorizada no hero
- [x] Dark mode com persistência
- [x] Backend próprio com envio real de email (via Resend, após migrar do SMTP direto)
- [x] Deploy do backend no Render
- [x] Seção de Formação e Experiência com conteúdo real do currículo
- [x] Paleta azul/roxo neon
- [x] Campo de assunto no formulário de contato
- [x] Widget flutuante do Connor (assistente de IA) integrado via iframe
- [ ] Projeto Artemis (assistente de pesquisa com busca na web) — planejado
- [ ] Adicionar novos projetos conforme forem ficando prontos

## 📁 Estrutura do projeto
```
Meu Portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── perfil-hero.png
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── README.md          (setup e deploy do backend de contato)
└── README.md               (este arquivo)
```

> O Connor (assistente de IA) é um **projeto separado**, com seu próprio
> repositório (`assistente-ia`) e deploy — o portfólio só carrega ele de fora,
> via `<iframe>` no widget flutuante. Isso evita misturar os arquivos dos
> dois projetos.

## 📬 Como o formulário de contato funciona
1. O visitante preenche o formulário no site (nome, email, assunto, mensagem — validação instantânea em JavaScript).
2. Os dados são enviados via `fetch` para a API do backend publicado no Render.
3. O backend valida novamente os dados e usa o **Resend** (API de email via HTTPS)
   para enviar um email real — trocamos do SMTP direto (Nodemailer + Gmail) porque
   o Render bloqueia conexões SMTP de saída no plano gratuito, causando timeout.
4. A mensagem chega direto na caixa de entrada, com "responder" já configurado
   para o email do visitante.

> Detalhes de configuração e deploy do backend estão em `backend/README.md`.

## 🤖 Como o Connor funciona
O Connor é um assistente de IA (API da Groq, modelo Llama 3.3) treinado com
um "system prompt" contendo a formação, experiência e projetos do Gerardo —
ele responde sobre isso na terceira pessoa, e redireciona qualquer pergunta
fora desse escopo (orçamento, detalhes técnicos de processo, etc.) para
contato direto pelo formulário.

O widget no portfólio carrega a página do Connor dentro de um `<iframe>`,
usando um parâmetro `?embed=1` na URL que faz a própria página do Connor
remover seu cabeçalho/cartão próprios — assim aparece só uma caixa (a do
widget), não duas empilhadas.

> Código-fonte, setup e mais detalhes no repositório
> [assistente-ia](https://github.com/alexdenico96-tech/assistente-ia).