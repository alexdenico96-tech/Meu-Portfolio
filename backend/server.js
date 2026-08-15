// ============================
// BACKEND DO FORMULÁRIO DE CONTATO
// ============================
// Recebe os dados do formulário do portfólio e envia um email de verdade.
//
// IMPORTANTE: usamos o Resend (API de email via HTTPS) em vez de conectar
// direto num servidor SMTP (como o Gmail). Isso porque o Render, no plano
// gratuito, bloqueia conexões SMTP de saída — então o Nodemailer sempre
// dava timeout, mesmo com as credenciais certas. A API do Resend funciona
// por uma chamada HTTPS normal, que nunca é bloqueada.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3000;

// Permite que o navegador (rodando em outro domínio, ex: GitHub Pages)
// consiga chamar essa API. Sem isso, o navegador bloqueia a requisição por segurança (CORS).
app.use(cors());
app.use(express.json());

// Cliente do Resend, autenticado com a chave de API (guardada no .env, nunca no código)
const resend = new Resend(process.env.RESEND_API_KEY);

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
    const resultado = await resend.emails.send({
      // "onboarding@resend.dev" é um remetente de teste que o Resend libera
      // sem precisar verificar domínio próprio — funciona por padrão.
      from: 'Portfólio <onboarding@resend.dev>',
      to: process.env.EMAIL_USER, // chega na sua caixa de entrada
      reply_to: email, // se você clicar "Responder", vai direto pro visitante
      subject: `Nova mensagem de ${nome} pelo portfólio`,
      html: `
        <h3>Nova mensagem pelo formulário do portfólio</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (resultado.error) {
      throw new Error(resultado.error.message);
    }

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