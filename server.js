const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const flash = require("connect-flash");

const livroRoutes = require("./app/routes/livroRoutes");

dotenv.config();

const app = express();

// Configurar EJS como template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

// Middleware para analisar dados de formulário (URL-encoded)
app.use(express.urlencoded({ extended: true }));

// Middleware para servir arquivos estáticos (CSS, imagens, JS)
app.use(express.static("public"));

// Configurar sessão e flash
app.use(
  session({
    secret: "secreto-livros", // Você pode trocar por uma string segura
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

// Middleware para tornar as mensagens disponíveis nas views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.errors = req.flash("error");
  next();
});

// Rotas
app.use("/livros", livroRoutes);

// Redirecionar raiz para /livros
app.get("/", (req, res) => res.redirect("/livros"));

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de Livros rodando em http://localhost:${PORT}`);
});
