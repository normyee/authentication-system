import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { ICachedMemory } from 'src/user-auth/application/interfaces/cached-memory';

@Injectable()
export class LogoutUserUseCase {
  constructor(
    @Inject('ICachedMemory') private readonly _cachedMemory: ICachedMemory,
  ) {}

  async execute(token: string) {
    const isLoggeout = await this._cachedMemory.getValue(token);

    if (isLoggeout) return { message: 'Credencial inválida' };

    await this._cachedMemory.setValue(token, token);

    return { message: 'Usuário deslogado com sucesso' };
  }
}
