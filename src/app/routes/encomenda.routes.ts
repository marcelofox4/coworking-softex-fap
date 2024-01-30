import { Router } from "express";
import { EncomendaRepository } from "../repositories/EncomendaRepository";
import { EncomendaController } from "../controllers/EncomendaController";

const encomendaRoutes = Router();
const encomendaRepository = new EncomendaRepository();
const encomendaController = new EncomendaController(encomendaRepository);

encomendaRoutes.get("/", async (request, response) => {
    const encomendas = await encomendaController.list();

    return response.status(200).json(encomendas);
})

encomendaRoutes.get("/id/:id", async (request, response) => {
    
    const id = Number(request.params.id);

    try {
        const encomenda = await encomendaController.findById(id);
        response.status(200).json(encomenda);
    } catch (error) {
        response.status(400).json({ message: error })
    }
})

encomendaRoutes.put('/:id', async (request, response) => {
    const idEncomenda = Number(request.params.id);
    const { obsEncomenda} = request.body;

    try {
        await encomendaController.update(idEncomenda, { obsEncomenda });
        response.status(200).json({ message: "Encomenda atualizada!" });
    } catch (error) {
        response.status(400).json({ message: error });
    }
})

encomendaRoutes.post("/", async (request, response) => {
    
    const { idEncomenda, obsEncomenda, numEndFiscal, enderecoFiscal } = request.body;

    try {
        await encomendaController.create({
            idEncomenda,
            obsEncomenda, 
            numEndFiscal,
            enderecoFiscal
        })
        response.status(201).json({ message: "Encomenda cadastrada!" });
    } catch (error) {
        response.status(400).json({ message: error});
    }
})

encomendaRoutes.delete("/:id", async (request, response) => {
    
    const idEncomenda = Number(request.params.id);

    try {
        encomendaController.delete(idEncomenda);
        response.status(200).json({ message: "Encomenda excluído!"});
    } catch (error) {
        response.status(400).json({ message: "Erro ao excluir Encomenda!" })
    }
})


export { encomendaRoutes };