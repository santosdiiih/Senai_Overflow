const aluno = require("../models/Aluno");
const Aluno = require("../models/Aluno");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = {
    async store(req, res) {

        const { email, senha } = req.body;

        // verifica se o aluno existe e se a senha esta correta 
        const aluno = await Aluno.findOne({
            where: {
                email,
            },
        });

        // se não existir retorna erro 
        if (!aluno || !await bcrypt.compare(senha, aluno.senha)) {
            return res.status(403).send({ erro: "Usuario ou Senha incorreta" });
        }

        const token = jwt.sign({ alunoId: aluno.id }, authConfig.secret);

        // se existir e a senha correta retorna ok com o token  
        res.status(201).send({
            aluno: {
                alunoId: aluno.id,
                nome: aluno.nome,
                ra: aluno.ra
            },
            token
        });
    },
}