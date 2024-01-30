import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { AppError } from "../errors/AppError";

interface IRequest {
    email: string;
    senha: string;
}

interface IResponse {
    user: {
        nome: string;
        email: string;
    },
    token: string;
}

class AutenticacaoController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    async autenticar(email: string, senha: string) {

        const usuario = await this.usuarioRepository.findByEmail(email);

        if (!usuario) {
            throw new AppError("E-mail ou senha incorretos!");
        }

        const comparacaoSenha = usuario.senhaUsuario == senha;

        if (!comparacaoSenha) {
            throw new AppError("E-mail ou senha incorretos!");
        }

        if (usuario.statusUsuario == 0) {
            throw new AppError("Usuario se encontra Inativo!");
        }

        const token = sign({}, "583305b64b35a829cf52e02ec37b1a42", {
            subject: String(usuario.idUsuario),
            expiresIn: "1d"
        }); 

        const tokenReturn: IResponse = {
            token,
            user: {
                nome: usuario.nomeUsuario,
                email: usuario.emailUsuario
            }
        }

        return tokenReturn;
    }
}

export { AutenticacaoController };