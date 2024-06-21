import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // cria hash da senha 
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({ ...createUserDto, password: hashedPassword });

    return this.usersRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username} });
  }

  async validateUser(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository.findOne({ where: { username: loginUserDto.username } });

    //verifica se a senha está correta
    if (user && await bcrypt.compare(loginUserDto.password, user.password)) {
      return user;
    }

    return null;
  }
}
