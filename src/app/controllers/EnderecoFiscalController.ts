import EnderecoFiscal from "../entities/EnderecoFiscal";
import { AppError } from "../errors/AppError";
import IEnderecoFiscalUpdate from "../interfaces/update/IEnderecoFiscalUpdate";
import EnderecoFiscalRepository from "../repositories/EnderecoFiscalRepository";


class EnderecoFiscalController {

    constructor(private enderecoFiscalRepository: EnderecoFiscalRepository) {}

    async create(numEndFiscal: number): Promise<EnderecoFiscal> {

        const enderecoFiscal = await this.enderecoFiscalRepository.findByNumEndFiscal(numEndFiscal);

        if (enderecoFiscal) {
            throw new AppError("Número de Endereço Fiscal existente!");
        }

        return await this.enderecoFiscalRepository.create(numEndFiscal);
    }

    async list(): Promise<EnderecoFiscal[]> {
        return await this.enderecoFiscalRepository.list();
    }

    async listAtivos(): Promise<EnderecoFiscal[]> {
        return await this.enderecoFiscalRepository.listAtivos();
    }

    async listInativos(): Promise<EnderecoFiscal[]> {
        return await this.enderecoFiscalRepository.listInativos();
    }

    async findByNumEndFiscal(numEndFiscal: number): Promise<EnderecoFiscal> {
        
        const enderecoFiscal = await this.enderecoFiscalRepository.findByNumEndFiscal(numEndFiscal);

        if(!enderecoFiscal) {
            throw new AppError("Endereço Fiscal não encontrado!");
        }

        return enderecoFiscal;
    }

    async update(numEndFiscal: number, dadosEndereco: IEnderecoFiscalUpdate): Promise<void> {
        
        const enderecoFiscal = await this.enderecoFiscalRepository.findByNumEndFiscal(numEndFiscal);
        
        if(!enderecoFiscal) {
            throw new AppError("Endereço Fiscal inexistente!");
        }

        await this.enderecoFiscalRepository.update(numEndFiscal, dadosEndereco);
        
    }

    async deleteByNumEndFiscal(numEndFiscal: number): Promise<void> {
        const enderecoFiscal = await this.enderecoFiscalRepository.findByNumEndFiscal(numEndFiscal);

        if(!enderecoFiscal) {
            throw new AppError("Endereço Fiscal inexistente!");
        }

        await this.enderecoFiscalRepository.delete(numEndFiscal);
    }
}

export { EnderecoFiscalController };