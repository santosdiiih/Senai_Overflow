// esse arquivo tem como responsbilidade de cadastrar as rotas

// importando o express 
const express = require("express");

// criando o routeirizador para as rotas 
const routes = express.Router();

const alunoController = require("./constrollers/aluno");

// rota para cadastro 
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.get("/alunos", alunoController.listar);
routes.post("/alunos", alunoController.store);

module.exports = routes;