import Encomenda from "../entities/Encomenda";
import IEncomendaCreate from "../interfaces/create/IEncomendaCreate";
import IEncomendaUpdate from "../interfaces/update/IEncomendaUpdate";
import { EncomendaRepository } from "../repositories/EncomendaRepository";

class EncomendaController {

    constructor(private encomendaRepository: EncomendaRepository) {}

    // async create(obsEncomenda: string, numEndFiscal: number): Promise<Encomenda> {
    //     const encomenda = await this.encomendaRepository.create({ obsEncomenda, numEndFiscal })
    //     return await this.encomendaRepository.create(encomenda);
    // }

    async create(dadosEncomenda: Encomenda): Promise<void> {
        //falta a validação

        await this.encomendaRepository.create(dadosEncomenda);
    }

    async list(): Promise<Encomenda[]> {
        return await this.encomendaRepository.list();
    }

    async findById(id: number): Promise<Encomenda> {
        
        const encomenda = await this.encomendaRepository.findById(id);

        if(!encomenda) {
            throw new Error("Encomenda inexistente!");
        }
        return encomenda;
    }

    async update(id: number, dadosEncomenda: IEncomendaUpdate): Promise<void> {
        const encomenda = await this.encomendaRepository.findById(id);

        if(!encomenda) {
            throw new Error("Encomenda inexistente!");
        }

        await this.encomendaRepository.update(id, dadosEncomenda);
    }

    async delete(id: number): Promise<void> {
        const encomenda = await this.encomendaRepository.findById(id);

        if(!encomenda) {
            throw new Error("Encomenda inexistente!");
        }
        await this.encomendaRepository.delete(id);
    }
}

export { EncomendaController };

// encomendaRouter.get("/:id", async (req: Request, resp: Response): Promise<Response> => {
//     try {
//         const encomendaRepository = new EncomendaRepository();
//         const idEncomenda = parseInt(req.params.id, 10);

//         console.log("ID da Encomenda:", idEncomenda);

//         if (isNaN(idEncomenda)) {
//             console.log("ID da Encomenda inválido!");
//             return resp.status(400).json({ error: "ID da encomenda inválido!" });   
//         }
        
//         const encomendaEncontrado = await encomendaRepository.getEncomendaById(idEncomenda);

//         console.log("Encomenda Encontrado:", encomendaEncontrado);

//         if (encomendaEncontrado && encomendaEncontrado.length > 0) {
//             return resp.status(200).json(encomendaEncontrado);
//         } else {
//             console.log("Encomenda não encontrado.");
//             return resp.status(404).json({ error: "Encomenda não encontrado." });
//         }        
//     } catch(error) {
//         console.log("Erro ao buscar encomenda por ID:", error);
//         return resp.status(500).json({ error: "Erro ao buscar encomenda por ID.", details: error });
//     }
// });

// export default encomendaRouter;