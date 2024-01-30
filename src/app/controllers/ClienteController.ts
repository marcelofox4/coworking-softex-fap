
import Cliente from '../entities/Cliente';
import ClienteRepository from '../repositories/ClienteRepository';
import IClienteCreate from '../interfaces/create/IClienteCreate';
import IClienteUpdate from '../interfaces/update/IClienteUpdate';
import { AppError } from '../errors/AppError';

class ClienteController {

  constructor(private clienteRepository: ClienteRepository) {}

  async create(clienteData: IClienteCreate): Promise<void> {
    
    const cliente = await this.clienteRepository.findByEmail(clienteData.emailCliente);

    if (cliente) {
      throw new Error("Cliente existente");
    }
  
    await this.clienteRepository.create(clienteData);
  }

  async list(): Promise<Cliente[]> {

    return await this.clienteRepository.list();
  }

  async listAtivados(): Promise<Cliente[]> {
    return await this.clienteRepository.listAtivados();
  }

  async listInativados(): Promise<Cliente[]> {
    return await this.clienteRepository.listInativados();
  }

  async findByEmail(email: string): Promise<Cliente> {

      const cliente = await this.clienteRepository.findByEmail(email);

      if(!cliente) {
          throw new AppError("Cliente não existente!");
      }

      return cliente;
  }

  async findById(id: number): Promise<Cliente> {

      const cliente = await this.clienteRepository.findById(id);

      if(!cliente) {
          throw new AppError("Cliente não encontrado!");
      }

      return cliente;
  }

  async update(id: number, clienteData: IClienteUpdate): Promise<void> {

      const cliente = await this.clienteRepository.findById(id);

      if (!cliente) {
          throw new AppError("Cliente inexistente!");
      }
      
      await this.clienteRepository.update(id, clienteData);
  }

  async deleteByid(id: number): Promise<void> {
      
      const cliente = await this.clienteRepository.findById(id);

      if (!cliente) {
          throw new AppError("Usuário não existente!");
      }

      await this.clienteRepository.delete(id);
  }

}

export default ClienteController;
