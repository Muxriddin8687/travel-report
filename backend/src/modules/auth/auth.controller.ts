import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() userInfo: any){
    return this.authService.login(userInfo);
  }

  @Post('register')
  register(@Body() userInfo: any){
    return this.authService.register(userInfo);
  }
}
