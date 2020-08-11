const Postagem = require("../models/Postagem");

module.exports = {

    async store(req, res) {
        const token = req.headers.authorization;

        const [Bearer, created_aluno_id] = token.split(" ");

        const { titulo, descricao, imagem, gists } = req.body;

        let post = await Postagem.create({
            titulo,
            descricao,
            imagem,
            gists,
            created_aluno_id
        });
        res.status(201).send(post);
    },

    async detete(req, res) {
        // pegando o id do aluno logado 
        const token = req.headers.authorization;
        const [Bearer, created_aluno_id] = token.split(" ");

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