import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user-auth/infra/database/prisma/repositories/user.repository';
import { IHasher } from 'src/user-auth/application/interfaces/hasher';
import { UserDTO } from '../dtos/user.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepostory: UserRepository,
    @Inject('IHasher') private readonly _hasher: IHasher,
  ) {}
  async execute(data: UserDTO) {
    const { name, email, password } = data;

    const emailInUse = await this.userRepostory.getUserByEmail(email);
    if (emailInUse) throw new BadRequestException('Email em uso');

    const hashedPassword = await this._hasher.hash(password, 10);

    const user = await this.userRepostory.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      data: { name: user.name, email: user.email },
      message: 'usuário cadastrado',
      success: true,
    };
  }
}
