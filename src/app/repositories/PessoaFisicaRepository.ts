import PessoaFisica from "../entities/PessoaFisica";
import IPessoaFisica from "../interfaces/create/IPessoaFisicaCreate";
import { AppDataSource } from "../../database/data-source";
import { Repository } from "typeorm";
import IPessoaFisicaCreate from "../interfaces/create/IPessoaFisicaCreate";

class PessoaFisicaRepository{
    
    private pessoaFisicaRepository: Repository<PessoaFisica>;

    constructor() {
        this.pessoaFisicaRepository = AppDataSource.getRepository(PessoaFisica);
    }

    async list(): Promise<PessoaFisica[]> {

        return await this.pessoaFisicaRepository.find();
    }    

    async findById(idPfisica: number): Promise<PessoaFisica | null> {

        return await this.pessoaFisicaRepository.findOne({ where: { idPfisica } });
    }

    async findByCpf(cpf: string): Promise<PessoaFisica | null> {

        return await this.pessoaFisicaRepository.findOne({ where: { cpf } });
    }

    async create({ cpf, idCliente }: IPessoaFisicaCreate): Promise<void> {
        
        const pessoafisica = await this.pessoaFisicaRepository.create({
            cpf,
            idCliente
        });

        await this.pessoaFisicaRepository.save(pessoafisica);
    }

    async update(idPfisica: number, cpfPessoaFisica: string): Promise<void> {
        const pessoaFisica = await this.pessoaFisicaRepository.findOne({ where: { idPfisica } });

        if(pessoaFisica) {
            await this.pessoaFisicaRepository.update({ idPfisica: idPfisica}, { cpf: cpfPessoaFisica })
        }
    }

    async delete(idPfisica: number): Promise<void> {
        
        const pessoaFisica = await this.pessoaFisicaRepository.findOne({ where: { idPfisica } });

        if (pessoaFisica) {
            await this.pessoaFisicaRepository.remove(pessoaFisica);
        }
    }
}

export default PessoaFisicaRepository;



