import { Module } from '@nestjs/common';
import { UserRepository } from 'src/user-auth/infra/database/prisma/repositories/user.repository';
import { PrismaModule } from 'src/user-auth/infra/database/prisma/prisma.module';
import { AuthController } from 'src/user-auth/infra/http/user.controller';
import { jwtSecurity } from 'src/user-auth/infra/services/jwt-security.service';
import { BcryptService } from 'src/user-auth/infra/services/hash.service';
import { RedisService } from 'src/user-auth/infra/database/redis/redis.service';
import { RegisterUserUseCase } from 'src/user-auth/application/usecases/register-user.use-case';
import { LoginUserUseCase } from 'src/user-auth/application/usecases/login-user.use-case';
import { LogoutUserUseCase } from 'src/user-auth/application/usecases/logout-user.use-case';
import { MemoryCacheModule } from 'src/user-auth/infra/modules/memory-cache.module';
import { VerifyEmailUseCase } from 'src/user-auth/application/usecases/verify-email.use-case';
import { GmailUserValidationService } from '../services/mailing.service';
import { EmailTokenService } from '../services/email-token.service';
import { EmailPublisher } from '../services/queue/email-producer';

@Module({
  imports: [PrismaModule, MemoryCacheModule],
  controllers: [AuthController],
  providers: [
    UserRepository,
    {
      provide: 'ISignatureSecutiry',
      useClass: jwtSecurity,
    },
    {
      provide: 'IHasher',
      useClass: BcryptService,
    },
    {
      provide: 'ICachedMemory',
      useExisting: RedisService,
    },
    RegisterUserUseCase,
    LoginUserUseCase,
    LogoutUserUseCase,
    VerifyEmailUseCase,
    EmailPublisher,
    {
      provide: 'IUserRepository',
      useExisting: UserRepository,
    },
    {
      provide: 'IMailingValidation',
      useClass: GmailUserValidationService,
    },

    {
      provide: 'IEmailToken',
      useClass: EmailTokenService,
    },
    {
      provide: 'IEmailPublisher',
      useClass: EmailPublisher,
    },
  ],
  exports: [],
})
export class AuthModule {}
