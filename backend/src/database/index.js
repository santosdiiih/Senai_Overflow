const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const Aluno = require("../models/Aluno");

// criando a conexao dos dados da configuraçao 
const conexao = new Sequelize(dbConfig);

Aluno.init(conexao);

// exportamos a conexao 
module.exports = conexao;