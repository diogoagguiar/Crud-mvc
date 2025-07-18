const express = require('express');
const path = require('path');
const livroRoutes = require('./app/routes/livroRoutes'); // Importar as rotas de livro
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

// Middleware para analisar corpos de requisição URL-encoded (formulários HTML)
app.use(express.urlencoded({ extended: true }));
// Middleware para servir arquivos estáticos (CSS, JS, imagens)
app.use(express.static('public'));

// Usar as rotas de livro
app.use('/livros', livroRoutes);

// Redirecionar a raiz para a lista de livros
app.get('/', (req, res) => res.redirect('/livros'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor de Livros rodando em http://localhost:${PORT}`));