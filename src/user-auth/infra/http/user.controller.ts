import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/user-auth/infra/middlewares/guard/auth.guard';
import { RegisterUserUseCase } from 'src/user-auth/application/usecases/register-user.use.case';
import { LoginUserUseCase } from 'src/user-auth/application/usecases/login-user.use-case';
import { LogoutUserUseCase } from 'src/user-auth/application/usecases/logout-user.use-case';
import { RequestSession } from 'src/common/types';
import { UserDTO } from 'src/user-auth/application/dtos/user.dto';
import { LoginDTO } from 'src/user-auth/application/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _registerUserUseCase: RegisterUserUseCase,
    private readonly _loginUserUseCase: LoginUserUseCase,
    private readonly _logoutUserUseCase: LogoutUserUseCase,
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
}
