import PessoaJuridica from "../entities/PessoaJuridica";
import IPessoaJuridicaCreate from "../interfaces/create/IPessoaJuridicaCreate";
import { AppDataSource } from "../../database/data-source";
import { Repository } from "typeorm";

class PessoaJuridicaRepository{
    
    private pessoaJuridicaRepository: Repository<PessoaJuridica>;

    constructor() {
        this.pessoaJuridicaRepository = AppDataSource.getRepository(PessoaJuridica);
    }

    async list(): Promise<PessoaJuridica[]> {

        return await this.pessoaJuridicaRepository.find();
    }

    async findById(idPJuridica: number): Promise<PessoaJuridica | null> {

        return await this.pessoaJuridicaRepository.findOne({ where: { idPJuridica } });
    }

    async findByCnpj(cnpj: string): Promise<PessoaJuridica | null> {

        return await this.pessoaJuridicaRepository.findOne({ where: { cnpj } });
    }

    async findByCliente(idCliente: number): Promise<PessoaJuridica | null> {

        return await this.pessoaJuridicaRepository.findOne({ where: { idCliente } });
    }

    async create({ cnpj, razaoSocial, idCliente }: IPessoaJuridicaCreate): Promise<PessoaJuridica> {
        
        const pessoaJuridica = await this.pessoaJuridicaRepository.create({
            cnpj,
            razaoSocial,
            idCliente
        });

        await this.pessoaJuridicaRepository.save(pessoaJuridica);

        return pessoaJuridica;
    }

    async delete(idPJuridica: number): Promise<void> {
        
        const pessoaJuridica = await this.pessoaJuridicaRepository.findOne({ where: { idPJuridica } });

        if (pessoaJuridica) {
            await this.pessoaJuridicaRepository.remove(pessoaJuridica);
        }
    }
}

export default PessoaJuridicaRepository;