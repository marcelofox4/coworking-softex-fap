import { Router } from "express";
import { RetiradaEncomendaController } from "../controllers/RetiradaEncomendaController";
import { RetiradaEncomendaRepository } from "../repositories/RetiradaEncomendaRepository";

const retiradaEncomendaRoutes = Router();
const retiradaEncomendaRepository = new RetiradaEncomendaRepository();
const retiradaEncomendaController = new RetiradaEncomendaController(retiradaEncomendaRepository);

retiradaEncomendaRoutes.get("/", async (request, response) => {
    try {
        const retiradasEncomendas = await retiradaEncomendaController.list();
        return response.status(200).json(retiradasEncomendas);
    } catch (error) {
        return response.status(500).json({ message: "Erro interno do servidor.", details: error });
    }
});

retiradaEncomendaRoutes.get("/id/:id", async (request, response) => {
    try {
        const idRetirada = parseInt(request.params.id, 10);

        if (isNaN(idRetirada)) {
            return response.status(400).json({ error: "ID da retirada inválido!" });
        }

        const retiradaEncomenda = await retiradaEncomendaController.findById(idRetirada);

        if (retiradaEncomenda) {
            return response.status(200).json(retiradaEncomenda);
        } else {
            return response.status(404).json({ error: "Retirada de encomenda não encontrada." });
        }
    } catch (error) {
        return response.status(500).json({ message: "Erro interno do servidor.", details: error });
    }
});

retiradaEncomendaRoutes.post("/", async (request, response) => {
    try {
        const dadosRetiradaEncomenda = request.body;
        await retiradaEncomendaController.create(dadosRetiradaEncomenda);
        return response.status(201).json({ message: "Retirada de encomenda cadastrada!" });
    } catch (error) {
        return response.status(400).json({ message: `Erro ao cadastrar a retirada de encomenda: ${error}` });
    }
});

retiradaEncomendaRoutes.put("/:id", async (request, response) => {
    try {
        const idRetirada = parseInt(request.params.id, 10);

        if (isNaN(idRetirada)) {
            return response.status(400).json({ error: "ID da retirada inválido!" });
        }

        const dadosRetiradaEncomenda = request.body;
        await retiradaEncomendaController.update(idRetirada, dadosRetiradaEncomenda);
        return response.status(200).json({ message: "Retirada de encomenda atualizada!" });
    } catch (error) {
        return response.status(400).json({ message: `Erro ao atualizar a retirada de encomenda: ${error}` });
    }

});

retiradaEncomendaRoutes.delete("/:id", async (request, response) => {

    try {
        const idRetirada = parseInt(request.params.id, 10);

        if (isNaN(idRetirada)) {
            return response.status(400).json({ error: "ID da retirada inválido!" });
        }

        await retiradaEncomendaController.deleteByid(idRetirada);
        return response.status(200).json({ message: "Retirada de encomenda excluída!" });
    } catch (error) {
        return response.status(400).json({ message: `Erro ao excluir a retirada de encomenda: ${error}` });
    }
});

export { retiradaEncomendaRoutes };
