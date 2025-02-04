import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ListService } from '../../application/list.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@Controller('list')
export class AppController {
  constructor(private readonly listService: ListService) {}

  @Post()
  async create(@Req() req: any, @Body() data: any): Promise<any> {
    const list = await this.listService.create(req.session, data);

    if (!list) throw new UnauthorizedException('Sem acesso ao recurso');

    return list;
  }

  @Post(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
  ): Promise<any> {
    return this.listService.update(id, data);
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.listService.getById(id);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.listService.delete(id);
  }
}
