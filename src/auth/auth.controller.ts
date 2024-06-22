import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // @Post('register')
  // async register(@Body() createUserDto: CreateUserDto, @Req() req: Request) {
  //   return this.authService.register(createUserDto);
  // }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto,  @Req() req: Request) {
    
    return this.authService.login(loginUserDto);
  }
}
