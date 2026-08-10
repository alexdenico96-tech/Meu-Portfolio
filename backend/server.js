// ============================
// BACKEND DO FORMULÁRIO DE CONTATO
// ============================
// Recebe os dados do formulário do portfólio e envia um email de verdade
// usando o Nodemailer (biblioteca que fala com um servidor SMTP, no caso o do Gmail).

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Permite que o navegador (rodando em outro domínio, ex: GitHub Pages)
// consiga chamar essa API. Sem isso, o navegador bloqueia a requisição por segurança (CORS).
app.use(cors());
app.use(express.json());

// "Transporter" é o objeto do Nodemailer responsável por conectar no servidor
// de email e efetivamente enviar a mensagem. As credenciais vêm de variáveis
// de ambiente (.env) — NUNCA colocamos senha direto no código.
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // seu email (alexdenico96@gmail.com)
    pass: process.env.EMAIL_PASS, // "senha de app" do Gmail (não é sua senha normal, explico abaixo)
  },
});

// Expressão regular simples para validar formato de email
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.post('/api/contato', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  // Validação no back-end: NUNCA confie só na validação do navegador,
  // qualquer pessoa pode chamar essa API diretamente sem passar pelo seu HTML.
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }

  if (!regexEmail.test(email)) {
    return res.status(400).json({ erro: 'Email inválido.' });
  }

  try {
    await transporter.sendMail({
      from: `"Portfólio - ${nome}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // chega na sua caixa de entrada
      replyTo: email, // se você clicar "Responder", vai direto pro visitante
      subject: `Nova mensagem de ${nome} pelo portfólio`,
      text: mensagem,
      html: `
        <h3>Nova mensagem pelo formulário do portfólio</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.status(200).json({ sucesso: true });
  } catch (erro) {
    console.error('Erro ao enviar email:', erro);
    res.status(500).json({ erro: 'Não foi possível enviar a mensagem. Tente novamente mais tarde.' });
  }
});

app.get('/', (req, res) => {
  res.send('Backend do portfólio está rodando.');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});