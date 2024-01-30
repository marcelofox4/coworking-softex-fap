import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Cliente from "./Cliente";

@Entity('PessoaJuridica')
export default class PessoaJuridica {

    @PrimaryGeneratedColumn({ name: 'Id_PJuridica', type: 'int' })
    idPJuridica: number;

    @Column({ name: 'Cnpj', type: 'varchar', length: 14, nullable: false })
    cnpj: string;

    @Column({ name: 'Razao_social', type: 'varchar', length: 200, nullable: false })
    razaoSocial: string;

    @Column({ name: 'Cliente_Id_Cliente', type: 'int', nullable: false })
    idCliente: number;

    @OneToOne(() => Cliente, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Cliente_Id_Cliente', referencedColumnName: 'idCliente' })
    cliente: Cliente;
}
