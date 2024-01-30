import Representante from "../entities/Representante";
import { AppDataSource } from "../../database/data-source";
import { Repository } from "typeorm";
import IRepresentanteCreate from "../interfaces/create/IRepresentanteCreate";
import { IRepresentanteUpdate } from "../interfaces/update/IRepresentanteUpdate";

class RepresentanteRepository {

    private representanteRepository: Repository<Representante>;

    constructor() {
        this.representanteRepository = AppDataSource.getRepository(Representante);
    }

    async create({ nomeRepresent, emailRepresent, telefoneRepresent, idPJuridica }: IRepresentanteCreate): Promise<Representante> {
        const representante = await this.representanteRepository.create({
            nomeRepresent,
            emailRepresent,
            telefoneRepresent,
            idPJuridica
        });
        
        await this.representanteRepository.save(representante);
        
        return representante;
    }

    async list(): Promise<Representante[]> {
        return await this.representanteRepository.find();
    }

    async listInativos(): Promise<Representante[]> {
        return await this.representanteRepository.find({ where: { statusRepresent: 0 } });
    }

    async listAtivos(): Promise<Representante[]> {
        return await this.representanteRepository.find({ where: { statusRepresent: 1 } });
    }

    async findById(idRepresent: number): Promise<Representante | null> {
        return await this.representanteRepository.findOne({ where: { idRepresent } });
    }

    async findByPj(id: number): Promise<Representante | null> {
        return await this.representanteRepository.findOne({ where: { idPJuridica: id } });
    }

    async findByEmail(email: string): Promise<Representante | null> {
        return await this.representanteRepository.findOne({ where: { emailRepresent: email } });
    }

    async update(idRepresent: number, {emailRepresent, telefoneRepresent}: IRepresentanteUpdate): Promise<void> {
        const representante = await this.representanteRepository.findOne({ where: { idRepresent } });
        
        if (representante) {
            await this.representanteRepository.update({ idRepresent: idRepresent }, { emailRepresent: emailRepresent, telefoneRepresent: telefoneRepresent });
        }
    }

    async inativarTodos(idPessoaJuridica: number): Promise<void> {
        
        const representantes = await this.representanteRepository.find({ where: { idPJuridica: idPessoaJuridica } });
        
        for (let i = 0; i < representantes.length; i++) {
            if(representantes[i]) {
                await this.representanteRepository.update({ idRepresent: representantes[i].idRepresent }, { statusRepresent: 0 });
            }
        }
    }

    async ativarTodos(idPessoaJuridica: number): Promise<void> {
        
        const representantes = await this.representanteRepository.find({ where: { idPJuridica: idPessoaJuridica } });
        
        for (let i = 0; i < representantes.length; i++) {
            if(representantes[i]) {
                await this.representanteRepository.update({ idRepresent: representantes[i].idRepresent }, { statusRepresent: 1 });
            }
        }
    }

    async inativar(idRepresent: number): Promise<void> {
        
        const representante = await this.representanteRepository.findOne({ where: { idRepresent } });

        if (representante) {
            await this.representanteRepository.update({ idRepresent: idRepresent }, { statusRepresent: 0 });   
        }
    }

    async ativar(idRepresent: number): Promise<void> {
        
        const representante = await this.representanteRepository.findOne({ where: { idRepresent } });

        if (representante) {
            await this.representanteRepository.update({ idRepresent: idRepresent }, { statusRepresent: 1 });
        }
    }

    async delete(idRepresent: number): Promise<void> {
        const representante = await this.representanteRepository.findOne({ where: { idRepresent } });

        if (representante) {
            await this.representanteRepository.remove(representante);
        }
    }
}

export { RepresentanteRepository };
