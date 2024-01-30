import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Encomenda from "./Encomenda";
import EnderecoFiscal from "./EnderecoFiscal";
import Recepcao from "./Recepcao";

@Entity('RecebimentoEncomenda')
export default class RecebimentoEncomenda {
    @PrimaryGeneratedColumn({ name: 'Id_Receb_Encomenda' })
    idRecebEncomenda: number;

    @Column({ name: 'DataHora_Receb_Encomenda', type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    dataHoraRecebEncomenda?: Date | undefined;

    @Column({ name: 'Obs_Receb_encomenda', length: 200, nullable: false  })
    obsRecebEncomenda: string;

    @Column({ name: 'Encomenda_Id_Encomenda', type: 'int', nullable: false })
    encomendaIdEncomenda: number;

    @Column({ name: 'EnderecoFiscal_Num_End_Fiscal', type: 'int', nullable: false })
    enderecoFiscalNumEndFiscal: number;

    @Column({ name: 'Recepcao_Id_Recepcao', type: 'int', nullable: false })
    idRecepcao: number;

    @OneToOne(() => Encomenda, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Encomenda_Id_Encomenda', referencedColumnName: 'idEncomenda' })
    encomenda: Encomenda;

    @OneToOne(() => EnderecoFiscal, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'EnderecoFiscal_Num_End_Fiscal', referencedColumnName: 'numEndFiscal' })
    enderecoFiscal: EnderecoFiscal;

    @OneToOne(() => Recepcao, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Recepcao_Id_Recepcao', referencedColumnName: 'idRecepcao' })
    recepcao: Recepcao;

    constructor() {
        this.dataHoraRecebEncomenda = new Date();
    }
}
