import { Router } from "express";
import EnderecoFiscalRepository from "../repositories/EnderecoFiscalRepository";
import { EnderecoFiscalController } from "../controllers/EnderecoFiscalController";
import { autenticacao, autenticacaoAdmin } from "../middleware/autenticacao";

const enderecoFiscalRoutes = Router();
const enderecoFiscalRepository = new EnderecoFiscalRepository();
const enderecoFiscalController = new EnderecoFiscalController(enderecoFiscalRepository);

enderecoFiscalRoutes.get("/", async (request, response) => {
    const enderecosFiscais = await enderecoFiscalController.list();

    return response.status(200).json(enderecosFiscais);
})

enderecoFiscalRoutes.get("/ativos", async (request, response) => {
    
    try {
        await autenticacao(request, response, () => {});

        try {
            const enderecosFiscais = await enderecoFiscalController.listAtivos();

            return response.status(200).json(enderecosFiscais);
        } catch (error) {
            return response.status(400).json(error);
        }
    } catch (error) {
        return response.status(401).json(error);
    }
})

enderecoFiscalRoutes.get("/Inativos", async (request, response) => {
    
    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            const enderecosFiscais = await enderecoFiscalController.listInativos();

            return response.status(200).json(enderecosFiscais);
        } catch (error) {
            return response.status(400).json(error);
        }
    } catch (error) {
        return response.status(401).json(error);
    }
})

enderecoFiscalRoutes.get("/:numEndFiscal", async (request, response) => {

    const numEndFiscal = Number(request.params.numEndFiscal);

    try {
        await autenticacao(request, response, () => {});

        try {
            const enderecoFiscal = await enderecoFiscalController.findByNumEndFiscal(numEndFiscal);
            response.status(200).json(enderecoFiscal);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

enderecoFiscalRoutes.post("/", async (request, response) => {
    const { numEndFiscal } = request.body;

    try {
        await enderecoFiscalController.create(numEndFiscal)
        response.status(201).json({ message: "Endereço Fiscal criado!" });
    } catch (error) {
        response.status(400).json(error);
    }
})

enderecoFiscalRoutes.put("/:numEndFiscal", async (request, response) => {
    
    const numEndFiscal = parseInt(request.params.numEndFiscal);

    try {
        await enderecoFiscalController.update(numEndFiscal, request.body)
        response.status(200).json({ message: "Endereço Fiscal atualizado!" });
    } catch(error) {
        return response.status(400).json(error);
    }
})

enderecoFiscalRoutes.delete("/:numEndFiscal", async (request, response) => {
    
    const numEndFiscal = Number(request.params.numEndFiscal);

    try {
        await enderecoFiscalController.deleteByNumEndFiscal(numEndFiscal);
        response.status(200).json({ message: "Endereço Fiscal excluído!"});
    } catch (error) {
        response.status(400).json(error);
    }
})

export { enderecoFiscalRoutes };