import Recepcao from "../entities/Recepcao";
import { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IRecepcao from "../interfaces/IRecepcao";

class RecepcaoRepository {
    private recepcaoRepository: Repository<Recepcao>;

    constructor() {
        this.recepcaoRepository = AppDataSource.getRepository(Recepcao);
    }

    async create({ idUsuario }: IRecepcao): Promise<Recepcao> {
        const recepcao = await this.recepcaoRepository.create({
            idUsuario
        });
        return await this.recepcaoRepository.save(recepcao);
    }   
    
    async list(): Promise<Recepcao[]> {
        return await this.recepcaoRepository.find();
    }

    async findById(idRecepcao: number): Promise<Recepcao | null> {
        return await this.recepcaoRepository.findOneOrFail({ where: [{ idRecepcao }] });
    }

    async findByIdUsuario(idUsuario: number): Promise<Recepcao | null> {
        return await this.recepcaoRepository.findOne({ where: { idUsuario } });
    }

    async update(idRecepcao: number, { idUsuario }: IRecepcao): Promise<Recepcao | null> {
        const recepcao = await this.recepcaoRepository.findOneOrFail({ where: [{ idRecepcao }] });
        recepcao.idUsuario = idUsuario;
        return await this.recepcaoRepository.save(recepcao);
    }
    async delete(idRecepcao: number): Promise<Recepcao | null> {
        const recepcao = await this.recepcaoRepository.findOneOrFail({ where: [{ idRecepcao }] });
        return await this.recepcaoRepository.remove(recepcao);
    }

}


export { RecepcaoRepository };

