const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Aluno = require("../models/Aluno");
const Postagem = require("../models/Postagem");

// criando a conexao dos dados da configuraçao 
const conexao = new Sequelize(dbConfig);

Aluno.init(conexao);
Postagem.init(conexao);

// inicializando as associacoes
Aluno.associate(conexao.models);
Postagem.associate(conexao.models);

// exportamos a conexao 
module.exports = conexao;