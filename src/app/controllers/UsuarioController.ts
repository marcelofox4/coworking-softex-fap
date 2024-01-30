import Usuario from "../entities/Usuario";
import { UsuarioRepository}  from "../repositories/UsuarioRepository";
import IUsuarioCreate from "../interfaces/create/IUsuarioCreate";
import IUsuarioUpdate from "../interfaces/update/IUsuarioUpdate";
import { AppError } from "../errors/AppError";
import { AdminRepository } from "../repositories/AdminRepository";
import { RecepcaoRepository } from "../repositories/RecepcaoRepository";

class UsuarioController {

    constructor(
        private usuarioRepository: UsuarioRepository,
        private adminRepository: AdminRepository,
        private recepcaoRepository: RecepcaoRepository
    ) {}

    async createAdmin(dadosUsuario: IUsuarioCreate): Promise<void> {

        const usuario = await this.usuarioRepository.findByEmail(dadosUsuario.emailUsuario);

        if (usuario) {
            throw new AppError("Usuário com E-mail já existente!");
        }

        const usuarioCriado = await this.usuarioRepository.create(dadosUsuario);
        const idUsuario = usuarioCriado.idUsuario;
        
        await this.adminRepository.create({ idUsuario });
    }

    async createRecepcao(dadosUsuario: IUsuarioCreate): Promise<void> {

        const usuario = await this.usuarioRepository.findByEmail(dadosUsuario.emailUsuario);

        if (usuario) {
            throw new AppError("Usuário já existente!");
        }

        const usuarioCriado = await this.usuarioRepository.create(dadosUsuario);
        const idUsuario = usuarioCriado.idUsuario;

        await this.recepcaoRepository.create({ idUsuario });
    }

    async list(): Promise<Usuario[]> {

        return await this.usuarioRepository.list();
    }

    async listAtivos(): Promise<Usuario[]> {

        return await this.usuarioRepository.listAtivos();
    }

    async listInativos(): Promise<Usuario[]> {

        return await this.usuarioRepository.listInativos();
    }

    async findByEmail(email: string): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findByEmail(email);

        if(!usuario) {
            throw new AppError("Usuário não encontrado!");
        }

        return usuario;
    }

    async findById(id: number): Promise<Usuario> {

        const usuario = await this.usuarioRepository.findById(id);

        if(!usuario) {
            throw new AppError("Usuário não encontrado!");
        }

        return usuario;
    }

    async inativar(idUsuario: number) {

        const usuario = await this.usuarioRepository.findById(idUsuario);

        if (!usuario) {
            throw new AppError("Usuário não encontrado!");
        }

        if (usuario.statusUsuario == 0) {
            throw new AppError("Usuário já está Inativo!");
        }

        await this.usuarioRepository.inativar(idUsuario);
    }

    async ativar(idUsuario: number) {

        const usuario = await this.usuarioRepository.findById(idUsuario);

        if (!usuario) {
            throw new AppError("Usuário não encontrado!");
        }

        if (usuario.statusUsuario == 1) {
            throw new AppError("Usuário já está ativo!");
        }

        await this.usuarioRepository.ativar(idUsuario);
    }

    async update(id: number, dadosUsuario: IUsuarioUpdate): Promise<void> {

        const usuario = await this.usuarioRepository.findById(id);

        if (!usuario) {
            throw new AppError("Usuário não encontrado!");
        }
         
        await this.usuarioRepository.update(id, dadosUsuario);
    }

    async deleteByid(id: number): Promise<void> {
        
        const usuario = await this.usuarioRepository.findById(id);

        if (!usuario) {
            throw new AppError("Usuário não encontrado!");
        }

        await this.usuarioRepository.delete(id);
    }

}

export { UsuarioController };
