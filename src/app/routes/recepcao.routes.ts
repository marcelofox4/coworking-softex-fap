import { Router } from "express";
import { autenticacaoAdmin, autenticacao } from "../middleware/autenticacao";
import { RecepcaoRepository } from "../repositories/RecepcaoRepository";
import { RecepcaoController } from "../controllers/RecepcaoController";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

const recepcaoRoutes = Router();

const recepcaoRepository = new RecepcaoRepository();
const usuarioRepository = new UsuarioRepository();
const recepcaoController = new RecepcaoController(recepcaoRepository, usuarioRepository);

recepcaoRoutes.post("/", async (request, response) => {
    const { idUsuario } = request.body;

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            const recepcao = await recepcaoController.create({ idUsuario });
            return response.status(200).json(recepcao);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

recepcaoRoutes.get("/", async (request, response) => {

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            const recepcoes = await recepcaoController.list();
            return response.status(200).json(recepcoes);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

recepcaoRoutes.get("/id/:idRecepcao", async (request, response) => {

    const { idRecepcao } = request.params;

    try {
        await autenticacao(request, response, () => {});

        try {
            const recepcao = await recepcaoController.findById(Number(idRecepcao));
            return response.status(200).json(recepcao);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

export { recepcaoRoutes };