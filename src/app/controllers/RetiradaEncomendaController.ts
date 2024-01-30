import { RetiradaEncomendaRepository } from "../repositories/RetiradaEncomendaRepository";
import IRetiradaEncomendaCreate from "../interfaces/create/IRetiradaEncomendaCreate";
import IRetiradaEncomendaUpdate from "../interfaces/update/IRetiradaEncomendaUpdate";
import RetiradaEncomenda from "../entities/RetiradaEncomenda";

class RetiradaEncomendaController {
    
    constructor(private retiradaEncomendaRepository: RetiradaEncomendaRepository) {}

    async create(dadosRetiradaEncomenda: IRetiradaEncomendaCreate): Promise<void> {

        await this.retiradaEncomendaRepository.create(dadosRetiradaEncomenda);
    }

    async list(): Promise<RetiradaEncomenda[]> {

        return await this.retiradaEncomendaRepository.list();
    }

    async findById(id: number): Promise<RetiradaEncomenda> {

        const retiradaEncomenda = await this.retiradaEncomendaRepository.findById(id);

        if (!retiradaEncomenda) {
            throw new Error("Retirada de encomenda inexistente!");
        }

        return retiradaEncomenda;
    }

    async update(id: number, dadosRetiradaEncomenda: IRetiradaEncomendaUpdate): Promise<void> {

        const retiradaEncomenda = await this.retiradaEncomendaRepository.findById(id);

        if (!retiradaEncomenda) {
            throw new Error("Retirada de encomenda inexistente!");
        }

        await this.retiradaEncomendaRepository.update(id, dadosRetiradaEncomenda);
    }

    async deleteByid (id: number): Promise<void> {
            
            const retiradaEncomenda = await this.retiradaEncomendaRepository.findById(id);
    
            if (!retiradaEncomenda) {
                throw new Error("Retirada de encomenda inexistente!");
            }
    
            await this.retiradaEncomendaRepository.delete(id);
        }
}

export { RetiradaEncomendaController };
