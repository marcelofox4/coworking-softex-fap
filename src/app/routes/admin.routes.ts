import { Router } from "express";
import { AdminRepository } from "../repositories/AdminRepository";
import { AdminController } from "../controllers/AdminController";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

const adminRoutes = Router();
const adminRepository = new AdminRepository();
const usuarioRepository = new UsuarioRepository();
const adminController = new AdminController(
    adminRepository,
    usuarioRepository
);

adminRoutes.get("/", async(request, response) => {
    const admins = await adminController.list();
    
    return response.status(200).json(admins);
})

adminRoutes.get("/id/:id", async(request, response) => {
    const id = Number(request.params.id);

    try {
        const admin = await adminController.findById(id);
        response.status(200).json(admin);
    } catch(error) {
        response.status(400).json(error);
    }
})

export { adminRoutes };