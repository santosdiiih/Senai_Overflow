// esse arquivo tem como responsbilidade de cadastrar as rotas

// importando o express 
const express = require("express");

// criando o routeirizador para as rotas 
const routes = express.Router();

const alunoController = require("./constrollers/aluno");
const postagemController = require("./constrollers/postagem");
const comentarioController = require("./constrollers/comentario");
const sessaoController = require("./constrollers/sessao");
const autorizacaoMid = require("./middlewares/autorizacao");

// rotas publicas 
// rota de autenticação
routes.post("/sessao", sessaoController.store);
routes.post("/alunos", alunoController.store);

// middleware de proteção das rotas 
routes.use(autorizacaoMid);

// rotas de usuario 
routes.get("/alunos/:id", alunoController.buscarPorId);
routes.get("/alunos", alunoController.listar);


// rotas de postagem 
routes.post("/postagens", postagemController.store);
routes.delete("/postagens/:id", postagemController.detete);
routes.get("/postagens", postagemController.listar);

// rotas de comentario 
routes.post("/postagens/:postId/comentarios", comentarioController.store);
routes.get("/postagens/:postId/comentarios", comentarioController.listar);

module.exports = routes;