import RecebimentoEncomenda from "../entities/RecebimentoEncomenda";
import { AppError } from "../errors/AppError";
import { EncomendaRepository } from "../repositories/EncomendaRepository";
import { RecebimentoEncomendaRepository } from "../repositories/RecebimentoEncomendaRepository";

class RecebimentoEncomendaController {

    constructor(
        private recebimentoEncomendaRepository: RecebimentoEncomendaRepository,
        private encomendaRepository: EncomendaRepository
    ) {}

    async create(numEndFiscal: number, obsEncomenda: string, obsRecebEncomenda: string, idRecepcao: number): Promise<void> {

        const encomenda = await this.encomendaRepository.create({ obsEncomenda, numEndFiscal });
        const idEncomenda = encomenda.idEncomenda;

        await this.recebimentoEncomendaRepository.create({ obsRecebEncomenda, encomendaIdEncomenda: idEncomenda, enderecoFiscalNumEndFiscal: numEndFiscal, idRecepcao });
    }

    async list(): Promise<RecebimentoEncomenda[]> {
        return await this.recebimentoEncomendaRepository.list();
    }

    async findById(idRecebEncomenda: number): Promise<RecebimentoEncomenda> {
        
        const recebimentoEncomenda = await this.recebimentoEncomendaRepository.findById(idRecebEncomenda);

        if(!recebimentoEncomenda) {
            throw new AppError("Recebimendo de Encomenda não encontrado!");
        }
        return recebimentoEncomenda;
    }

    async deleteById(id: number): Promise<void> {
        
        const recebimentoEncomenda = await this.recebimentoEncomendaRepository.findById(id);

        if (!recebimentoEncomenda) {
            throw new Error("Recebimento de encomenda inexistente!");
        }
        await this.recebimentoEncomendaRepository.delete(id);
    }
}

export { RecebimentoEncomendaController };