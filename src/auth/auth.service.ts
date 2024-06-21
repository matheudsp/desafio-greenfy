import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

interface JwtPayload {
  username: string;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    console.log(`Teste: Logando com usuário ${username}`);

    const user = await this.usersService.findByUsername(username);

    if(!user){
      throw new UnauthorizedException("Email e/ou senha incorreta.")
  }
    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!passwordMatch){
      throw new UnauthorizedException("Email e/ou senha incorreta.")
  }

    const payload: JwtPayload = { username: user.username, sub: user.id};

    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);

    return user
  }
}
