import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infra/database/prisma/repositories/user.repository';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UserRepository) {}
  async getHello(): Promise<any> {
    await this.userRepository.create({
      name: 'fabricia',
      email: 'fabricia@gmail.com',
      password: 'dajsidjasidjasid',
    });
    return 'Hello World!';
  }
}
