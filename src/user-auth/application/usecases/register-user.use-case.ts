import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IHasher } from 'src/user-auth/application/interfaces/hasher';
import { UserDTO } from '../dtos/user.dto';
import { IUserRepository } from 'src/user-auth/domain/repositories/user.repository';
import { IMailingValidation } from '../interfaces/mailing-validation';
import { IEmailToken } from '../interfaces/email-token';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly _userRepostory: IUserRepository,
    @Inject('IHasher') private readonly _hasher: IHasher,
    @Inject('IMailingValidation')
    private readonly _mailingValidation: IMailingValidation,
    @Inject('IEmailToken') private readonly _emailToken: IEmailToken,
  ) {}
  async execute(data: UserDTO) {
    const { name, email, password } = data;

    const emailInUse = await this._userRepostory.getUserByEmail(email);
    if (emailInUse) throw new BadRequestException('Email em uso');

    const hashedPassword = await this._hasher.hash(password, 10);

    const emailToken = this._emailToken.generate();

    await this._mailingValidation.execute(email, emailToken);

    return await this._userRepostory.create({
      name,
      email,
      password: hashedPassword,
      emailToken,
    });
  }
}
