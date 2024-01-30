import { AppDataSource } from "../../database/data-source";
import { Repository } from "typeorm";
import Encomenda from "../entities/Encomenda";
import IEncomendaCreate from "../interfaces/create/IEncomendaCreate";
import IEncomendaUpdate from "../interfaces/update/IEncomendaUpdate";


class EncomendaRepository {
    
    private encomendaRepository: Repository<Encomenda>;

    constructor() {
        this.encomendaRepository = AppDataSource.getRepository(Encomenda);
    }

    async create({ obsEncomenda, numEndFiscal}: IEncomendaCreate): Promise<Encomenda> {
        const encomenda = await this.encomendaRepository.create({
            obsEncomenda,
            numEndFiscal
        });
    
        await this.encomendaRepository.save(encomenda);
        return encomenda;
    }

    async list(): Promise<Encomenda[]> {
        return await this.encomendaRepository.find();
    }

    async findById(idEncomenda: number): Promise<Encomenda | null> {
        return await this.encomendaRepository.findOneOrFail({ where: [{ idEncomenda }] });
    }

    async update(idEncomenda: number, updatedData: IEncomendaUpdate): Promise<void> {   
        
        const encomenda = await this.encomendaRepository.findOneOrFail({ where: [{ idEncomenda }] });
        
        if (encomenda) {
            await this.encomendaRepository.update({ idEncomenda: idEncomenda}, { obsEncomenda: updatedData.obsEncomenda });
        }
    }

    async delete(idEncomenda: number): Promise<void | null> {
        const encomenda = await this.encomendaRepository.findOne({where: [{ idEncomenda }] });

        if (encomenda) {
            await this.encomendaRepository.remove(encomenda)
        }
    }

   
}

export { EncomendaRepository };