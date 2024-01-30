import Admin from "../entities/Admin";
import { AdminRepository } from "../repositories/AdminRepository";
import { AppError } from "../errors/AppError";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

class AdminController {

    constructor(
        private adminRepository: AdminRepository,
        private usuarioRepository: UsuarioRepository
        ) {}

    async list(): Promise<Admin[]> {
        return await this.adminRepository.list();
    }

    async findById(id: number): Promise<Object> {
        const admin = await this.adminRepository.findById(id);
    
        if(!admin) {
            throw new AppError("Admin inexistente!");
        }

        const usuario = await this.usuarioRepository.findById(admin?.idUsuario);
        return [
            admin,
            usuario
        ];
    }
}

export {AdminController };