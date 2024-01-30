import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import Encomenda from "./Encomenda";
import Representante from "./Representante";

@Entity('RetiradaEncomenda')
export default class RetiradaEncomenda {
    @PrimaryGeneratedColumn({ name: 'Id_Retir_Encomenda', type: 'int' })
    idRetirEncomenda: number;

    @Column({ name: 'DataHora_Retir_encomenda', nullable: false })
    dataHoraRetirEncomenda: Date;

    @Column({ name: 'Obs_Retir_encomenda', length: 200, nullable: false })
    obsRetirEncomenda: string;

    @Column({ name: 'Encomenda_Id_Encomenda', type: 'int', nullable: false })
    idEncomenda: number;

    @Column({ name: 'Representante_Id_Represent', type: 'int', nullable: false })
    idRepresent: number;

    @ManyToOne(() => Encomenda, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Encomenda_Id_Encomenda', referencedColumnName: 'idEncomenda' })
    encomenda: Encomenda;

    @ManyToOne(() => Representante, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'Representante_Id_Represent', referencedColumnName: 'idRepresent' })
    representante: Representante;

}
