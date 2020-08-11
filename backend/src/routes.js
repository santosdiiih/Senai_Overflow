// esse arquivo tem como responsbilidade de cadastrar as rotas

// importando o express 
const express = require("express");

// criando o routeirizador para as rotas 
const routes = express.Router();

const alunoController = require("./constrollers/aluno");
const postagemController = require("./constrollers/postagem");

// rotas de usuario 
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.get("/alunos", alunoController.listar);
routes.post("/alunos", alunoController.store);

// rotas de postagem 
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.detete);

module.exports = routes;