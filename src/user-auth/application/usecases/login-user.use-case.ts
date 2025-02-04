import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/user-auth/infra/database/prisma/repositories/user.repository';
import { ISignatureSecutiry } from 'src/user-auth/application/interfaces/signature-security';
import { IHasher } from 'src/user-auth/application/interfaces/hasher';
import { LoginDTO } from '../dtos/login.dto';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepostory: UserRepository,
    @Inject('ISignatureSecutiry')
    private readonly _signatureSecutiry: ISignatureSecutiry,
    @Inject('IHasher') private readonly _hasher: IHasher,
  ) {}

  async execute(data: LoginDTO) {
    const { email, password } = data;

    const user = await this.userRepostory.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('Login incorreto');

    const passwordMatch = await this._hasher.compare(password, user.password);

    if (!passwordMatch) throw new UnauthorizedException('Login incorreto');

    return this._signatureSecutiry.generateCredentialToken(user.id);
  }
}
