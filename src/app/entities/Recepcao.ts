import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Usuario from "./Usuario";

@Entity('Recepcao')
export default class Recepcao {

    @PrimaryGeneratedColumn({ name: 'Id_Recepcao' })
    idRecepcao: number;

    @Column({ name: 'Id_Usuario', type: 'int', nullable: false })
    idUsuario: number;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Id_Usuario', referencedColumnName: 'idUsuario' })
    usuario: Usuario;
}
