import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IHasher } from 'src/user-auth/application/interfaces/hasher';
import { UserDTO } from '../dtos/user.dto';
import { IUserRepository } from 'src/user-auth/domain/repositories/user.repository';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly _userRepostory: IUserRepository,
    @Inject('IHasher') private readonly _hasher: IHasher,
  ) {}
  async execute(data: UserDTO) {
    const { name, email, password } = data;

    const emailInUse = await this._userRepostory.getUserByEmail(email);
    if (emailInUse) throw new BadRequestException('Email em uso');

    const hashedPassword = await this._hasher.hash(password, 10);

    return await this._userRepostory.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
