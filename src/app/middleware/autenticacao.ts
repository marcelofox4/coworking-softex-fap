import { NextFunction, Request, Response } from "express";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { AdminRepository } from "../repositories/AdminRepository";
import { RecepcaoRepository } from "../repositories/RecepcaoRepository";
import { stat } from "fs";

interface IPayload {
    sub: string;
}

export async function autenticacao(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Faltando token para Autenticação!", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: userId } = verify(token, "583305b64b35a829cf52e02ec37b1a42") as IPayload;
        
        const usuarioRepository = new UsuarioRepository();
        const usuario = await usuarioRepository.findById(Number(userId));

        if (!usuario) {
            throw new AppError("Usuário Inexistente!", 401);
        }

        next();
    } catch (error) {
        throw new AppError("Token Inválido!", 401);
    }
}

export async function autenticacaoAdmin(request: Request, response: Response, next: NextFunction) {
    
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("Faltando token para Autenticação!", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: userId } = verify(token, "583305b64b35a829cf52e02ec37b1a42") as IPayload;
        
        const usuarioRepository = new UsuarioRepository();
        const usuario = await usuarioRepository.findById(Number(userId));
        
        if (!usuario) {
            throw new AppError("Usuário Inexistente!", 401);
        }

        const idUsuario = usuario.idUsuario;
        const adminRepository = new AdminRepository();
        const admin = await adminRepository.findByIdUsuario(idUsuario);

        if(!admin) {
            throw new AppError("Usuario não é Administrador!", 401);
        }

        next();
    } catch (error) {
        throw new AppError("Token Inválido!", 401);
    }
}
