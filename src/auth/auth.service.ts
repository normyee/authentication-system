import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserRepository } from 'src/user-auth/infra/database/prisma/repositories/user.repository';
import { LoginDTO } from './dto/login.dto';
import { ISignatureSecutiry } from 'src/user-auth/application/interfaces/signature-security';
import { IHasher } from 'src/user-auth/application/interfaces/hasher';
import { ICachedMemory } from 'src/user-auth/application/interfaces/cached-memory';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepostory: UserRepository,
    @Inject('ISignatureSecutiry') 
    private readonly _signatureSecutiry: ISignatureSecutiry,
    @Inject('IHasher') private readonly _hasher: IHasher,
    @Inject("ICachedMemory") private readonly _cachedMemory: ICachedMemory,
  ) {}
  async signUp(data: UserDTO) {
    const { name, email, password } = data;

    const emailInUse = await this.userRepostory.getUserByEmail(email);
    if (emailInUse) throw new BadRequestException('Email em uso');

    const hashedPassword = await this._hasher.hash(password, 10);

    await this.userRepostory.create({ name, email, password: hashedPassword });

    return {
      message: 'usuário cadastrado',
    };
  }

  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await this.userRepostory.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('Login incorreto');

    const passwordMatch = await this._hasher.compare(password, user.password);

    if (!passwordMatch) throw new UnauthorizedException('Login incorreto');

    const loginToken = this._signatureSecutiry.generateCredentialToken(user.id);
    return {
      message: 'Login efetuado com successo',
      accessToken: loginToken,
    };
  }

  async logout(token: string) {
    const isLoggeout = await this._cachedMemory.getValue(token);

    if (isLoggeout) return { message: 'Credencial inválida' };

    await this._cachedMemory.setValue(token, token);

    return { message: 'Usuário deslogado com sucesso' };
  }
}
