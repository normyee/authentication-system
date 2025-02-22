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
import { AuthGuard } from 'src/user-auth/infra/middlewares/guard/auth.guard';
import { CreateListUseCase } from 'src/user-auth/application/usecases/create-list.use-case';
import { UpdateListUseCase } from 'src/user-auth/application/usecases/update-list.use-case';
import { GetListByIdUseCase } from 'src/user-auth/application/usecases/get-list-by-id.use-case';
import { DeleteListUseCase } from 'src/user-auth/application/usecases/delete-list.use-case';
import { RequestSession } from 'src/common/types';
import { ListDTO } from 'src/user-auth/application/dtos/list.dto';

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
  async create(@Req() req: RequestSession, @Body() data: ListDTO) {
    const list = await this._createListUseCase.execute(req.session, data);

    if (!list) throw new UnauthorizedException('Sem acesso ao recurso');

    return {
      data: list,
      message: 'Sua lista foi criada com sucesso',
      success: true,
    };
  }

  @Post(':id')
  async update(
    @Req() req: RequestSession,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ListDTO,
  ) {
    const list = await this._updateListUseCase.execute(req.session, id, data);

    if (!list) throw new UnauthorizedException('Sem acesso ao recurso');

    return {
      data: list,
      message: 'Sua lista foi atualizada com sucesso',
      success: true,
    };
  }

  @Get(':id')
  async getById(
    @Req() req: RequestSession,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const list = await this._getListByIdUseCase.execute(req.session, id);

    if (!list) throw new UnauthorizedException('Sem acesso ao recurso');

    return {
      data: list,
      message: 'Sua lista foi buscada com sucesso',
      success: true,
    };
  }

  @Delete(':id')
  async delete(
    @Req() req: RequestSession,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const list = await this._deleteListUseCase.execute(req.session, id);

    if (!list) throw new UnauthorizedException('Sem acesso ao recurso');

    return {
      data: list,
      message: 'Sua lista foi atualizada com sucesso',
      success: true,
    };
  }
}
