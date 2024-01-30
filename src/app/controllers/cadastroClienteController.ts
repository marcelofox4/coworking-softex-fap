import { AppError } from "../errors/AppError";
import IClienteUpdate from "../interfaces/update/IClienteUpdate";
import IEnderecoUpdate from "../interfaces/update/IEnderecoUpdate";
import { AdminRepository } from "../repositories/AdminRepository";
import ClienteRepository from "../repositories/ClienteRepository";
import EnderecoFiscalRepository from "../repositories/EnderecoFiscalRepository";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import PessoaFisicaRepository from "../repositories/PessoaFisicaRepository";
import PessoaJuridicaRepository from "../repositories/PessoaJuridicaRepository";
import { RepresentanteRepository } from "../repositories/RepresentanteRepository";

class CadastroClienteController {

    constructor(
        private pessoaFisicaRepository: PessoaFisicaRepository, 
        private adminRepository: AdminRepository,
        private enderecoFiscalRepository: EnderecoFiscalRepository,
        private clienteRepository: ClienteRepository,
        private enderecoRepository: EnderecoRepository,
        private pessoaJuridicaRepository: PessoaJuridicaRepository,
        private representanteRepository: RepresentanteRepository
        ) {}

    async pessoaFisica(nomeCliente: string, cpf: string, telefoneCliente: string, emailCliente: string, qtdPontosCliente: number, prazoCliente: Date, valorMensalCliente: number, logradouro: string, numero: number, bairro: string, uf: string, numEndFiscal: number, idUsuario: number): Promise<void> {

        const admin = await this.adminRepository.findByIdUsuario(idUsuario);
        if (admin) {
            const adminId = admin.idAdmin;

            const enderecoFiscalExists = await this.enderecoFiscalRepository.findByNumEndFiscal(numEndFiscal);
            if (enderecoFiscalExists) {
                throw new AppError("Número de Endereço Fiscal já existe!");
            }

            await this.enderecoFiscalRepository.create(numEndFiscal);

            const endereco = await this.enderecoRepository.create({ logradouro, bairro, numero, uf });
            const enderecoId = endereco.idEndereco;

            const cliente = await this.clienteRepository.create({ nomeCliente, telefoneCliente, emailCliente, qtdPontosCliente, prazoCliente, valorMensalCliente, enderecoIdEndereco: enderecoId, adminIdAdmin: adminId, enderecoFiscalNumEndFiscal: numEndFiscal });

            const idCliente = cliente.idCliente;
            await this.pessoaFisicaRepository.create({ cpf, idCliente });
        }
    }

    async pessoaJuridica(nomeCliente: string, razaoSocial: string, cnpj: string, telefoneCliente: string, emailCliente: string, qtdPontosCliente: number, prazoCliente: Date, valorMensalCliente: number, logradouro: string, numero: number, bairro: string, uf: string, numEndFiscal: number, idUsuario: number, nomeRepresent: string, emailRepresent: string, telefoneRepresent: string): Promise<void> {

        const pessoaJuridicaExists = await this.pessoaJuridicaRepository.findByCnpj(cnpj);
        if (pessoaJuridicaExists) {
            throw new AppError("Cliente já cadastrado com esse CNPJ"); 
        }

        const admin = await this.adminRepository.findByIdUsuario(idUsuario);
        if (admin) {
            const adminId = admin.idAdmin;

            const enderecoFiscalExists = await this.enderecoFiscalRepository.findByNumEndFiscal(numEndFiscal);
            if (enderecoFiscalExists) {
                throw new AppError("Número de Endereço Fiscal já existente!");
            }

            const representanteExists = await this.representanteRepository.findByEmail(emailRepresent);
            if (representanteExists) {
                throw new AppError("Representante já cadastrado com esse E-mail!");
            }

            await this.enderecoFiscalRepository.create(numEndFiscal);

            const endereco = await this.enderecoRepository.create({ logradouro, bairro, numero, uf });
            const enderecoId = endereco.idEndereco;

            const cliente = await this.clienteRepository.create({ nomeCliente, telefoneCliente, emailCliente, qtdPontosCliente, prazoCliente, valorMensalCliente, enderecoIdEndereco: enderecoId, adminIdAdmin: adminId, enderecoFiscalNumEndFiscal: numEndFiscal });
            const idCliente = cliente.idCliente;

            const pessoaJuridica = await this.pessoaJuridicaRepository.create({ cnpj, razaoSocial, idCliente });
            const idPessoaJuridica = pessoaJuridica.idPJuridica;

            await this.representanteRepository.create( { nomeRepresent, emailRepresent, telefoneRepresent, idPJuridica: idPessoaJuridica });
        }
    }

    async inativar(idCliente: number) {
        
        const cliente = await this.clienteRepository.findById(idCliente);
        if (!cliente) {
            throw new AppError("Cliente inexistente!");
        }

        if (cliente.statusCliente == 0) {
            throw new AppError("Cliente já se encontra inativo no sistema!");
        }

        await this.clienteRepository.inativar(idCliente);
        await this.enderecoFiscalRepository.inativar(cliente.enderecoFiscalNumEndFiscal);

        const pj = await this.pessoaJuridicaRepository.findByCliente(cliente.idCliente);
        if (pj) {
            const idPessoaJuridica = pj?.idPJuridica;
            await this.representanteRepository.inativarTodos(idPessoaJuridica);
        } 
    }

    async ativar(idCliente: number) {
        
        const cliente = await this.clienteRepository.findById(idCliente);
        if (!cliente) {
            throw new AppError("Cliente inexistente!");
        }

        if (cliente.statusCliente == 1) {
            throw new AppError("Cliente já se encontra ativo no sistema!");
        }

        await this.clienteRepository.ativar(idCliente);
        await this.enderecoFiscalRepository.ativar(cliente.enderecoFiscalNumEndFiscal);

        const pj = await this.pessoaJuridicaRepository.findByCliente(cliente.idCliente);
        if (pj) {
            const idPessoaJuridica = pj.idPJuridica;
            await this.representanteRepository.ativarTodos(idPessoaJuridica);
        } 
    }

    async update(idCliente: number, dataCliente: IClienteUpdate , dataEndereco: IEnderecoUpdate) {
        
        const cliente = await this.clienteRepository.findById(idCliente);
        if (!cliente) {
            throw new AppError("Cliente inexistente!");
        }

        if (dataCliente) {
            await this.clienteRepository.update(idCliente, dataCliente);
        }
        
        if (dataEndereco) {
            await this.enderecoRepository.update(cliente.enderecoIdEndereco, dataEndereco);
        }
    }

    async findByCnpj(cnpj: string) {
        const pessoaJuridica = await this.pessoaJuridicaRepository.findByCnpj(cnpj);
        if (!pessoaJuridica) {
            throw new AppError("Não existe um Cliente com este CNPJ");    
        }

        const cliente = await this.clienteRepository.findById(pessoaJuridica.idCliente);

        return cliente;
    }

    async findByCpf(cpf: string) {
        const pessoaFisica = await this.pessoaFisicaRepository.findByCpf(cpf);
        if (!pessoaFisica) {
            throw new AppError("Não existe um Cliente com este CPF");    
        }

        const cliente = await this.clienteRepository.findById(pessoaFisica.idCliente);

        return cliente;
    }
}

export { CadastroClienteController }
