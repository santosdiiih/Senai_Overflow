const Comentario = require("../models/Comentario");
const Aluno = require("../models/Aluno");
const Postagem = require("../models/Postagem");

module.exports = {
    async store(req, res) {
        const aluno_id = req.alunoId;

        const { postId } = req.params;

        const { descricao } = req.body;

        let postagem = await Postagem.findByPk(postId);

        if (!postagem) {
            return res.status(404).send({ erro: "Post nâo encontrado" });
        }

        let comentario = await postagem.createComentario({
            descricao,
            aluno_id: aluno_id,
        });

        comentario = comentario.dataValues;

        comentario.postagem_id = comentario.PostagemId;

        delete comentario.PostagemId;
        delete comentario.AlunoId;

        res.status(201).send(comentario);
    },





    async listar(req, res) {

        const { postId } = req.params;


        const postagem = await Postagem.findByPk(postId);

        if (!postagem) {
            return res.status(404).send({ erro: "post não encontrado" });
        }

        const comentarios = await postagem.getComentarios({
            include: {
                association: "Aluno",
                attributes: ["id", "nome"]
            },
            attributes: ["id", "descricao"]
        });

        res.send(comentarios);

    },
}