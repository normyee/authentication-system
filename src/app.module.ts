import { Module } from '@nestjs/common';
import { AppController } from './user-auth/infra/http/list.controller';
import { ListService } from './user-auth/application/list.service';
import { PrismaModule } from './user-auth/infra/database/prisma/prisma.module';
import { UserRepository } from './user-auth/infra/database/prisma/repositories/user.repository';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ListRepository } from './user-auth/infra/database/prisma/repositories/list.repository';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'jh;H=[}GsYn0rPd7H->H' }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [ListService, UserRepository, ListRepository],
})
export class AppModule {}
