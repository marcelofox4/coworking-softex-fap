import { AppDataSource } from "../../database/data-source";
import { Repository } from "typeorm";
import RetiradaEncomenda from "../entities/RetiradaEncomenda";
import IRetiradaEncomendaCreate from "../interfaces/create/IRetiradaEncomendaCreate";
import IRetiradaEncomendaUpdate from "../interfaces/update/IRetiradaEncomendaUpdate";

class RetiradaEncomendaRepository {
    private retiradaEncomendaRepository: Repository<RetiradaEncomenda>;

    constructor() {
        this.retiradaEncomendaRepository = AppDataSource.getRepository(RetiradaEncomenda);
    }

    async list(): Promise<RetiradaEncomenda[]> {
        return await this.retiradaEncomendaRepository.find();
    }

    async findById(idRetirEncomenda: number): Promise<RetiradaEncomenda | null> {
        return await this.retiradaEncomendaRepository.findOne({ where: { idRetirEncomenda } });
    }

    async create(data: IRetiradaEncomendaCreate): Promise<RetiradaEncomenda> {
        const retiradaEncomenda = await this.retiradaEncomendaRepository.create(data);
        return await this.retiradaEncomendaRepository.save(retiradaEncomenda);
    }

    async update(idRetirEncomenda: number, updatedData: IRetiradaEncomendaUpdate): Promise<void> {
        await this.retiradaEncomendaRepository.update(idRetirEncomenda, updatedData);        
    }

    async delete(idRetirEncomenda: number): Promise<void | null> {
        const retiradaEncomenda = await this.retiradaEncomendaRepository.findOne({ where: { idRetirEncomenda } });

        if (retiradaEncomenda) {
            await this.retiradaEncomendaRepository.remove(retiradaEncomenda);
        }
    }
}

export { RetiradaEncomendaRepository };
