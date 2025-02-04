import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeaders(request);

    if (!token) throw new UnauthorizedException('Sem acesso ao recurso');

    try {
      const payload = this.jwtService.verify(token);
      request.userId = payload.id;
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
