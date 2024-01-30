import "reflect-metadata"
import { DataSource } from "typeorm"
import Cliente from "../app/entities/Cliente"
import Admin from "../app/entities/Admin"
import Endereco from "../app/entities/Endereco"
import EnderecoFiscal from "../app/entities/EnderecoFiscal"
import Recepcao from "../app/entities/Recepcao"
import PessoaFisica from "../app/entities/PessoaFisica"
import PessoaJuridica from "../app/entities/PessoaJuridica"
import Encomenda from "../app/entities/Encomenda"
import RecebimentoEncomenda from "../app/entities/RecebimentoEncomenda"
import Usuario from "../app/entities/Usuario"
import Representante from "../app/entities/Representante"
import RetiradaEncomenda from "../app/entities/RetiradaEncomenda"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "coworking",
    synchronize: false,
    logging: false,    
    entities: [Cliente, Encomenda, Endereco, EnderecoFiscal, 
                Admin, Recepcao, PessoaFisica, PessoaJuridica, 
                RecebimentoEncomenda, RetiradaEncomenda, Usuario, 
                Representante],    
    migrations: [],
    subscribers: [],
})
