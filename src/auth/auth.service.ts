import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { UserRepository } from 'src/user-auth/infra/database/prisma/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/user-auth/infra/database/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepostory: UserRepository,
    private jwtService: JwtService,
    private readonly cacheMemory: RedisService,
  ) {}
  async signUp(data: UserDTO) {
    const { name, email, password } = data;

    const emailInUse = await this.userRepostory.getUserByEmail(email);
    if (emailInUse) throw new BadRequestException('Email em uso');

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepostory.create({ name, email, password: hashedPassword });

    return {
      message: 'usuário cadastrado',
    };
  }

  async login(data: LoginDTO) {
    const { email, password } = data;

    const user = await this.userRepostory.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('Login incorreto');

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new UnauthorizedException('Login incorreto');

    const loginToken = this.generateCredentialToken(user.id);
    return {
      message: 'Login efetuado com successo',
      accessToken: loginToken,
    };
  }

  async logout(token: string) {
    const isLoggeout = await this.cacheMemory.getValue(token);

    if (isLoggeout) return { message: 'Credencial inválida' };

    await this.cacheMemory.setValue(token, token);

    return { message: 'Usuário deslogado com sucesso' };
  }

  generateCredentialToken(id: number) {
    const accessToken = this.jwtService.sign({ id }, { expiresIn: '1h' });

    return { accessToken };
  }
}
