import { Router } from "express";
import { usuarioRoutes } from "./usuario.routes";
import { enderecoRoutes } from "./endereco.routes";
import { adminRoutes } from "./admin.routes";
import { recepcaoRoutes } from "./recepcao.routes";
import { enderecoFiscalRoutes } from "./enderecofiscal.routes";
import { encomendaRoutes } from "./encomenda.routes";
import { pessoaFisicaRoutes } from "./pessoaFisica.routes";
import { pessoaJuridicaRoutes } from "./pessoaJuridica.routes";
import { recebimentoEncomendaRoutes } from "./recebimentoEncomenda.routes";
import { representanteRoutes } from "./representante.routes";
import { clienteRoutes } from "./cliente.routes";
import { retiradaEncomendaRoutes } from "./retiradaEncomenda.routes";
import { cadastroDeClienteRoutes } from "./cadastroCliente.routes";


const routes  = Router();

routes.use("/usuario", usuarioRoutes);
routes.use("/endereco", enderecoRoutes);
routes.use("/admin", adminRoutes);
routes.use("/recepcao", recepcaoRoutes);
routes.use("/enderecofiscal", enderecoFiscalRoutes);
routes.use("/encomenda", encomendaRoutes);
routes.use("/recebimentoencomenda", recebimentoEncomendaRoutes);
routes.use("/cliente", clienteRoutes);
routes.use("/pessoafisica", pessoaFisicaRoutes);
routes.use("/pessoaJuridica", pessoaJuridicaRoutes);
routes.use("/representante", representanteRoutes);
routes.use("/retiradaencomenda", retiradaEncomendaRoutes);
routes.use("/cadastroCliente", cadastroDeClienteRoutes);

export {routes};
