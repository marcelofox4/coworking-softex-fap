import PessoaFisica from "../entities/PessoaFisica";
import IPessoaFisicaCreate from "../interfaces/create/IPessoaFisicaCreate";
import PessoaFisicaRepository from "../repositories/PessoaFisicaRepository";

class PessoaFisicaController {

    constructor(private pessoaFisicaRepository = new PessoaFisicaRepository) {}

    async list(): Promise<PessoaFisica[]> {
        return await this.pessoaFisicaRepository.list();
    }

    async create({ cpf, idCliente }: IPessoaFisicaCreate): Promise<void> {

        const pessoaFisica = await this.pessoaFisicaRepository.findByCpf(cpf);

        if (pessoaFisica) {
            throw new Error("PessoaFisica já existe!");
        }

        await this.pessoaFisicaRepository.create({cpf, idCliente}); 
    }

    async findById(idPFisica: number): Promise<PessoaFisica | null> {
        const pessoaFisica =  await this.pessoaFisicaRepository.findById(idPFisica);

        if (!pessoaFisica) {
            throw new Error("Pessoa Fisica inexistente!");
        }

        return pessoaFisica;
    }

    async findByCpf(cpf: string): Promise<PessoaFisica | null> {
        const pessoaFisica =  await this.pessoaFisicaRepository.findByCpf(cpf);

        if (!pessoaFisica) {
            throw new Error("Pessoa Fisica inexistente!");
        }

        return pessoaFisica;
    }

    async delete(idPFisica: number): Promise<void> {
        
        const pessoaFisica =  await this.pessoaFisicaRepository.findById(idPFisica);

        if (!pessoaFisica) {
            throw new Error("Pessoa Fisica inexistente!");
        }

        await this.pessoaFisicaRepository.delete(idPFisica);
    }
}

export default PessoaFisicaController;
