import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/user-auth/infra/database/prisma/repositories/user.repository';
import { PrismaModule } from 'src/user-auth/infra/database/prisma/prisma.module';
import { RedisService } from 'src/user-auth/infra/database/redis/redis.service';
import { RedisModule } from 'src/user-auth/infra/database/redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
  exports: [AuthService],
})
export class AuthModule {}
