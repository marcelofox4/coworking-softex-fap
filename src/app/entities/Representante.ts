import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import PessoaJuridica from "./PessoaJuridica";

@Entity('Representante')
export default class Representante {
    @PrimaryGeneratedColumn({ name: 'Id_Represent', type: 'int' })
    idRepresent: number;

    @Column({ name: 'Nome_Represent', length: 100, nullable: false  })
    nomeRepresent: string;

    @Column({ name: 'Email_Represent', length: 100, nullable: false  })
    emailRepresent: string;
    
    @Column({ name: 'Status_Represent', nullable: false, type: 'int'  })
    statusRepresent: number;

    @Column({ name: 'Telefone_Represent', length: 11, nullable: false  })
    telefoneRepresent: string;

    @Column({ name: 'Updated_at_Represent', nullable: false })
    updatedAtRepresent: Date;

    @Column({ name: 'Created_at_Represent', nullable: false })
    createdAtRepresent: Date;

    @Column({ name: 'Id_PJuridica', type: 'int', nullable: false })
    idPJuridica: number;

    @ManyToOne(() => PessoaJuridica, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Id_PJuridica', referencedColumnName: 'idPJuridica' })
    pessoaJuridica: PessoaJuridica;

    constructor() {
        this.statusRepresent = 1;
    }
}