import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import EnderecoFiscal from "./EnderecoFiscal";

@Entity('Encomenda')
export default class Encomenda {
    
    @PrimaryGeneratedColumn({ name: 'Id_Encomenda', type: 'int' })
    idEncomenda: number;

    @Column({ name: 'Obs_Encomenda', type: 'varchar', length: 100, nullable: false })
    obsEncomenda: string;

    @Column({ name: 'Cliente_EnderecoFiscal_Num_End_Fiscal', type: 'int', nullable: false })
    numEndFiscal: number;

    @OneToOne(() => EnderecoFiscal, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Cliente_EnderecoFiscal_Num_End_Fiscal', referencedColumnName: 'numEndFiscal' })
    enderecoFiscal: EnderecoFiscal;
}
