import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Index } from "typeorm";
import Admin from "./Admin";
import Endereco from "./Endereco";
import EnderecoFiscal from "./EnderecoFiscal";

@Entity('Cliente')
@Index('fk_Cliente_Endereco_idx', ['enderecoIdEndereco'])
@Index('fk_Cliente_Admin_idx', ['adminIdAdmin'])
@Index('fk_Cliente_EnderecoFiscal_idx', ['enderecoFiscalNumEndFiscal'])
export default class Cliente {

  @PrimaryGeneratedColumn({ name: 'Id_Cliente', type: 'int' })
  idCliente: number;

  @Column({ name: 'Nome_Cliente', type: 'varchar', length: 100, nullable: false })
  nomeCliente: string;

  @Column({ name: 'Telefone_Cliente', type: 'varchar', length: 11, nullable: false })
  telefoneCliente: string;

  @Column({ name: 'Email_Cliente', type: 'varchar', length: 100, nullable: false })
  emailCliente: string;

  @Column({ name: 'Qtd_pontos_Cliente', type: 'int', nullable: false })
  qtdPontosCliente: number;

  @Column({ name: 'Prazo_Cliente', type: 'date', nullable: false })
  prazoCliente: Date;

  @Column({ name: 'Valor_mensal_Cliente', type: 'decimal', nullable: false })
  valorMensalCliente: number;

  @Column({ name: 'Status_Cliente', type: 'int', nullable: false })
  statusCliente: number;

  @Column({ name: 'Created_at_Cliente', type: 'datetime', nullable: false })
  createdAtCliente: Date;

  @Column({ name: 'Updated_at_Cliente', type: 'datetime', nullable: false })
  updatedAtCliente: Date;

  @Column({ name: 'Endereco_Id_Endereco', type: 'int', nullable: false })
  enderecoIdEndereco: number;

  @Column({ name: 'Admin_Id_Admin', type: 'int', nullable: false })
  adminIdAdmin: number;

  @Column({ name: 'EnderecoFiscal_Num_End_Fiscal', type: 'int', nullable: false })
  enderecoFiscalNumEndFiscal: number;

  @ManyToOne(() => Admin, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Admin_Id_Admin' })
  admin: Admin;

  @ManyToOne(() => Endereco, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'Endereco_Id_Endereco' })
  endereco: Endereco;

  @ManyToOne(() => EnderecoFiscal, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'EnderecoFiscal_Num_End_Fiscal' })
  enderecoFiscal: EnderecoFiscal;

  constructor() {
    this.statusCliente = 1;
    this.createdAtCliente = new Date();
    this.updatedAtCliente = new Date();
  }
}
