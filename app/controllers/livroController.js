const { body, validationResult } = require("express-validator");
const Livro = require("../models/livroModel");

exports.index = async (req, res) => {
  const [livros] = await Livro.findAll();
  res.render("livros/index", { livros });
};

exports.createForm = (req, res) => {
  res.render("livros/create", { errors: [], old: {} });
};

exports.create = [
  body("ISBN")
    .isLength({ min: 10, max: 13 })
    .withMessage("ISBN deve ter entre 10 e 13 caracteres")
    .matches(
      /^(?:ISBN(?:-13)?:?)(?=[0-9]{13}$)([0-9]{3}-){2}[0-9]{3}[0-9X]$|^[0-9]{10}$|^[0-9]{13}$/
    )
    .withMessage("ISBN inválido"),
  body("nome_livro").notEmpty().withMessage("Nome do livro é obrigatório"),
  body("autor_livro").notEmpty().withMessage("Nome do autor é obrigatório"),
  body("ano_publicacao")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Ano de publicação inválido"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("livros/create", {
        errors: errors.array(),
        old: req.body,
      });
    }
    try {
      await Livro.create(req.body);
      req.flash("success", "Livro criado com sucesso!");
      res.redirect("/livros");
    } catch (error) {
      let errorMessage = "Erro ao criar livro.";
      if (error.code === "ER_DUP_ENTRY") {
        errorMessage = "O ISBN fornecido já existe.";
      }
      return res.render("livros/create", {
        errors: [{ msg: errorMessage }],
        old: req.body,
      });
    }
  },
];

exports.editForm = async (req, res) => {
  const [result] = await Livro.findByIsbn(req.params.isbn);
  const livro = result[0];
  if (!livro) {
    req.flash("error", "Livro não encontrado.");
    return res.redirect("/livros");
  }
  res.render("livros/edit", { livro, errors: [] });
};

exports.update = [
  body("nome_livro").notEmpty().withMessage("Nome do livro é obrigatório"),
  body("autor_livro").notEmpty().withMessage("Nome do autor é obrigatório"),
  body("ano_publicacao")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Ano de publicação inválido"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const livro = { ...req.body, ISBN: req.params.isbn };
      return res.render("livros/edit", { livro, errors: errors.array() });
    }
    await Livro.update(req.params.isbn, req.body);
    req.flash("success", "Livro atualizado com sucesso!");
    res.redirect("/livros");
  },
];

exports.remove = async (req, res) => {
  await Livro.delete(req.params.isbn);
  req.flash("success", "Livro excluído com sucesso!");
  res.redirect("/livros");
};
