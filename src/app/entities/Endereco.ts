import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('Endereco')
export default class Endereco {

    @PrimaryGeneratedColumn({ name: 'Id_Endereco', type: 'int' })
    idEndereco: number;
   
    @Column({ name: 'Logradouro', length: 100, nullable: false })
    logradouro: string;

    @Column({ name: 'Numero', nullable: false  })
    numero: number;

    @Column({ name: 'Bairro', length: 100, nullable: false  })
    bairro: string;

    @Column({ name: 'UF', length: 2, nullable: false  })
    uf: string;
}
