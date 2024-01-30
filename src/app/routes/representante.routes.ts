import { Router } from "express";
import { RepresentanteRepository } from "../repositories/RepresentanteRepository";
import { RepresentanteController } from "../controllers/RepresentanteController";
import { autenticacaoAdmin, autenticacao } from "../middleware/autenticacao";

const representanteRoutes = Router();
const representanteRepository = new RepresentanteRepository();
const representanteController = new RepresentanteController(representanteRepository);

representanteRoutes.get("/", async (request, response) => {
    const representantes = await representanteController.list();

    return response.status(200).json(representantes);
})

representanteRoutes.get("/ativos", async (request, response) => {

    try {
        await autenticacao(request, response, () => {});

        try {
            const representantes = await representanteController.listAtivos();
            return response.status(200).json(representantes);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        return response.status(401).json(error);
    }
})

representanteRoutes.get("/inativos", async (request, response) => {

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            const representantes = await representanteController.listInativos();

            return response.status(200).json(representantes);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

representanteRoutes.get("/email/:email", async (request, response) => {

    const email = request.params.email;

    try {
        await autenticacao(request, response, () => {});

        try {
            const representante = await representanteController.findByEmail(email);
            response.status(200).json(representante);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

representanteRoutes.get("/id/:id", async (request, response) => {

    const id = Number(request.params.id);

    try {
        const representante = await representanteController.findById(id);
        response.status(200).json(representante);
    } catch (error) {
        response.status(400).json(error)
    }
})

representanteRoutes.post("/", async (request, response) => {

    const { nomeRepresent, emailRepresent, telefoneRepresent, idPJuridica} = request.body;

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            await representanteController.create({
                nomeRepresent,
                emailRepresent,
                telefoneRepresent,
                idPJuridica
            })
    
            response.status(201).json({ message: "Representante Cadastrado!" });
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json
    }

})

representanteRoutes.patch("/:id", async (request, response) => {

    const idRepresentante = parseInt(request.params.id);
    const {emailRepresent, telefoneRepresent} = request.body;

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            
            await representanteController.update(idRepresentante, { emailRepresent, telefoneRepresent });
                
            response.status(200).json({ message: "Representante atualizado!" });
        } catch (error) {
            return response.status(400).json(error);
        }
    } catch (error) {
        return response.status(401).json(error);
    }
})

representanteRoutes.delete("/:id", async (request, response) => {
    
    const idRepresentante = Number(request.params.id);

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            await representanteController.delete(idRepresentante);
            response.status(200).json({ message: "Representante excluido!" });
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

representanteRoutes.patch("/inativar/:id", async (request, response) => {

    const idRepresentante = Number(request.params.id);

    try {
        await autenticacaoAdmin(request, response, () => {});
        
        try {
            await representanteController.inativar(idRepresentante);
            response.status(200).json({ message: "Representante inativado!" })
        } catch (error) {
            response.status(400).json(error)
        }
    } catch (error) {
        response.status(401).json(error)
    }
})

representanteRoutes.patch("/ativar/:id", async (request, response) => {

    const idRepresentante = Number(request.params.id);

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            await representanteController.ativar(idRepresentante);
            response.status(200).json({ message: "Representante ativado!" });
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

export { representanteRoutes };