import { Inject, Injectable } from '@nestjs/common';
import { Session } from 'src/common/types';
import { IListRepository } from 'src/user-auth/domain/repositories/list.repository';
import { ICachedMemory } from '../interfaces/cached-memory';
import { ListResponseDTO } from '../dtos/list-response.dto';

@Injectable()
export class GetListByIdUseCase {
  constructor(
    @Inject('IListRepository')
    private readonly _listRepository: IListRepository,
    @Inject('ICachedMemory') private readonly _cacheMemory: ICachedMemory,
  ) {}
  async execute(session: Session, id: number): Promise<ListResponseDTO> {
    const isBlacklisted = await this._cacheMemory.getValue(session.token);

    if (isBlacklisted) return null;

    return await this._listRepository.getById(id);
  }
}
