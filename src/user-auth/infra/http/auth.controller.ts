import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserDTO } from 'src/auth/dto/user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { LoginDTO } from 'src/user-auth/application/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() userDTO: UserDTO) {
    return await this.authService.signUp(userDTO);
  }

  @Post('login')
  async login(@Body() credentials: LoginDTO) {
    return await this.authService.login(credentials);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Req() req: any) {
    const sessionToken = req.session.token;
    return await this.authService.logout(sessionToken);
  }
}
