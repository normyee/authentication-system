import { Inject, Injectable } from '@nestjs/common';
import { Session } from 'src/common/types';
import { IListRepository } from 'src/user-auth/domain/repositories/list.repository';
import { ICachedMemory } from '../interfaces/cached-memory';
import { ListDTO } from '../dtos/list.dto';
import { ListResponseDTO } from '../dtos/list-response.dto';
import { IUserRepository } from 'src/user-auth/domain/repositories/user.repository';

@Injectable()
export class CreateListUseCase {
  constructor(
    @Inject('IListRepository')
    private readonly _listRepository: IListRepository,
    @Inject('IUserRepository')
    private readonly _userRepository: IUserRepository,
    @Inject('ICachedMemory') private readonly _cacheMemory: ICachedMemory,
  ) {}
  async execute(session: Session, data: ListDTO): Promise<ListResponseDTO> {
    const isBlacklisted = await this._cacheMemory.getValue(session.token);

    if (isBlacklisted) return null;

    const user = await this._userRepository.getById(session.userId);

    if (user.verified === false) return null;

    return await this._listRepository.create(session.userId, data);
  }
}
