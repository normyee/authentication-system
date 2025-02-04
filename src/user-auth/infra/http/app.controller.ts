import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from '../../application/app.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('list')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    return this.appService.create();
  }
}
