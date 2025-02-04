import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from '../infra/database/redis/redis.service';
import { IListRepository } from '../domain/repositories/list.repository';
import { Session } from 'src/common/types';
import { List } from '../domain/entities/list.entity';
import { ICachedMemory } from './interfaces/cached-memory';

@Injectable()
export class ListService {
  constructor(
    @Inject('IListRepository')
    private readonly _listRepository: IListRepository,
    @Inject('ICachedMemory') private readonly _cacheMemory: ICachedMemory,
  ) {}
  async create(session: Session, data: any): Promise<List> {
    const isBlacklisted = await this._cacheMemory.getValue(session.token);

    if (isBlacklisted) return null;

    return await this._listRepository.create(session.userId, data);
  }

  async update(id: number, data: any): Promise<any> {
    return await this._listRepository.update(id, data);
  }

  async getById(id: number): Promise<any> {
    return await this._listRepository.getById(id);
  }

  async delete(id: number): Promise<any> {
    return await this._listRepository.delete(id);
  }
}
