const { Op } = require("sequelize");
const Aluno = require("../models/Aluno");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = {
    // listagem de informações cadastradas
    async listar(req, res) {
        let alunos = await Aluno.findAll({ raw: true });

        delete alunos.senha;

        res.send(alunos);
    },

    // buscar aluno pelo id
    async buscarPorId(req, res) {
        const { id } = req.params;

        let aluno = await Aluno.findByPk(id, { raw: true });
        // verifica se o aluno existe 
        if (!aluno) {
            return res.status(404).send({ erro: "Aluno Não encontrado" });
        }

        delete aluno.senha;

        // retorna o aluno encontrado
        res.send(aluno);
    },

    // insercao de dados 
    async store(req, res) {

        const { ra, nome, email, senha } = req.body;

        // verificar se o aluno ja existe no banco 
        let aluno = await Aluno.findOne({
            where: {
                [Op.or]: [
                    { ra: ra },
                    { email: email }
                ]
            }
        });

        if (aluno) {
            return res.status(400).send({ erro: "aluno já cadastrado" })
        }

        // criptografando a senha do usuario 
        const senhaCript = await bcrypt.hash(senha, 10);

        // cadastrar aluno no banco de dados
        aluno = await Aluno.create({ ra, nome, email, senha: senhaCript });

        const token = jwt.sign({ alunoId: aluno.id }, authConfig.secret);

        res.status(201).send({
            aluno: {
                alunoId: aluno.id,
                nome: aluno.nome,
                ra: aluno.ra
            },
            token
        });

    },
    // atualização de dados 
    updated() {

    },

    // apagar dados 
    delete() {}
}