# Meu Portfólio

Portfólio pessoal construído do zero com HTML, CSS e JavaScript puro no front-end
(sem frameworks) e um pequeno backend em Node.js para envio de email — projeto de
aprendizado de desenvolvimento full-stack, construído passo a passo.

🔗 **Site publicado:** https://SEU_USUARIO.github.io/portfolio/
🔗 **Backend (API de contato):** https://meu-portfolio-6dcj.onrender.com

## 🚧 Status
Concluído e publicado — front-end no GitHub Pages, backend no Render, formulário de contato enviando emails reais via Resend.

## 🛠️ Tecnologias

**Front-end**
- HTML5 (tags semânticas)
- CSS3 (Flexbox, Grid, Media Queries, variáveis CSS, dark mode)
- JavaScript Vanilla (DOM, Intersection Observer, Fetch API, localStorage)

**Back-end**
- Node.js + Express
- Nodemailer (envio de email via SMTP do Gmail)
- Deploy no Render

## ✨ Funcionalidades
- Layout responsivo (desktop, tablet e mobile)
- Menu de navegação com botão hambúrguer no mobile
- Rolagem suave entre seções
- Modo claro/escuro com persistência da escolha do visitante (localStorage)
- Seção de estatísticas com contador animado ao entrar na tela
- Formulário de contato com validação (front e back-end) e envio real de email
- Foto vetorizada no hero, mantendo a identidade visual do site

## 📋 Roadmap
- [x] Estrutura inicial do projeto
- [x] Estrutura HTML das seções
- [x] Estilização e responsividade
- [x] Menu responsivo
- [x] Estatísticas animadas
- [x] Formulário de contato
- [x] Ícones de redes sociais
- [x] Deploy no GitHub Pages
- [x] Conteúdo real (formação e projetos)
- [x] Foto vetorizada no hero
- [x] Dark mode com persistência
- [x] Backend próprio com envio real de email
- [x] Deploy do backend no Render
- [x] Seção de Formação e Experiência
- [x] Corrigir timeout no envio de email (migrado de SMTP para Resend)
- [ ] Preencher Formação e Experiência com conteúdo real
- [ ] Adicionar novos projetos conforme forem ficando prontos

## 📁 Estrutura do projeto
```
portfolio/
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
│   └── README.md          (setup e deploy do backend)
└── README.md               (este arquivo)
```

## 📬 Como o formulário de contato funciona
1. O visitante preenche o formulário no site (validação instantânea em JavaScript).
2. Os dados são enviados via `fetch` para a API do backend publicado no Render.
3. O backend valida novamente os dados e usa o **Resend** (API de email via HTTPS)
   para enviar um email real — trocamos do SMTP direto (Nodemailer + Gmail) porque
   o Render bloqueia conexões SMTP de saída no plano gratuito, causando timeout.
4. A mensagem chega direto na caixa de entrada, com "responder" já configurado
   para o email do visitante.

> Detalhes de configuração e deploy do backend estão em `backend/README.md`.