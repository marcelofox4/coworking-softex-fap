import PessoaJuridica from "../entities/PessoaJuridica";
import IPessoaJuridicaCreate from "../interfaces/create/IPessoaJuridicaCreate";
import PessoaJuridicaRepository from "../repositories/PessoaJuridicaRepository";

class PessoaFisicaController {

    constructor(private pessoaJuridicaRepository = new PessoaJuridicaRepository) {}

    async list(): Promise<PessoaJuridica[]> {
        return await this.pessoaJuridicaRepository.list();
    }

    async create({ cnpj, razaoSocial, idCliente }: IPessoaJuridicaCreate): Promise<void> {

        const pessoaJuridica = await this.pessoaJuridicaRepository.findByCnpj(cnpj);

        if (pessoaJuridica) {
            throw new Error("Pessoa Juridica já existe!");
        }

        await this.pessoaJuridicaRepository.create({cnpj, razaoSocial, idCliente}); 
    }

    async findById(idPJuridica: number): Promise<PessoaJuridica | null> {
        const pessoaJuridica =  await this.pessoaJuridicaRepository.findById(idPJuridica);

        if (!pessoaJuridica) {
            throw new Error("Pessoa Juridica inexistente!");
        }

        return pessoaJuridica;
    }

    async findByCnpj(cnpj: string): Promise<PessoaJuridica | null> {
        const pessoaJuridica =  await this.pessoaJuridicaRepository.findByCnpj(cnpj);

        if (!pessoaJuridica) {
            throw new Error("Pessoa Juridica inexistente!");
        }

        return pessoaJuridica;
    }

    async delete(idPJuridica: number): Promise<void> {
        
        const pessoaJuridica =  await this.pessoaJuridicaRepository.findById(idPJuridica);

        if (!pessoaJuridica) {
            throw new Error("Pessoa Fisica inexistente!");
        }

        await this.pessoaJuridicaRepository.delete(idPJuridica);
    }
}

export default PessoaFisicaController;
