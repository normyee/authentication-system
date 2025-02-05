import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/user-auth/domain/repositories/user.repository';

@Injectable()
export class VerifyEmailUseCase {
  constructor(
    @Inject('IUserRepository') private readonly _userRepostory: IUserRepository,
  ) {}
  async execute(emailToken: string) {
    const user = await this._userRepostory.getUserByEmailToken(emailToken);

    return await this._userRepostory.update(user.id, {
      verified: true,
      emailToken: null,
    });
  }
}
