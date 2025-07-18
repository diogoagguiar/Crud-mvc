CREATE DATABASE crud_livro;
USE crud_livro;

CREATE TABLE livros (
    ISBN VARCHAR(13) PRIMARY KEY, -- ISBN como chave primária
    nome_livro VARCHAR(255) NOT NULL,
    nome_editora VARCHAR(100),
    autor_livro VARCHAR(100) NOT NULL,
    ano_publicacao INT,
    assunto VARCHAR(100)
);