import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('EnderecoFiscal')
export default class EnderecoFiscal {

    @PrimaryGeneratedColumn({ name: 'Num_End_Fiscal', type: 'int' })
    numEndFiscal: number;
   
    @Column({ name: 'Status_End_Fiscal', type: 'int', nullable: false })
    statusEndFiscal: number;

    @CreateDateColumn({ name: 'Created_at_End_Fiscal', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAtEndFiscal: Date;

    @UpdateDateColumn({ name: 'Updated_at_End_Fiscal', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    updatedAtEndFiscal: Date;

    constructor() {
        this.statusEndFiscal = 1
    }
}
