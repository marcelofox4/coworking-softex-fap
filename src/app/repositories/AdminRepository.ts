import Admin from "../entities/Admin";
import { Repository } from "typeorm";
import { AppDataSource } from "../../database/data-source";
import IAdmin from "../interfaces/IAdmin";
import IAdminUpdate from "../interfaces/update/IAdminUpdate";

class AdminRepository{
    
    private adminRepository: Repository<Admin>;

    constructor() {
        this.adminRepository = AppDataSource.getRepository(Admin);
    }

    async create({ idUsuario }: IAdmin): Promise<Admin> {
        const admin = await this.adminRepository.create({
            idUsuario
        });
        
        return await this.adminRepository.save(admin);
    }

    async list(): Promise<Admin[]> {
        return await this.adminRepository.find();
    }

    async findById(idAdmin: number): Promise<Admin | null> {
        return await this.adminRepository.findOneOrFail({ where: [{ idAdmin }] });
    }

    async findByIdUsuario(idUsuario: number): Promise<Admin | null> {
        return await this.adminRepository.findOne({ where: { idUsuario } });
    }

    async update(idAdmin: number, updatedData: IAdminUpdate): Promise<void> {
        
        const admin = await this.adminRepository.findOneOrFail({ where: [{ idAdmin }] });
        
        if(admin) {
            await this.adminRepository.update({ idAdmin: idAdmin}, { idUsuario: updatedData.idUsuario });
        }
    }

    async delete(idAdmin: number): Promise<void | null> {
        const admin = await this.adminRepository.findOne({ where: [{ idAdmin }] });
        if (admin) {
            await this.adminRepository.remove(admin);
        }
    }
}

export { AdminRepository };