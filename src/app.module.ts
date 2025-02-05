import { Module } from '@nestjs/common';
import { AppController } from './user-auth/infra/http/list.controller';
import { PrismaModule } from './user-auth/infra/database/prisma/prisma.module';
import { UserRepository } from './user-auth/infra/database/prisma/repositories/user.repository';
import { AuthModule } from './user-auth/infra/modules/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ListRepository } from './user-auth/infra/database/prisma/repositories/list.repository';
import { RedisService } from './user-auth/infra/database/redis/redis.service';
import { CreateListUseCase } from './user-auth/application/usecases/create-list.use-case';
import { UpdateListUseCase } from './user-auth/application/usecases/update-list.use-case';
import { GetListByIdUseCase } from './user-auth/application/usecases/get-list-by-id.use-case';
import { DeleteListUseCase } from './user-auth/application/usecases/delete-list.use-case';
import { jwtSecurity } from './user-auth/infra/services/jwt-security.service';
import { MemoryCacheModule } from './user-auth/infra/modules/memory-cache.module';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'jh;H=[}GsYn0rPd7H->H' }),
    PrismaModule,
    AuthModule,
    MemoryCacheModule,
  ],
  controllers: [AppController],
  providers: [
    UserRepository,
    {
      provide: 'IListRepository',
      useClass: ListRepository,
    },
    {
      provide: 'ICachedMemory',
      useExisting: RedisService,
    },
    CreateListUseCase,
    UpdateListUseCase,
    GetListByIdUseCase,
    DeleteListUseCase,
    {
      provide: 'ISignatureSecutiry',
      useClass: jwtSecurity,
    },
    {
      provide: 'IUserRepository',
      useExisting: UserRepository,
    },
  ],
})
export class AppModule {}
