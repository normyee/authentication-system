import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { IHasher } from 'src/user-auth/application/interfaces/hasher';

@Injectable()
export class BcryptService implements IHasher {
  async hash(password: string, saltRounds: number = 10): Promise<string> {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (error) {
      throw new Error('Erro ao gerar o hash da senha: ' + error.message);
    }
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword);
      return isMatch;
    } catch (error) {
      throw new Error('Erro ao comparar a senha: ' + error.message);
    }
  }
}
