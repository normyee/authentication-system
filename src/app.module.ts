import { Module } from '@nestjs/common';
import { AppController } from './user-auth/infra/http/app.controller';
import { AppService } from './user-auth/application/app.service';
import { PrismaModule } from './user-auth/infra/database/prisma/prisma.module';
import { UserRepository } from './user-auth/infra/database/prisma/repositories/user.repository';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ global: true, secret: 'jh;H=[}GsYn0rPd7H->H' }),
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export class AppModule {}
