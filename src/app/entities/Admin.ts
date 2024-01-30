import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import Usuario from './Usuario';

@Entity('Admin')
export default class Admin {

    @PrimaryGeneratedColumn({ name: 'Id_Admin', type: 'int' })
    idAdmin: number;

    @Column({ name: 'Id_Usuario', type: 'int', nullable: false })
    idUsuario: number;

    @OneToOne(() => Usuario, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Id_Usuario', referencedColumnName: 'idUsuario' }) 
    usuario: Usuario;
}
