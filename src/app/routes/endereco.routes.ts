import { Router } from "express";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { EnderecoController } from "../controllers/EnderecoController";

const enderecoRoutes = Router();
const enderecoRepository = new EnderecoRepository();
const enderecoController = new EnderecoController(enderecoRepository);

enderecoRoutes.get("/", async (request, response) => {
    const enderecos = await enderecoController.list();

    return response.status(200).json(enderecos);
})

enderecoRoutes.get("/id/:id", async (request, response) => {
    
    const id = Number(request.params.id);

    try {
        const endereco = await enderecoController.findById(id);
        response.status(200).json(endereco);
    } catch (error) {
        response.status(400).json(error)
    }
})

export { enderecoRoutes };