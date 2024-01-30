import { Router } from 'express';
import ClienteController from '../controllers/ClienteController';
import ClienteRepository from '../repositories/ClienteRepository';
import { autenticacao, autenticacaoAdmin } from '../middleware/autenticacao';

const clienteRoutes = Router();
const clienteRepository = new ClienteRepository()
const clienteController = new ClienteController(clienteRepository);

clienteRoutes.get('/', async (request, response) => {
    
    try {
        const clientes = await clienteController.list();
        response.status(200).json(clientes);
    } catch (error) {
        response.status(400).json( { message: "Não foi possível listar os Clientes!" })
    }
});

clienteRoutes.get('/ativados', async (request, response) => {
    
    try {
        await autenticacao(request, response, () => {});

        try {
            const clientesAtivados = await clienteController.listAtivados();
            response.status(200).json(clientesAtivados);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
});

clienteRoutes.get('/inativados', async (request, response) => {
    
    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            const clientesAtivados = await clienteController.listInativados();
            response.status(200).json(clientesAtivados);
        } catch (error) {
            response.status(400).json(error)
        }
    } catch (error) {
        response.status(401).json(error)
    }
});

clienteRoutes.get('/id/:id', async (request, response) => {

    const idCliente = Number(request.params.id);

    try {
        await autenticacaoAdmin(request, response, () => {});
        
        try {
            const cliente = await clienteController.findById(idCliente);
            response.status(200).json(cliente);
        } catch (error) {
            response.status(400).json(error)
        }
    } catch (error) {
        
    }
});

clienteRoutes.get('/email/:email', async (request, response) => {

    const emailCliente = request.params.email;

    try {
        const cliente = await clienteController.findByEmail(emailCliente);
        response.status(200).json(cliente);
    } catch (error) {
        response.status(400).json({ message: "Cliente não encontrado!" })
    }
});

clienteRoutes.post("/", async (request, response) => {

    const clienteData = request.body;

    try {
        await clienteController.create(clienteData);
        response.status(201).json({ message: "Cliente criado com sucesso!" })
    } catch (error) {
        response.status(400).json({ message: "Cliente não cadastrado" })
        console.log(error);
    }
})

clienteRoutes.put('/:id', async (request, response) => {

    const idCliente = Number(request.params.id);
    const ClienteData = request.body;

    try {
        await clienteController.update(idCliente, ClienteData);
        response.status(200).json({ message: "Cliente atualizado!" })
    } catch (error) {
        response.status(400).json({ message: "Cliente não foi atualizado!" });
        console.log(error);
    }

});

clienteRoutes.delete('/:id', async (request, response) => {

    const idCliente = Number(request.params.id);

    try {
        await clienteController.deleteByid(idCliente);
        response.status(200).json({ message: "Cliente excluido!" })
    } catch (error) {
        response.status(400).json({ message: "Cliente não deletado!" });
    }
});

export { clienteRoutes};
