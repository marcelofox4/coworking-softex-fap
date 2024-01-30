import { Request, Response, Router } from "express";
import Recepcao from "../entities/Recepcao";
import IRecepcao from "../interfaces/IRecepcao";
import { RecepcaoRepository } from "../repositories/RecepcaoRepository";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

class RecepcaoController {
    
    constructor(
                private recepcaoRepository: RecepcaoRepository,
                private usuarioRepository: UsuarioRepository
                ) {}
    
    async create({ idUsuario }: IRecepcao): Promise<Recepcao> {
        const recepcao = await this.recepcaoRepository.create({
            idUsuario
        });
        return await this.recepcaoRepository.create(recepcao);
    }

    async list(): Promise<Recepcao[]> {
        return await this.recepcaoRepository.list();
    }
 
    async findById(id: number): Promise<Object> {
        const recepcao = await this.recepcaoRepository.findById(id);
    
        if(!recepcao) {
            throw new Error("Recepção inexistente!");
        }
        const usuario = await this.usuarioRepository.findById(recepcao?.idUsuario);        
        return [
            recepcao,
            usuario
        ];
    }

}

export { RecepcaoController };

