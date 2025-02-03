import { Module } from '@nestjs/common';
import { AppController } from './user-auth/infra/http/app.controller';
import { AppService } from './user-auth/application/app.service';
import { PrismaModule } from './user-auth/infra/database/prisma/prisma.module';
import { UserRepository } from './user-auth/infra/database/prisma/repositories/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [AppService, UserRepository],
})
export class AppModule {}
