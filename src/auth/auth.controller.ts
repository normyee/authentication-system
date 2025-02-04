import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

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
