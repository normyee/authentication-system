import { Inject, Injectable } from '@nestjs/common';
import { Session } from 'src/common/types';
import { List } from 'src/user-auth/domain/entities/list.entity';
import { IListRepository } from 'src/user-auth/domain/repositories/list.repository';
import { ICachedMemory } from '../interfaces/cached-memory';

@Injectable()
export class CreateListUseCase {
  constructor(
    @Inject('IListRepository')
    private readonly _listRepository: IListRepository,
    @Inject('ICachedMemory') private readonly _cacheMemory: ICachedMemory,
  ) {}
  async execute(session: Session, data: any): Promise<List> {
    const isBlacklisted = await this._cacheMemory.getValue(session.token);

    if (isBlacklisted) return null;

    return await this._listRepository.create(session.userId, data);
  }
}
