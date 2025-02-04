import { Module } from '@nestjs/common';
import { AppController } from './user-auth/infra/http/list.controller';
import { ListService } from './user-auth/application/list.service';
import { PrismaModule } from './user-auth/infra/database/prisma/prisma.module';
import { UserRepository } from './user-auth/infra/database/prisma/repositories/user.repository';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ListRepository } from './user-auth/infra/database/prisma/repositories/list.repository';
import { RedisModule } from './user-auth/infra/database/redis/redis.module';
import { RedisService } from './user-auth/infra/database/redis/redis.service';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'jh;H=[}GsYn0rPd7H->H' }),
    PrismaModule,
    AuthModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [
    ListService,
    UserRepository,
    {
      provide: 'IListRepository',
      useClass: ListRepository,
    },
    {
      provide: 'ICachedMemory',
      useExisting: RedisService,
    },
  ],
})
export class AppModule {}
