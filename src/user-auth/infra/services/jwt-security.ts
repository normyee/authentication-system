import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ISignatureSecutiry } from 'src/user-auth/application/interfaces/signature-security';

@Injectable()
export class jwtSecurity implements ISignatureSecutiry {
  constructor(private readonly _jwtService: JwtService) {}

  generateCredentialToken(id: number): any {
    const accessToken = this._jwtService.sign({ id }, { expiresIn: '1h' });

    return { accessToken };
  }

  verifyCredentialToken(token: string): any {
    return this._jwtService.verify(token);
  }
}
