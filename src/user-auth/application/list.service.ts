import { Injectable } from '@nestjs/common';
import { ListRepository } from '../infra/database/prisma/repositories/list.repository';
import { RedisService } from '../infra/database/redis/redis.service';

@Injectable()
export class ListService {
  constructor(
    private readonly listRepository: ListRepository,
    private readonly cacheMemory: RedisService,
  ) {}
  async create(session: any, data: any): Promise<any> {
    const isBlacklisted = await this.cacheMemory.getValue(session.token);

    if (isBlacklisted) return null;

    return await this.listRepository.create(session.userId, data);
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
