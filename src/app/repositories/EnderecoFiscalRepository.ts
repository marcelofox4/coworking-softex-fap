import EnderecoFiscal from "../entities/EnderecoFiscal";
import { AppDataSource } from "../../database/data-source";
import { Repository } from "typeorm";
import IEnderecoFiscalCreate from "../interfaces/create/IEnderecoFiscalCreate";
import IEnderecoFiscalUpdate from "../interfaces/update/IEnderecoFiscalUpdate";

class EnderecoFiscalRepository {

    private enderecoFiscalRepository: Repository<EnderecoFiscal>;

    constructor() {
        this.enderecoFiscalRepository = AppDataSource.getRepository(EnderecoFiscal);
    }
    
    async create(numEndFiscal: number): Promise<EnderecoFiscal> {
        const enderecoFiscal = await this.enderecoFiscalRepository.create({numEndFiscal});

        await this.enderecoFiscalRepository.save(enderecoFiscal)

        return enderecoFiscal;
    }

    async list(): Promise<EnderecoFiscal[]> {
        return await this.enderecoFiscalRepository.find();
    }

    async listAtivos(): Promise<EnderecoFiscal[]> {
        return await this.enderecoFiscalRepository.find({ where: { statusEndFiscal: 1 } });
    }

    async listInativos(): Promise<EnderecoFiscal[]> {
        return await this.enderecoFiscalRepository.find({ where: { statusEndFiscal: 0 } });
    }

    async findByNumEndFiscal(numEndFiscal: number): Promise<EnderecoFiscal | null> {
        return await this.enderecoFiscalRepository.findOne({ where: { numEndFiscal } });
    }

    async update(numEndFiscal: number, updatedData: IEnderecoFiscalUpdate): Promise<void> {
        const enderecoFiscal = await this.enderecoFiscalRepository.findOne({ where: { numEndFiscal } });

        if (enderecoFiscal) {
            await this.enderecoFiscalRepository.update({ numEndFiscal: numEndFiscal }, { numEndFiscal: updatedData.numEndFiscal });
        }
    }

    async inativar(numEndFiscal: number): Promise<void> {
        const enderecoFiscal = await this.enderecoFiscalRepository.findOneOrFail({ where: { numEndFiscal } });
        
        if (enderecoFiscal) {
            await this.enderecoFiscalRepository.update({ numEndFiscal: numEndFiscal}, { statusEndFiscal: 0 });
        }
    }

    async ativar(numEndFiscal: number): Promise<void> {
        const enderecoFiscal = await this.enderecoFiscalRepository.findOneOrFail({ where: { numEndFiscal } });
        
        if (enderecoFiscal) {
            await this.enderecoFiscalRepository.update({ numEndFiscal: numEndFiscal}, { statusEndFiscal: 1 });
        }
    }

    async delete(numEndFiscal: number): Promise<void | null> {
        const enderecoFiscal = await this.enderecoFiscalRepository.findOne({ where: { numEndFiscal } });

        if (enderecoFiscal) {
            await this.enderecoFiscalRepository.remove(enderecoFiscal);
        }
    }
}

export default EnderecoFiscalRepository;
