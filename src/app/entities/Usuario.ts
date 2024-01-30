import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Usuario')
export default class Usuario {

    @PrimaryGeneratedColumn({ name: 'Id_Usuario', type: 'int' })
    idUsuario: number;

    @Column({ name: 'Nome_Usuario', type: 'varchar', length: 100, nullable: false })
    nomeUsuario: string;

    @Column({ name: 'Funcao_Usuario', type: 'varchar', length: 50, nullable: false })
    funcaoUsuario: string;

    @Column({ name: 'Email_Usuario', type: 'varchar', length: 100, nullable: false })
    emailUsuario: string;

    @Column({ name: 'Login_Usuario', type: 'varchar', length: 50, nullable: false })
    loginUsuario: string;

    @Column({ name: 'Senha_Usuario', type: 'varchar', length: 50, nullable: false })
    senhaUsuario: string;

    @Column({ name: 'Status_Usuario', type: 'int', nullable: false })
    statusUsuario: number;

    @Column({ name: 'Created_at_Usuario', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAtUsuario?: Date;

    @Column({ name: 'Updated_at_Usuario', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAtUsuario?: Date;

    constructor() {
        this.statusUsuario = 1;
    }
}