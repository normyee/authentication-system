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
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateListUseCase } from 'src/user-auth/application/usecases/create-list.use-case';
import { UpdateListUseCase } from 'src/user-auth/application/usecases/update-list.use-case';
import { GetListByIdUseCase } from 'src/user-auth/application/usecases/get-list-by-id.use-case';
import { DeleteListUseCase } from 'src/user-auth/application/usecases/delete-list.use-case';
import { RequestSession } from 'src/common/types';

@UseGuards(AuthGuard)
@Controller('list')
export class AppController {
  constructor(
    private readonly _createListUseCase: CreateListUseCase,
    private readonly _updateListUseCase: UpdateListUseCase,
    private readonly _getListByIdUseCase: GetListByIdUseCase,
    private readonly _deleteListUseCase: DeleteListUseCase,
  ) {}

  @Post()
  async create(@Req() req: RequestSession, @Body() data: any): Promise<any> {
    const list = await this._createListUseCase.execute(req.session, data);

    if (!list) throw new UnauthorizedException('Sem acesso ao recurso');

    return list;
  }

  @Post(':id')
  async update(
    @Req() req: RequestSession,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: any,
  ): Promise<any> {
    const list = this._updateListUseCase.execute(req.session, id, data);

    if (!list) throw new UnauthorizedException('Sem acesso ao recurso');

    return list;
  }

  @Get(':id')
  async getById(
    @Req() req: RequestSession,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const list = this._getListByIdUseCase.execute(req.session, id);

    if (!list) throw new UnauthorizedException('Sem acesso ao recurso');

    return list;
  }

  @Delete(':id')
  async delete(
    @Req() req: RequestSession,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    const list = this._deleteListUseCase.execute(req.session, id);

    if (!list) throw new UnauthorizedException('Sem acesso ao recurso');

    return list;
  }
}
