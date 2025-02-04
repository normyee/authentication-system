import { Injectable } from '@nestjs/common';
import { ListRepository } from '../infra/database/prisma/repositories/list.repository';

@Injectable()
export class ListService {
  constructor(private readonly listRepository: ListRepository) {}
  async create(userId: number, data: any): Promise<any> {
    return await this.listRepository.create(userId, data);
  } 

  async update(id: number, data: any): Promise<any> {
    return await this.listRepository.update(id, data);
  }

  async getById(id: number): Promise<any> {
    return await this.listRepository.getById(id);
  }

  async delete(id: number): Promise<any> {
    return await this.listRepository.delete(id);
  }
}
