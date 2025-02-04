import { Inject, Injectable } from '@nestjs/common';
import { Session } from 'src/common/types';
import { ICachedMemory } from '../interfaces/cached-memory';
import { IListRepository } from 'src/user-auth/domain/repositories/list.repository';

@Injectable()
export class UpdateListUseCase {
  constructor(
    @Inject('IListRepository')
    private readonly _listRepository: IListRepository,
    @Inject('ICachedMemory') private readonly _cacheMemory: ICachedMemory,
  ) {}
  async execute(session: Session, id: number, data: any): Promise<any> {
    const isBlacklisted = await this._cacheMemory.getValue(session.token);

    if (isBlacklisted) return null;

    return await this._listRepository.update(id, data);
  }
}
