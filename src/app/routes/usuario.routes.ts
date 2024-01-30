import { Router } from "express";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { UsuarioController } from "../controllers/UsuarioController";
import { AdminRepository } from "../repositories/AdminRepository";
import { RecepcaoRepository } from "../repositories/RecepcaoRepository";
import { AutenticacaoController } from "../controllers/AutenticacaoController";
import { autenticacaoAdmin } from "../middleware/autenticacao";

const usuarioRoutes = Router();
const usuarioRepository = new UsuarioRepository();
const adminRepository = new AdminRepository();
const recepcaoRepository = new RecepcaoRepository()
const usuarioController = new UsuarioController(
    usuarioRepository,
    adminRepository,
    recepcaoRepository
);
const autenticacaoController = new AutenticacaoController(usuarioRepository);

usuarioRoutes.get("/", async (request, response) => {

    try {
        const usuarios = await usuarioController.list();

        return response.status(200).json(usuarios);
    } catch (error) {
        return response.status(400).json(error);
    }
})

usuarioRoutes.get("/ativos", async (request, response) => {

    try {
        await autenticacaoAdmin(request, response, () => {});
        const usuariosAtivos = await usuarioController.listAtivos();

        if(usuariosAtivos.length === 0) {
            return response.status(404).json({ message: "Nenhum usuário ativo encontrado."});
        } else {
        return response.status(200).json(usuariosAtivos);
        }
    } catch (error) {
        response.status(401).json(error);
    }  
})

usuarioRoutes.get("/inativos", async (request, response) => {

    try {
     
        await autenticacaoAdmin(request, response, () => {});
        const usuarios = await usuarioController.listInativos();

        if(usuarios.length === 0) {
            return response.status(404).json({ message: "Nenhum usuário inativo encontrado."});
        } else {
        return response.status(200).json(usuarios);
    }
    } catch (error) {
        response.status(401).json(error);
    } 
})

usuarioRoutes.get("/email/:email", async (request, response) => {

    const email = request.params.email;

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            const usuario = await usuarioController.findByEmail(email);
            response.status(200).json(usuario);
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

usuarioRoutes.get("/id/:id", async (request, response) => {

    const id = Number(request.params.id);

    try {
        const usuario = await usuarioController.findById(id);
        response.status(200).json(usuario);
    } catch (error) {
        response.status(400).json(error)
    }
})

usuarioRoutes.post("/admin", async (request, response) => {

    const { nomeUsuario, funcaoUsuario, emailUsuario, loginUsuario, senhaUsuario} = request.body;

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
        
            await usuarioController.createAdmin({
                nomeUsuario,
                funcaoUsuario,
                emailUsuario,
                loginUsuario,
                senhaUsuario,
            })
    
            response.status(201).json({ message: "Usuário Administrador cadastrado!" });
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
    
})

usuarioRoutes.post("/recepcao", async (request, response) => {

    const { nomeUsuario, funcaoUsuario, emailUsuario, loginUsuario, senhaUsuario} = request.body;

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            await usuarioController.createRecepcao({
                nomeUsuario,
                funcaoUsuario,
                emailUsuario,
                loginUsuario,
                senhaUsuario,
            })
    
            response.status(201).json({ message: "Usuário Recepção cadastrado!" });
        } catch (error) {
            response.status(400).json(error);
        }
    } catch (error) {
        response.status(401).json(error);
    }
})

usuarioRoutes.put("/:id", async (request, response) => {

    const idUsuario = parseInt(request.params.id);
    const {nomeUsuario, senhaUsuario} = request.body;
        
    if(isNaN(idUsuario)) {
        response.status(400).json({ error: "ID inválido."});
    }

    try {
        const usuario = await usuarioController.findById(idUsuario);
        if(!usuario) {
            response.status(404).json({ error: "Usuário não encontrado."});   
        }
            
        await usuarioController.update(idUsuario, {nomeUsuario, senhaUsuario});
            
        response.status(200).json({ message: "Usuário atualizado!" });
    } catch (error) {
        return response.status(400).json({ message: "Erro ao atualizar usuário"});
    }
})

usuarioRoutes.patch("/inativar/:id", async (request, response) => {
    const idUsuario = Number(request.params.id);

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            const usuarioExists = await usuarioController.findById(idUsuario);

            if (!usuarioExists) {
                response.status(404).json({ error: "Usuário não encontrado." });
            } else {
                await usuarioController.inativar(idUsuario);
                response.status(200).json({ message: "Usuário inativado!" });
            }
        } catch (error) {
            response.status(500).json({ error: "Erro interno do servidor." });
        }
    } catch (error) {
        response.status(401).json({ error: "Unauthorized" });
    }
});

usuarioRoutes.patch("/ativar/:id", async (request, response) => {
    const idUsuario = Number(request.params.id);

    try {
        await autenticacaoAdmin(request, response, () => {});

        try {
            const usuarioExists = await usuarioController.findById(idUsuario);

            if (!usuarioExists) {
                response.status(404).json({ error: "Usuário não encontrado." });
            } else {
                await usuarioController.ativar(idUsuario);
                response.status(200).json({ message: "Usuario ativado!" });
            }
        } catch (error) {
            response.status(500).json({ error: "Erro interno do servidor." });
        }
    } catch (error) {
        response.status(401).json({ error: "Unauthorized" });
    }
});


usuarioRoutes.delete("/:id", async (request, response) => {
    
    const idUsuario = Number(request.params.id);

    try {
        await usuarioController.deleteByid(idUsuario);
        response.status(200).json({ message: "Usuario excluido!" })
    } catch (error) {
        response.status(400).json(error);
    }
})

usuarioRoutes.post("/autenticacao", async (request, response) => {

    const { email, senha } = request.body;

    try {
        const token = await autenticacaoController.autenticar(email, senha);
        response.status(200).json(token);
    } catch (error) {
        response.status(400).json(error)
    }
})

export { usuarioRoutes };