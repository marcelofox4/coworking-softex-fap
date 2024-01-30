import { Router } from "express";
import ClienteRepository from "../repositories/ClienteRepository";
import PessoaFisicaRepository from "../repositories/PessoaFisicaRepository";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import EnderecoFiscalRepository from "../repositories/EnderecoFiscalRepository";
import { AdminRepository } from "../repositories/AdminRepository";
import { CadastroClienteController } from "../controllers/cadastroClienteController";
import PessoaJuridicaRepository from "../repositories/PessoaJuridicaRepository";
import { RepresentanteRepository } from "../repositories/RepresentanteRepository";
import IClienteUpdate from "../interfaces/update/IClienteUpdate";
import IEnderecoUpdate from "../interfaces/update/IEnderecoUpdate";
import { autenticacao, autenticacaoAdmin } from "../middleware/autenticacao";

const cadastroDeClienteRoutes = Router();

const clienteRepository = new ClienteRepository();
const pessoaFisicaRepository = new PessoaFisicaRepository();
const pessoaJuridicaRepository = new PessoaJuridicaRepository()
const enderecoRepository = new EnderecoRepository();
const enderecoFiscalRepository = new EnderecoFiscalRepository();
const adminRepository = new AdminRepository();
const representanteRepository = new RepresentanteRepository();

const cadastroClienteController = new CadastroClienteController(
    pessoaFisicaRepository,
    adminRepository,
    enderecoFiscalRepository,
    clienteRepository,
    enderecoRepository,
    pessoaJuridicaRepository,
    representanteRepository
);

cadastroDeClienteRoutes.post("/pessoaFisica", async (request, response) => {

    try {
        await autenticacaoAdmin(request, response, () => {});

        const { nomeCliente, cpf, telefoneCliente, emailCliente, qtdPontosCliente, prazoCliente, valorMensalCliente, logradouro, numero, bairro, uf, numEndFiscal, idUsuario } = request.body;

        try {

            await cadastroClienteController.pessoaFisica(nomeCliente, cpf, telefoneCliente, emailCliente, qtdPontosCliente, prazoCliente, valorMensalCliente, logradouro, numero, bairro, uf, numEndFiscal, idUsuario);

            const cadastroClientePessoaFisica = {
                nome: nomeCliente,
                cpf: cpf,
                telefoneCliente: telefoneCliente, 
                emailCliente: emailCliente, 
                qtdPontosCliente: qtdPontosCliente, 
                prazoCliente: prazoCliente, 
                valorMensalCliente: valorMensalCliente,
                logradouro: logradouro, 
                numero: numero, 
                bairro: bairro, 
                uf: uf,
                numeroEnderecoFiscal: numEndFiscal
            }

            response.status(200).json({
                    cadastroClientePessoaFisica,
                    message: "Cliente cadastrado com sucesso!"
            });
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
});

cadastroDeClienteRoutes.post("/pessoaJuridica", async (request, response) => {

    const { nomeCliente, razaoSocial, cnpj, telefoneCliente, emailCliente, qtdPontosCliente, prazoCliente, valorMensalCliente, logradouro, numero, bairro, uf, numEndFiscal, idUsuario, nomeRepresent, emailRepreset, telefoneRepresent } = request.body;

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {

            await cadastroClienteController.pessoaJuridica(nomeCliente, razaoSocial, cnpj, telefoneCliente, emailCliente, qtdPontosCliente, prazoCliente, valorMensalCliente, logradouro, numero, bairro, uf, numEndFiscal, idUsuario, nomeRepresent, emailRepreset, telefoneRepresent);
    
            const cadastroClientePessoaJuridica = {
                nome: nomeCliente,
                razaoSocial: razaoSocial,
                cnpj: cnpj,
                telefoneCliente: telefoneCliente, 
                emailCliente: emailCliente, 
                qtdPontosCliente: qtdPontosCliente, 
                prazoCliente: prazoCliente, 
                valorMensalCliente: valorMensalCliente,
                logradouro: logradouro, 
                numero: numero, 
                bairro: bairro, 
                uf: uf,
                numeroEnderecoFiscal: numEndFiscal
            }
    
            response.status(200).json({
                cadastroClientePessoaJuridica, 
                message: "Cliente cadastrado com sucesso!"}
            );
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
});

cadastroDeClienteRoutes.patch("/inativar/:idCliente", async (request, response) => {

    const idCliente = Number(request.params.idCliente);

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            await cadastroClienteController.inativar(idCliente);
            response.status(200).json({ message: "Cadastro de Cliente inativado!" })
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

cadastroDeClienteRoutes.patch("/ativar/:idCliente", async (request, response) => {

    const idCliente = Number(request.params.idCliente);

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            await cadastroClienteController.ativar(idCliente);
            response.status(200).json({ message: "Cadastro de Cliente ativado!" })
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

cadastroDeClienteRoutes.patch("/:idCliente", async (request, response) => {

    const idCliente = Number(request.params.idCliente);
    const dataUpdateCliente: IClienteUpdate = request.body;
    const dataUpdateEndeco: IEnderecoUpdate = request.body;

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            await cadastroClienteController.update(idCliente, dataUpdateCliente, dataUpdateEndeco);
            response.status(200).json({ message: "Cadastro de Cliente atualizado!" })
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

cadastroDeClienteRoutes.get("/cnpj/:cnpj", async (request, response) => {

    const cnpj = request.params.cnpj;

    try {
        await autenticacao(request, response, () => {});

        try {
            const ClienteCnpj = await cadastroClienteController.findByCnpj(cnpj);
            response.status(200).json(ClienteCnpj);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
});

cadastroDeClienteRoutes.get("/cpf/:cpf", async (request, response) => {

    const cpf = request.params.cpf;

    try {
        await autenticacao(request, response, () => {});

        try {
            const ClienteCpf = await cadastroClienteController.findByCpf(cpf);
            response.status(200).json(ClienteCpf);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
});

export { cadastroDeClienteRoutes };