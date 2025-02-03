import { Module } from '@nestjs/common';
import { AppController } from './user-auth/infra/http/app.controller';
import { AppService } from './user-auth/application/app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
