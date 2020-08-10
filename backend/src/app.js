const express = require('express');
const rotas = require('./routes');
require("./database")


// iniciando a aplicação
const app = express();

// informa que nas requisuições podem vir em formato json
app.use(express.json());

// cadastrando as rotas
app.use(rotas);

// exportando a configuracao 
module.exports = app;