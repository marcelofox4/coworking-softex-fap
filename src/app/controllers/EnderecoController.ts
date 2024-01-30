import { EnderecoRepository } from "../repositories/EnderecoRepository";
import Endereco from "../entities/Endereco";
import IEnderecoUpdate from "../interfaces/update/IEnderecoUpdate";
import IEnderecoCreate from "../interfaces/create/IEnderecoCreate";
import { AppError } from "../errors/AppError";

class EnderecoController {
    
    constructor(private enderecoRepository: EnderecoRepository) {}

    async create(dadosEndereco: IEnderecoCreate): Promise<void> {

        await this.enderecoRepository.create(dadosEndereco);
    }

    async list(): Promise<Endereco[]> {
        return await this.enderecoRepository.list();
    }

    async findById(id: number): Promise<Endereco> {
        
        const endereco = await this.enderecoRepository.findById(id);

        if(!endereco) {
            throw new AppError("Endereço inexistente!");
        }

        return endereco;
    }

    async update(id: number, dadosEndereco: IEnderecoUpdate): Promise<void> {
        
        const endereco = await this.enderecoRepository.findById(id);
        
        if(!endereco) {
            throw new AppError("Endereço inexistente!");
        }

        await this.enderecoRepository.update(id, dadosEndereco);
        
    }

    async deleteById(id: number): Promise<void> {
        const endereco = await this.enderecoRepository.findById(id);

        if(!endereco) {
            throw new AppError("Endereço inexistente!");
        }

        await this.enderecoRepository.delete(id);
    }
}

export { EnderecoController };
