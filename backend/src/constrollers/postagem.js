const Postagem = require("../models/Postagem");
const Aluno = require("../models/Aluno");
const { findAll } = require("../models/Postagem");

module.exports = {

    async store(req, res) {

        const created_aluno_id = req.alunoId;

        const { titulo, descricao, imagem, gists } = req.body;

        try {
            const aluno = await Aluno.findByPk(created_aluno_id);

            if (!aluno) {
                res.status(404).send({ erro: "aluno não encontrado" })
            }
            aluno.createPostagem({
                titulo,
                descricao,
                imagem,
                gists,
                created_aluno_id
            })

            let post = await Postagem.create({
                titulo,
                descricao,
                imagem,
                gists,
                created_aluno_id
            });
            res.status(201).send(post);

        } catch (error) {
            return res.status(500).send({ erro: "Não foi possivel adicionar a postagem, tente novamente mais tarde" });
        }


    },

    async listar(req, res) {
        let postagem = await Postagem.findAll({
            include: {
                association: "Aluno",
                attributes: ["id", "nome", "ra"],
            },
            order: [
                ["created_at", "DESC"]
            ],
        });

        res.send(postagem);
    },

    async detete(req, res) {
        // pegando o id do aluno logado 
        const created_aluno_id = req.alunoId;

        // pegando o id do post que sera apagado 
        const { id } = req.params;

        // procura o post pelo id
        let postagem = await Postagem.findByPk(id);

        //verifica se a postagem existe  
        if (!postagem) {
            return res.status(404).send({ erro: "Postagem Não Encontrada" });
        }


        // verifica se o aluno logado é o aluno que criou a postagem
        if (postagem.created_aluno_id != created_aluno_id) {
            return res.status(401).send({ erro: "Não autorizado Para delete" });
        }
        await postagem.destroy();
        res.status(204).send();

    },
};