import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from 'src/user-auth/infra/middlewares/guard/auth.guard';
import { RegisterUserUseCase } from 'src/user-auth/application/usecases/register-user.use-case';
import { LoginUserUseCase } from 'src/user-auth/application/usecases/login-user.use-case';
import { LogoutUserUseCase } from 'src/user-auth/application/usecases/logout-user.use-case';
import { RequestSession } from 'src/common/types';
import { UserDTO } from 'src/user-auth/application/dtos/user.dto';
import { LoginDTO } from 'src/user-auth/application/dtos/login.dto';
import { VerifyEmailUseCase } from 'src/user-auth/application/usecases/verify-email.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _registerUserUseCase: RegisterUserUseCase,
    private readonly _loginUserUseCase: LoginUserUseCase,
    private readonly _logoutUserUseCase: LogoutUserUseCase,
    private readonly _verifyEmailUseCase: VerifyEmailUseCase,
  ) {}

  @Post('signup')
  async signUp(@Body() userDTO: UserDTO) {
    const user = await this._registerUserUseCase.execute(userDTO);

    return {
      data: { name: user.name, email: user.email },
      message: 'usuário cadastrado',
      success: true,
    };
  }

  @Post('login')
  async login(@Body() credentials: LoginDTO) {
    const userToken = await this._loginUserUseCase.execute(credentials);

    return {
      data: { accessToken: userToken },
      message: 'Login efetuado com successo',
      success: true,
    };
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Req() req: RequestSession) {
    const sessionToken = req.session.token;
    const message = await this._logoutUserUseCase.execute(sessionToken);

    return { message, success: true };
  }

  @Get('verify-email')
  async verifyEmail(@Query('emailToken') emailToken: string) {
    const user = await this._verifyEmailUseCase.execute(emailToken);

    if (!user) throw new BadRequestException('Sem acesso ao recurso');

    return {
      data: { name: user.name, email: user.email },
      message: 'Seu e-mail foi verificado com sucesso!',
      success: true,
    };
  }
}
