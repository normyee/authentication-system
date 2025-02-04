import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/user-auth/infra/database/prisma/repositories/user.repository';
import { PrismaModule } from 'src/user-auth/infra/database/prisma/prisma.module';
import { RedisModule } from 'src/user-auth/infra/database/redis/redis.module';
import { AuthController } from 'src/user-auth/infra/http/auth.controller';
import { jwtSecurity } from 'src/user-auth/infra/services/jwt-security.service';
import { BcryptService } from 'src/user-auth/infra/services/hash.service';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserRepository,
    {
      provide: 'ISignatureSecutiry',
      useClass: jwtSecurity,
    },
    {
      provide: 'IHasher',
      useClass: BcryptService,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
