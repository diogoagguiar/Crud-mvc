const db = require('../../config/db');

module.exports = {
    findAll() {
        return db.query('SELECT * FROM livros');
    },
    findByIsbn(isbn) {
        return db.query('SELECT * FROM livros WHERE ISBN = ?', [isbn]);
    },
    create(livro) {
        return db.query('INSERT INTO livros (ISBN, nome_livro, nome_editora, autor_livro, ano_publicacao, assunto) VALUES (?, ?, ?, ?, ?, ?)',
            [livro.ISBN, livro.nome_livro, livro.nome_editora, livro.autor_livro, livro.ano_publicacao, livro.assunto]);
    },
    update(isbn, livro) {
        return db.query('UPDATE livros SET nome_livro = ?, nome_editora = ?, autor_livro = ?, ano_publicacao = ?, assunto = ? WHERE ISBN = ?',
            [livro.nome_livro, livro.nome_editora, livro.autor_livro, livro.ano_publicacao, livro.assunto, isbn]);
    },
    delete(isbn) {
        return db.query('DELETE FROM livros WHERE ISBN = ?', [isbn]);
    }
};