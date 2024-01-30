interface IClienteCreate{
    nomeCliente: string;
    telefoneCliente: string;
    emailCliente: string;
    qtdPontosCliente: number;
    prazoCliente: Date;
    valorMensalCliente: number;
    enderecoIdEndereco?: number;
    adminIdAdmin?: number;
    enderecoFiscalNumEndFiscal?: number;
}

export default IClienteCreate;