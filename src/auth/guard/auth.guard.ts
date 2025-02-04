import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { RequestSession } from 'src/common/types';
import { ISignatureSecutiry } from 'src/user-auth/application/interfaces/signature-security';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('ISignatureSecutiry')
    private _signatureSecutiry: ISignatureSecutiry,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestSession = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeaders(request);

    if (!token) throw new UnauthorizedException('Sem acesso ao recurso');

    try {
      const payload = this._signatureSecutiry.verifyCredentialToken(token);
      request.session = { userId: payload.id, token: token };
    } catch (error) {
      Logger.error(error.message);
      throw new UnauthorizedException('Sem acesso ao recurso');
    }

    return true;
  }

  private extractTokenFromHeaders(request: Request): string | undefined {
    return request.headers.authorization?.split(' ')[1];
  }
}
