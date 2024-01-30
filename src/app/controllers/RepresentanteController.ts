import Representante from "../entities/Representante";
import { AppError } from "../errors/AppError";
import IRepresentanteCreate from "../interfaces/create/IRepresentanteCreate";
import { IRepresentanteUpdate } from "../interfaces/update/IRepresentanteUpdate";
import { RepresentanteRepository } from "../repositories/RepresentanteRepository";

class RepresentanteController {

    constructor(private representanteRepository: RepresentanteRepository) {}

    async create({ nomeRepresent, emailRepresent, telefoneRepresent, idPJuridica} : IRepresentanteCreate): Promise<Representante> {

        const representante = await this.representanteRepository.findByEmail(emailRepresent);

        if (representante) {
            throw new AppError("Representante já cadastrado com este E-mail!");
        }

        return await this.representanteRepository.create({ nomeRepresent, emailRepresent, telefoneRepresent, idPJuridica });

    }

    async list(): Promise<Representante[]> {

        return await this.representanteRepository.list();
    }

    async listAtivos(): Promise<Representante[]> {

        return await this.representanteRepository.listAtivos();
    }

    async listInativos(): Promise<Representante[]> {

        return await this.representanteRepository.listInativos();
    }

    async findById(id: number): Promise<Representante> {

        const representante = await this.representanteRepository.findById(id);

        if(!representante) {
            throw new AppError("Representante inexistente!");
        }

        return representante;
    }

    async findByEmail(email: string): Promise<Representante> {

        const representante = await this.representanteRepository.findByEmail(email);

        if(!representante) {
            throw new AppError("Representante não encontrado!");
        }

        return representante;
    }

    async update(id: number, { emailRepresent, telefoneRepresent}: IRepresentanteUpdate): Promise<void> {

        const representante = await this.representanteRepository.findById(id);

        if (!representante) {
            throw new AppError("Representante não encontrado!");
        }
         
        await this.representanteRepository.update(id, { emailRepresent, telefoneRepresent });
    }

    async delete(id: number): Promise<void> {
        
        const representante = await this.representanteRepository.findById(id);

        if (!representante) {
            throw new AppError("Representante não encontrado!");
        }

        await this.representanteRepository.delete(id);
    }

    async inativar(idRepresent: number) {

        const representante = await this.representanteRepository.findById(idRepresent);

        if (!representante) {
            throw new AppError("Representante não encontrado!");
        }

        if (representante.statusRepresent == 0) {
            throw new AppError("Representante já está Inativo!");
        }

        await this.representanteRepository.inativar(idRepresent);
    }

    async ativar(idRepresent: number) {

        const representante = await this.representanteRepository.findById(idRepresent);

        if (!representante) {
            throw new AppError("Representante não encontrado!");
        }

        if (representante.statusRepresent == 1) {
            throw new AppError("Representante já está ativo!");
        }

        await this.representanteRepository.ativar(idRepresent);
    }
}

export { RepresentanteController };