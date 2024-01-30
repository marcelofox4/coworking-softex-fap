import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Cliente from "./Cliente";

@Entity('PessoaFisica')
export default class PessoaFisica {

    @PrimaryGeneratedColumn({ name: 'Id_Pfisica', type: 'int' })
    idPfisica: number;

    @Column({ name: 'Cpf', type: 'varchar', length: 11, nullable: false })
    cpf: string;

    @Column({ name: 'Id_Cliente', type: 'int', nullable: false })
    idCliente: number;

    @OneToOne(() => Cliente, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Id_Cliente', referencedColumnName: 'idCliente' }) 
    cliente: Cliente;
}
